declare namespace Resource {
  /** 资源实体 */
  type ResourceEntity = {
    /**
     * 资源分类ID
     */
    categoryId: number
    /**
     * 创建时间
     */
    createTime: Date
    /**
     * 描述
     */
    description: string
    id: number
    /**
     * 资源名称
     */
    name: string
    /**
     * 资源URL
     */
    url: string
  }

  /** 资源筛选参数 */
  type ResourceListParams = {
    categoryId?: number
    /** 资源名称 */
    nameKeyword?: string
    /** 资源路径 */
    urlKeyword?: string
  } & Global.PageParams

  /** 资源分类实体 */
  type ResourceCategoryEntity = {
    /**
     * 创建时间
     */
    createTime?: Date
    id?: number
    /**
     * 分类名称
     */
    name?: string
    /**
     * 分类下的资源
     */
    resources?: ResourceEntity[]
    /**
     * 排序
     */
    sort?: number
    /**
     * 更新时间
     */
    updateTime?: Date
  }
}
