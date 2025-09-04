/**
 * @description: Axios配置文件 - 统一HTTP请求管理
 * @author: vite-react-admin
 */
import { VAxios } from './Axios'
import type { AxiosTransform } from './axiosTransform'
import { ContentTypeEnum } from '@/utils/enums/httpEnum'
import { ResponseHandler } from './responseHandler'
import { RequestHandler } from './requestHandler'
import { ErrorHandler } from './errorHandler'

// 环境变量配置
const ENV_CONFIG = {
  urlPrefix: import.meta.env.REACT_APP_API_PREFIX,
  baseUrl: import.meta.env.VITE_APP_URL,
  apiTarget: import.meta.env.VITE_API_TARGET,
  apiUrl: import.meta.env.REACT_APP_BASE_URL
} as const

/**
 * @description: 数据转换配置
 */
const transform: AxiosTransform = {
  /**
   * @description: 请求数据转换处理
   */
  transformRequestData: ResponseHandler.transformResponse,

  /**
   * @description: 请求前配置处理
   */
  beforeRequestHook: RequestHandler.beforeRequest,

  /**
   * @description: 请求拦截器
   */
  requestInterceptors: RequestHandler.interceptRequest,

  /**
   * @description: 响应错误拦截器
   */
  responseInterceptorsCatch: ErrorHandler.handleResponseError
}

/**
 * @description: 创建Axios实例
 */
const createAxiosInstance = () => {
  return new VAxios({
    baseURL: ENV_CONFIG.baseUrl,
    timeout: 100 * 1000,
    prefixUrl: ENV_CONFIG.urlPrefix,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    },
    transform,
    requestOptions: {
      // 默认不添加prefix到url
      joinPrefix: false,
      // 不返回原生响应头
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // POST请求不添加参数到url
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 消息提示类型
      errorMessageMode: 'none',
      // 接口地址
      apiUrl: ENV_CONFIG.apiUrl,
      // 默认显示消息提示
      isShowMessage: true,
      isShowErrorMessage: true
    },
    withCredentials: false
  })
}

// 创建并导出axios实例
const axiosInstance = createAxiosInstance()

export default axiosInstance
export { axiosInstance as Axios }
export type { RequestOptions, Result } from './types'
