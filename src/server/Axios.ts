import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

import axios from 'axios'
import { AxiosCanceler } from './axiosCancel'
import { isFunction } from '@/utils/is'
import { deepClone } from '@/utils/'

import type { RequestOptions, CreateAxiosOptions, Result } from './types'

export * from './axiosTransform'

/**
 * @description: Axios封装类，提供统一的HTTP请求接口
 */
export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  /**
   * @description: 获取axios实例
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @description: 设置请求头
   */
  setHeader(headers: Record<string, string>): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * @description: 配置拦截器
   */
  private setupInterceptors(): void {
    const transform = this.options.transform
    if (!transform) {
      return
    }

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform

    const axiosCanceler = new AxiosCanceler()

    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 处理请求取消
        const ignoreCancelToken = config.headers?.ignoreCancelToken
        if (!ignoreCancelToken) {
          axiosCanceler.addPending(config)
        }

        // 执行自定义请求拦截器
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config) as InternalAxiosRequestConfig
        }
        return config
      },
      requestInterceptorsCatch
    )

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 移除pending请求
        axiosCanceler.removePending(response.config)

        // 执行自定义响应拦截器
        if (responseInterceptors && isFunction(responseInterceptors)) {
          response = responseInterceptors(response)
        }
        return response
      },
      responseInterceptorsCatch
    )
  }

  /**
   * @description: 统一请求方法
   */
  async request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let requestConfig = deepClone(config)
    const transform = this.options.transform
    const requestOptions = { ...this.options.requestOptions, ...options }

    // 执行请求前钩子
    if (transform?.beforeRequestHook && isFunction(transform.beforeRequestHook)) {
      requestConfig = transform.beforeRequestHook(requestConfig, requestOptions)
    }

    try {
      const response = await this.axiosInstance.request<Result>(requestConfig)

      // 执行数据转换
      if (
        transform?.transformRequestData &&
        isFunction(transform.transformRequestData) &&
        !axios.isCancel(response) &&
        !requestConfig.responseType
      ) {
        return transform.transformRequestData(response, requestOptions)
      }

      return response.data as T
    } catch (error) {
      // 执行请求错误处理
      if (transform?.requestCatch && isFunction(transform.requestCatch)) {
        return transform.requestCatch(error as Error)
      }
      throw error
    }
  }
}
