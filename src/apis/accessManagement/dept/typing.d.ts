declare namespace Dept {
  type DeptEntity = {
    /** 部门ID */
    deptId: number
    /** 上级部门ID */
    parentId: number
    /** 部门路径 */
    deptPath: string
    /** 部门名称 */
    deptName: string
    /** 排序 */
    sort: number
    /** 负责人 */
    leader: string
    /** 手机号 */
    phone: string
    /** 邮箱 */
    email: string
    /** 状态 1:停用 2:正常 */
    status: string | number
    /** 子部门 */
    children?: DeptEntity[]
    /** 备注 */
    remark?: string
  } & Common.CommonEntity

  type DeptListParams = {
    /** 页码 */
    pageIndex?: number
    /** 每页大小 */
    pageSize?: number
    /** 部门名称 */
    deptName?: string
    /** 部门ID */
    deptId?: number
    /** 上级部门ID */
    parentId?: number
    /** 状态 */
    status?: string
  }

  type DeptLabel = {
    /** 部门ID */
    id: number
    /** 部门名称 */
    label: string
    /** 子部门 */
    children?: DeptLabel[]
  }
}
