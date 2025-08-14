/* eslint-disable @typescript-eslint/no-unused-expressions */
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
 * @description:  axios模块
 */
export class VAxios {
  private axiosInstance: AxiosInstance
  private options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options

    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  /**
   * @description:  创建axios实例
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @description: 重新配置axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return
    }
    this.createAxios(config)
  }

  /**
   * @description: 设置通用header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * @description: 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.getTransform()
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

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
      const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config
      !ignoreCancelToken && axiosCanceler.addPending(config)
      if (requestInterceptors && isFunction(requestInterceptors)) {

        config = requestInterceptors(config) as InternalAxiosRequestConfig<any>
      }
      return config
    }, undefined)

    // 请求拦截器错误捕获
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {

        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // 响应结果拦截器错误捕获
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }
  //
  // /**
  //  * @description:  文件上传
  //  */
  // uploadFiles(config: AxiosRequestConfig, params: File[]) {
  //   const formData = new FormData();
  //
  //   Object.keys(params).forEach((key) => {
  //     formData.append(key, params[key as any]);
  //   });
  //
  //   console.log(config)
  //
  //
  //   const url = `${process.env.REACT_APP_BASE_URL}${config.url}`
  //
  //   return this.axiosInstance.post(url,formData,{
  //     headers: {
  //       'Content-type': ContentTypeEnum.FORM_DATA,
  //     }
  //   })
  // }

  /**
   * @description:   请求方法
   */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: AxiosRequestConfig = deepClone(config)
    const transform = this.getTransform()

    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatch, transformRequestData } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          // 请求是否被取消
          const isCancel = axios.isCancel(res)
          if (
            transformRequestData &&
            isFunction(transformRequestData) &&
            !isCancel &&
            !conf.responseType
          ) {
            const ret = transformRequestData(res, opt)
            // ret !== undefined ? resolve(ret) : reject(new Error('request error!'));
            return resolve(ret)
          }
          resolve(res?.data as unknown as Promise<T>)

          reject(res as unknown as Promise<T>)
        })
        .catch((e: Error) => {
          if (requestCatch && isFunction(requestCatch)) {
            reject(requestCatch(e))
            return
          }
          reject(e)
        })
    })
  }
}
