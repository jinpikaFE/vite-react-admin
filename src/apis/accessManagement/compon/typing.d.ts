declare namespace Compon {
  /** 组件实体 */
  type ComponEntity = {
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 前端图标
     */
    icon?: string
    id?: number
    /**
     * 是否显示
     */
    isShow?: number
    /**
     * 菜单排序
     */
    sort?: number
    /**
     * 菜单名称
     */
    name?: string
    /**
     * 菜单类型
     */
    type?: number
    /** 是否隐藏菜单布局 */
    hideLayout?: boolean
    /** 在菜单栏是否显示 */
    hideInMenu?: boolean
    /** 是否需要token校验，true， 无token该页面禁止访问 */
    isToken?: boolean
    children?: ComponEntity[]
    /** 重定向 */
    redirect?: string
    /** 组件地址 */
    component: stirng
    /** 路由地址 */
    path: string
  }

  /** 资源分类实体 */
  type ComponTreeEntity = {
    /**
     * 子级菜单
     */
    children?: ComponTreeEntity[]
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 前端图标
     */
    icon?: string
    id?: number
    /**
     * 是否显示
     */
    isShow?: number
    /**
     * 菜单级数
     */
    level?: number
    /**
     * 前端名称
     */
    name?: string
    /**
     * 父级ID
     */
    parentId?: number
    /**
     * 菜单排序
     */
    sort?: number
    /**
     * 菜单名称
     */
    title?: string
    /**
     * 菜单类型
     */
    type?: number
  }
}
