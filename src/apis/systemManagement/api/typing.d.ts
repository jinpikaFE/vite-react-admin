declare namespace ApiManagement {
  /** API实体 */
  type ApiEntity = {
    /** API ID */
    id: number
    /** API标题 */
    title: string
    /** API路径 */
    path: string
    /** 请求方法 */
    action: string
    /** API类型 */
    type: string
    /** 处理函数 */
    handle: string
    /** 创建时间 */
    createdAt?: string
    /** 更新时间 */
    updatedAt?: string
  }

  /** API列表请求参数 */
  type ApiListParams = {
    /** 页码 */
    pageIndex?: number
    /** 每页大小 */
    pageSize?: number
    /** API标题 */
    title?: string
    /** API路径 */
    path?: string
    /** 请求方法 */
    action?: string
    /** API类型 */
    type?: string
  }

  /** API更新请求参数 */
  type ApiUpdateReq = Partial<ApiEntity>
}
