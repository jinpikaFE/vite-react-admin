import type { AxiosResponse } from 'axios'
import { Modal, message } from 'antd'
import { ResultEnum } from '@/utils/enums/httpEnum'
import { storage } from '@/utils/Storage'
import type { RequestOptions, Result } from './types'
import { ErrorHandler } from './errorHandler'

/**
 * @description: 响应数据处理器
 */
export class ResponseHandler {
  /**
   * @description: 处理响应数据
   */
  static transformResponse(response: AxiosResponse<Result>, options: RequestOptions): any {
    const { isTransformResponse, isReturnNativeResponse } = options

    // 返回原生响应头
    if (isReturnNativeResponse) {
      return response.data
    }

    // 不进行任何处理，直接返回
    if (!isTransformResponse) {
      return response.data
    }

    const { data } = response
    if (!data) {
      return Promise.reject(new Error('请求无返回数据'))
    }

    const { code, msg: msg } = data
    const isSuccess = code === ResultEnum.SUCCESS

    // 处理消息提示
    ResponseHandler.handleMessage(isSuccess, msg, options)

    // 处理不同的响应状态
    return ResponseHandler.handleResponseStatus(code, msg, data)
  }

  /**
   * @description: 处理消息提示
   */
  private static handleMessage(isSuccess: boolean, msg: string, options: RequestOptions): void {
    const {
      isShowMessage,
      isShowSuccessMessage,
      isShowErrorMessage,
      successMessageText,
      errorMessageText,
      errorMessageMode
    } = options

    if (!isShowMessage) return

    if (isSuccess && (successMessageText || isShowSuccessMessage)) {
      message.success(successMessageText || msg || '操作成功！')
    } else if (!isSuccess && (errorMessageText || isShowErrorMessage)) {
      if (errorMessageMode === 'modal') {
        Modal.info({
          title: '提示',
          content: msg,
          okText: '确定'
        })
      } else {
        message.error(errorMessageText || msg || '操作失败！')
      }
    }
  }

  /**
   * @description: 处理响应状态码
   */
  private static handleResponseStatus(code: number, msg: string, data: Result): any {
    switch (code) {
      case ResultEnum.SUCCESS:
        return data?.data

      case ResultEnum.TIMEOUT:
        return ResponseHandler.handleTimeout(msg)

      case ResultEnum.MSGERROR:
        return ResponseHandler.handleError(msg)
      case 401:
        return ErrorHandler.handleUnauthorized(msg)

      default:
        if (code >= 400 && code < 500) {
          // message.error(msg || '客户端请求错误')
          return Promise.reject(new Error(msg || '客户端请求错误'))
        }
        return Promise.reject(new Error(msg || '未知错误'))
    }
  }

  /**
   * @description: 处理登录超时
   */
  private static handleTimeout(msg: string) {
    const timeoutMsg = '登录超时，请重新登录！'

    Modal.warning({
      title: '提示',
      content: '登录身份已失效，请重新登录！',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        storage.clear()
        window.location.href = '/login'
      }
    })

    return Promise.reject(new Error(timeoutMsg))
  }

  /**
   * @description: 处理业务错误
   */
  private static handleError(msg: string) {
    const errorMsg = msg || '操作失败，系统异常！'
    message.error(errorMsg)
    return Promise.reject(new Error(errorMsg))
  }
}
