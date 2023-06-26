import { getRoleList } from '@/apis/accessManagement/role'
import ExcelTable from '@/components/exportExcel'

const RoleManangement: React.FC = () => {
  return (
    <ExcelTable
      columns={[
        /** table */
        {
          title: '角色名',
          dataIndex: 'keyword',
          hideInTable: true
        },
        /** search */
        {
          title: '序号',
          dataIndex: 'id',
          hideInSearch: true
        },
        {
          title: '用户名',
          dataIndex: 'username',
          hideInSearch: true
        },
        {
          title: '昵称',
          dataIndex: 'nickName',
          hideInSearch: true
        },
        {
          title: '头像',
          dataIndex: 'icon',
          hideInSearch: true,
          valueType: 'avatar'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          hideInSearch: true
        },
        {
          title: '登录时间',
          dataIndex: 'loginTime',
          hideInSearch: true,
          valueType: 'dateTime'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          hideInSearch: true,
          valueType: 'dateTime'
        },
        {
          title: '备注',
          dataIndex: 'note',
          hideInSearch: true
        }
      ]}
      requestFn={async (params: any) => {
        const data = await getRoleList({
          ...params
        })
        return data
      }}
      rowSelection={false}
      toolBarRenderFn={() => []}
    />
  )
}

export default RoleManangement
