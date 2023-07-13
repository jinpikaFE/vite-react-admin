import { Upload, Image } from 'antd'
import type { UploadProps } from 'antd'

import styles from '../index.module.less'
import { useEffect, useState } from 'react'
import { useAsyncEffect } from 'ahooks'

const FormUploadMy: React.FC<{
  isDragger?: boolean
  handleUpload: (info: any) => Promise<void>
  uploadProps?: UploadProps
  isVideo?: boolean
  onChangePrercent: (info: any) => void
  setUploading: React.Dispatch<React.SetStateAction<boolean>>
  disabled?: boolean
  /** upload的值 */
  onChange?: any
  fileList?: any
}> = ({
  isDragger,
  handleUpload,
  uploadProps,
  isVideo,
  onChange,
  setUploading,
  disabled,
  fileList,
  onChangePrercent
}) => {
  const [val, setVal] = useState<any[]>()
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  useAsyncEffect(async () => {
    if (fileList) {
      setVal(
        fileList?.map((item: string, index: number) => {
          return {
            uid: decodeURI(item) + index,
            name: decodeURI(item),
            status: 'done',
            url: item,
            file_link: item,
            index
          }
        })
      )
    }
  }, [])

  useEffect(() => {
    onChange?.(val?.map((item: any) => item?.file_link))
  }, [val])
  return isDragger ? (
    <Upload.Dragger
      customRequest={handleUpload}
      maxCount={1}
      fileList={val}
      {...uploadProps}
      className={isVideo ? styles.videoUpload : ''}
      onChange={info => {
        setVal(info?.fileList)
        onChangePrercent(info)
      }}
      onRemove={() => setUploading(false)}
      disabled={disabled}
    />
  ) : (
    <>
      <Upload
        customRequest={handleUpload}
        maxCount={1}
        fileList={val}
        {...uploadProps}
        className={isVideo ? styles.videoUpload : ''}
        onChange={info => {
          setVal(info?.fileList)
          onChangePrercent(info)
        }}
        onPreview={(file: any) => {
          setPreviewImage(file?.file_link)
          setPreviewVisible(true)
        }}
        onRemove={() => setUploading(false)}
        disabled={disabled}
      />
      <Image
        style={{ display: 'none' }}
        width={200}
        preview={{
          visible: previewVisible,
          onVisibleChange: visible => setPreviewVisible(visible)
        }}
        src={previewImage}
      />
    </>
  )
}

export default FormUploadMy
