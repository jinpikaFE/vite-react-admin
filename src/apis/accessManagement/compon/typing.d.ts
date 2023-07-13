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
