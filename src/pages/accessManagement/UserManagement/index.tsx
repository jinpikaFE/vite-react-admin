import { getUserList } from '@/apis/accessManagement/user'
import ExcelTable from '@/components/exportExcel'

const UserManagement: React.FC = () => {
  return (
    <ExcelTable
      columns={[
        /** table */
        {
          title: '关键字',
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
        const data = await getUserList({
          ...params
        })
        return data
      }}
      toolBarRenderFn={() => []}
    />
  )
}

export default UserManagement
