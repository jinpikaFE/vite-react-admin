import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { RequestEnum } from '@/utils/enums/httpEnum'
import { isObject, isString } from '@/utils/is'
import { setObjToUrlParams } from '@/utils/urlUtils'
import { joinTimestamp, formatRequestDate } from './helper'
import { storage } from '@/utils/Storage'
import type { RequestOptions } from './types'

/**
 * @description: 请求处理器
 */
export class RequestHandler {
  /**
   * @description: 请求前配置处理
   */
  static beforeRequest(config: AxiosRequestConfig, options: RequestOptions): AxiosRequestConfig {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options

    // 处理URL前缀
    if (joinPrefix && config.url) {
      const urlPrefix = import.meta.env.REACT_APP_API_PREFIX
      config.url = `${urlPrefix}${config.url}`
    }

    // 处理API地址
    if (apiUrl && isString(apiUrl) && config.url) {
      config.url = `${apiUrl}${config.url}`
    }

    // 处理请求参数
    return RequestHandler.handleRequestParams(config, { joinParamsToUrl, formatDate, joinTime })
  }

  /**
   * @description: 请求拦截器处理
   */
  static interceptRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    // 添加认证token
    const token = storage.get('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加自定义头部
    if (config.headers) {
      config.headers.source = 'vite_react_admin'
      const proxyUrl = import.meta.env.VITE_API_TARGET
      if (proxyUrl && config.url) {
        config.headers.proxy_url = `${proxyUrl}${config.url}`
      }
    }

    return config
  }

  /**
   * @description: 处理请求参数
   */
  static handleRequestParams(
    config: AxiosRequestConfig,
    options: { joinParamsToUrl?: boolean; formatDate?: boolean; joinTime?: boolean }
  ): AxiosRequestConfig {
    const { joinParamsToUrl, formatDate, joinTime } = options
    const params = config.params || {}
    const data = config.data || false
    const method = config.method?.toUpperCase()

    if (method === RequestEnum.GET) {
      return RequestHandler.handleGetRequest(config, params, joinTime)
    }
    return RequestHandler.handlePostRequest(config, params, data, { joinParamsToUrl, formatDate })
  }

  /**
   * @description: 处理GET请求参数
   */
  static handleGetRequest(
    config: AxiosRequestConfig,
    params: any,
    joinTime?: boolean
  ): AxiosRequestConfig {
    if (isString(params)) {
      // RESTful风格
      config.url = `${config.url}${params}${joinTimestamp(joinTime || false, true)}`
      config.params = undefined
    } else {
      // 标准查询参数（暂时注释掉时间戳，避免缓存问题）
      // config.params = Object.assign(params || {}, joinTimestamp(joinTime || false, false))
      config.params = params
    }
    return config
  }

  /**
   * @description: 处理POST等请求参数
   */
  static handlePostRequest(
    config: AxiosRequestConfig,
    params: any,
    data: any,
    options: { joinParamsToUrl?: boolean; formatDate?: boolean }
  ): AxiosRequestConfig {
    const { joinParamsToUrl, formatDate } = options

    if (isString(params)) {
      // RESTful风格
      config.url = `${config.url}${params}`
      config.params = undefined
    } else {
      // 格式化日期参数
      if (formatDate && !isString(params)) {
        formatRequestDate(params)
      }

      config.data = data
      config.params = params

      // 将参数拼接到URL
      if (joinParamsToUrl && config.url) {
        config.url = setObjToUrlParams(
          config.url,
          Object.assign({}, config.params, config.data)
        )
      }
    }

    return config
  }
}
