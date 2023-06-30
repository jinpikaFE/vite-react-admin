declare namespace Role {
  type RoleEntity = {
    /**
     * 后台用户数量
     */
    adminCount?: number
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 描述
     */
    description?: string
    id?: number
    /**
     * 名称
     */
    name?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 启用状态：0->禁用；1->启用
     */
    status?: number
    /**
     * 更新时间
     */
    updateTime?: Date
    menus?: Compon.ComponEntity[]
    resources?: Resource.ResourceEntity[]
  }

  type RoleListParams = {
    /** 关键词 */
    keyword?: string
  } & Global.PageParams
}
