import dayjs from 'dayjs'
import { message } from 'antd'
import { DATE_FORMAT } from '../dateUtil'

/**
 * 腾讯云cos上传
 * @param param0
 * @param info
 * @param upCallback
 */
export const uploadByCos = (
  {
    tmpSecretId,
    tmpSecretKey,
    sessionToken,
    startTime,
    expiredTime,
    prefix
  }: {
    tmpSecretId: string
    tmpSecretKey: string
    sessionToken: string
    startTime: number
    expiredTime: number
    prefix?: string
  },
  file: any,
  upCallback: (data: any) => void,
  onProgress: (progressData: any) => void
) => {
  // 初始化实例
  const cos = new window.COS({
    // getAuthorization 必选参数
    getAuthorization: function (_: any, callback: any) {
      callback({
        TmpSecretId: tmpSecretId,
        TmpSecretKey: tmpSecretKey,
        SecurityToken: sessionToken,
        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        StartTime: startTime, // 时间戳，单位秒，如：1580000000
        ExpiredTime: expiredTime // 时间戳，单位秒，如：1580000000
      })
    }
  })
  const fileName = `${prefix}/${dayjs().format(DATE_FORMAT)}/${
    new Date().getTime() + Math.random().toString().slice(-6) + '.' + file?.name
  }`.replace(/\s*/g, '')

  cos.uploadFile(
    {
      Bucket: import.meta.env.REACT_APP_COS_BUCKET /* 填写自己的bucket，必须字段 */,
      Region: import.meta.env.REACT_APP_COS_REGION /* 存储桶所在地域，必须字段 */,
      Key: fileName /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
      Body: file, // 上传文件对象
      SliceSize:
        1024 *
        1024 *
        20 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
      onProgress: async (progressData: any) => await onProgress(progressData)
    },
    function (err: any, data: any) {
      if (err) {
        message.error('上传失败')
        console.log('上传失败', err)
      } else {
        upCallback(data)
        console.log('上传成功', data)
      }
    }
  )
}

export const decodeUrl = (url?: string) => {
  return window.decodeURIComponent(url || '')
}
