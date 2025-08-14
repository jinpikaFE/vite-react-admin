import axios from 'axios'
import { Modal, message, notification } from 'antd'
import { storage } from '@/utils/Storage'
import { checkStatus } from './checkStatus'

/**
 * @description: 错误处理器
 */
export class ErrorHandler {
  /**
   * @description: 响应错误处理
   */
  static handleResponseError(error: any): Promise<never> {
    const { response, code, message: errorMessage } = error || {}

    // 处理网络错误
    if (ErrorHandler.isNetworkError(code, errorMessage)) {
      return Promise.reject(error)
    }

    // 处理401未授权错误
    if (response?.status === 401) {
      return ErrorHandler.handleUnauthorized(errorMessage)
    }

    // 处理请求取消
    if (axios.isCancel(error)) {
      console.warn('请求被取消：', error)
      return Promise.reject(error)
    }

    // 处理其他HTTP状态码错误
    if (response?.status) {
      const msg = response.data?.message || errorMessage || ''
      checkStatus(response.status, msg)
    }

    return Promise.reject(error)
  }

  /**
   * @description: 判断是否为网络错误
   */
  private static isNetworkError(code: string, errorMessage: string): boolean {
    // 请求超时
    if (code === 'ECONNABORTED' && errorMessage?.indexOf('timeout') !== -1) {
      message.error('接口请求超时，请刷新页面重试！')
      return true
    }

    // 网络连接错误
    if (errorMessage?.includes('Network Error')) {
      Modal.info({
        title: '网络异常',
        content: '请检查您的网络连接是否正常！',
        okText: '确定'
      })
      return true
    }

    return false
  }

  /**
   * @description: 处理401未授权错误
   */
  static handleUnauthorized(errorMessage: string): Promise<never> {
    storage.clear()

    notification.error({
      message: errorMessage || '认证失败',
      description: 'token过期或未登录或没有权限'
    })

    // 跳转到登录页
    setTimeout(() => {
      window.location.href = '/login'
    }, 1000)

    return Promise.reject(new Error('未授权访问'))
  }
}
