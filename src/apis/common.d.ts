declare namespace Common {
  type CommonEntity = {
    /** 创建人ID */
    createBy?: number
    /** 更新人ID */
    updateBy?: number
    /** 创建时间 */
    createdAt?: string
    /** 更新时间 */
    updatedAt?: string
  }

  type UploadFileResponse = {
    size: number
    path: string
    full_path: string
    name: string
    type: string
  }
}
