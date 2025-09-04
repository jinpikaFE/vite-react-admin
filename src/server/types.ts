import type { AxiosRequestConfig } from 'axios'
import type { AxiosTransform } from './axiosTransform'

/**
 * @description: 创建Axios实例的配置选项
 */
export interface CreateAxiosOptions extends AxiosRequestConfig {
  /** URL前缀 */
  prefixUrl?: string
  /** 数据转换器 */
  transform?: AxiosTransform
  /** 请求选项 */
  requestOptions?: RequestOptions
}

/**
 * @description: 请求配置选项
 */
export interface RequestOptions {
  /** 请求参数拼接到url */
  joinParamsToUrl?: boolean
  /** 格式化请求参数时间 */
  formatDate?: boolean
  /** 是否显示提示信息 */
  isShowMessage?: boolean
  /** 成功的文本信息 */
  successMessageText?: string
  /** 是否显示成功信息 */
  isShowSuccessMessage?: boolean
  /** 是否显示失败信息 */
  isShowErrorMessage?: boolean
  /** 错误的文本信息 */
  errorMessageText?: string
  /** 是否加入url前缀 */
  joinPrefix?: boolean
  /** 接口地址，不填则使用默认apiUrl */
  apiUrl?: string
  /** 错误消息提示类型 */
  errorMessageMode?: 'none' | 'modal'
  /** 是否添加时间戳 */
  joinTime?: boolean
  /** 是否进行数据转换处理 */
  isTransformResponse?: boolean
  /** 是否返回原生响应头 */
  isReturnNativeResponse?: boolean
}

/**
 * @description: 接口返回数据格式
 */
export interface Result<T = any> {
  /** 状态码 */
  code: number
  /** 消息类型 */
  type?: 'success' | 'error' | 'warning'
  /** 消息内容 */
  msg: string
  /** 返回数据 */
  result?: T
  /** 返回数据（兼容字段） */
  data?: T
  /** 分页信息 */
  page?: {
    /** 总数量 */
    count?: number
    /** 当前页 */
    page?: number
    /** 每页大小 */
    page_size?: number
    /** 是否有下一页 */
    has_next?: boolean
  }
}

/**
 * @description: 分页请求参数
 */
export interface PageParams {
  /** 当前页码 */
  page?: number
  /** 每页大小 */
  page_size?: number
}

/**
 * @description: 分页响应数据
 */
export interface PageResult<T = any> extends Result<T[]> {
  page: {
    count: number
    page: number
    page_size: number
    has_next: boolean
  }
}
