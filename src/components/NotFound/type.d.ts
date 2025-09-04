import type { ResultStatusType } from 'antd/lib/result'
import type React from 'react'

export type NotFoundPropsType = {
  status?: ResultStatusType
  title?: string
  subTitle?: string
  extra?: React.ReactDOM | React.JSXElementConstructor
}
