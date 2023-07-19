import { getComponTree } from '@/apis/accessManagement/compon'
import { getResourceCategoryList } from '@/apis/accessManagement/resource'
import {
  addRole,
  delRole,
  editRole,
  editRoleStatus,
  getRoleList
} from '@/apis/accessManagement/role'
import { getMonitorList } from '@/apis/home'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'
import ExcelTable from '@/components/exportExcel'
import {
  ActionType,
  ProForm,
  ProFormCascader,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect
} from '@ant-design/pro-components'
import { Button, Cascader, Modal, Popconfirm, Switch, TreeSelect, message } from 'antd'
import { useRef } from 'react'

const Home: React.FC = () => {
  const actionRef = useRef<ActionType>()

  return (
    <ExcelTable
      columns={[
        {
          title: '角色名称2',
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
          title: '角色名称',
          dataIndex: 'name',
          hideInSearch: true
        },
        {
          title: '描述',
          dataIndex: 'description',
          hideInSearch: true
        }
      ]}
      rowKey="_time"
      requestFn={async params => {
        const data = await getMonitorList({
          ...params
        })
        return data
      }}
      actionRef={actionRef}
      rowSelection={false}
      toolBarRenderFn={() => []}
    />
  )
}

export default Home
