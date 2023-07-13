import type { FormItemProps, UploadProps } from 'antd'
import { Form, message } from 'antd'
import type { FC } from 'react'
import { useState } from 'react'
import { useUpdate } from 'ahooks'

import { isNil } from 'lodash'
import FormUploadMy from './FormUploadMy'
import { uploadFile } from '@/apis'

type TFormUpload = {
  /** FormItem属性 */
  formItemProps?: FormItemProps
  /** upload属性 */
  uploadProps?: UploadProps
  /** 必填 */
  required?: boolean
  /** 是否Dragger */
  isDragger: boolean
  /** 是否视频上传 */
  isVideo?: boolean
  disabled?: boolean
  /** 文件上传额外处理 */
  extraUploadFn?: (obj: any) => void
  imgCount?: number
}

const FormUploadNew: FC<TFormUpload> = props => {
  const {
    formItemProps,
    required,
    uploadProps,
    isDragger,
    isVideo,
    disabled,
    extraUploadFn,
    imgCount
  } = props
  let timer: any = null
  const update = useUpdate()
  /** 是否上传中 */
  const [uploading, setUploading] = useState<boolean>(false)

  /** 处理form.item valuePropName问题 */
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e?.fileList
  }
  const onChangePrercent = (info: any) => {
    const { file } = info
    file.percent = 0
    if (file?.status === 'uploading') {
      timer = setInterval(() => {
        if (file.percent === 85 && timer) {
          clearInterval(timer)
        }
        file.percent += 1
        update()
      }, 5000)
    }
    if (file?.status === 'done') {
      file.percent = 100
    }
  }

  const handleUpload = async (info: any) => {
    setUploading(true)
    const { file } = info
    const formData = new FormData()
    formData.append('file', file)
    if (extraUploadFn) {
      extraUploadFn({ info, formData })
      setUploading(false)
      info.onSuccess()
      return
    }
    const res = await uploadFile(formData)
    if (res?.code === 200) {
      file.file_link = res?.data?.url
      info.onSuccess()
    } else {
      info.onError('上传失败')
    }
    setUploading(false)
  }

  return (
    <Form.Item
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={[
        { required: required, message: '请上传' },
        () => ({
          validator(_, value) {
            if (uploadProps?.accept) {
              if (!(value?.length > 0)) {
                return Promise.resolve()
              }
              for (const item of value) {
                const fileNameArr = item?.split('.')
                if (
                  !uploadProps?.accept?.includes(
                    fileNameArr?.[fileNameArr?.length - 1]?.toLocaleLowerCase()
                  )
                ) {
                  return Promise.reject(new Error(`请选择${uploadProps?.accept}类型的文件`))
                }
              }
            }
            if (required && imgCount && value?.length !== imgCount) {
              return Promise.reject(new Error(`请选择${imgCount}张图片`))
            }
            if (value?.[0]?.error) {
              return Promise.reject(new Error(value?.[0]?.error))
            }
            if (uploading && isNil(uploadProps?.maxCount)) {
              return Promise.reject(new Error('文件上传中'))
            }
            return Promise.resolve()
          }
        })
      ]}
      required={required}
      {...formItemProps}
    >
      <FormUploadMy
        isDragger={isDragger}
        handleUpload={handleUpload}
        uploadProps={uploadProps}
        isVideo={isVideo}
        onChangePrercent={onChangePrercent}
        setUploading={setUploading}
        disabled={disabled}
      />
    </Form.Item>
  )
}

export default FormUploadNew
