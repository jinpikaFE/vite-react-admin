import {
  addRole,
  delRole,
  editRole,
  editRoleStatus,
  getRoleList,
  getRoleMenuTreeSelect
} from '@/apis/accessManagement/role'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'
import ExcelTable from '@/components/exportExcel'
import {
  ActionType,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect
} from '@ant-design/pro-components'
import { Button, Modal, Popconfirm, Switch, TreeSelect, message } from 'antd'
import { useRef } from 'react'

const RoleManangement: React.FC = () => {
  const actionRef = useRef<ActionType>(null)
  const modalFormRef = useRef<ProFormInstance>(null)

  const onSubmit = async (record?: Role.RoleEntity) => {
    const val = await modalFormRef?.current?.validateFields()
    const relVal = {
      ...val
    }

    if (record) {
      // 编辑
      const res = await editRole({
        ...relVal,
        roleId: record?.roleId
      })
      message.success('编辑成功')
      actionRef?.current?.reload()
      return Promise.resolve()
    }
    // 新建
    const res = await addRole({ ...relVal })
    message.success('新建成功')
    actionRef?.current?.reload()
    return Promise.resolve()
  }

  const showModal = (record?: Role.RoleEntity) => {
    Modal.confirm({
      title: record ? '编辑角色' : '添加角色',
      onOk: async () => onSubmit(record),
      okText: '确定',
      cancelText: '取消',
      width: 800,
      content: (
        <ProForm
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          submitter={false}
          layout="horizontal"
          initialValues={{
            status: '2',
            ...record,
            menuIds: record?.sysMenu?.map(menu => menu.menuId) || []
          }}
          formRef={modalFormRef}
        >
          <ProFormText
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '请输入角色名称' }]}
          />
          <ProFormText
            label="角色标识"
            name="roleKey"
            rules={[{ required: true, message: '请输入角色标识' }]}
          />
          <ProFormDigit
            min={0}
            precision={0}
            label="角色排序"
            name="roleSort"
            rules={[{ required: true, message: '请输入角色排序' }]}
          />
          <ProFormTextArea label="备注" name="remark" rules={[{ required: false }]} />
          <ProFormRadio.Group
            label="角色状态"
            name="status"
            rules={[{ required: true, message: '请选择角色状态' }]}
            valueEnum={
              new Map([
                ['2', '启用'],
                ['1', '禁用']
              ])
            }
          />
          <ProFormTreeSelect
            label="分配菜单"
            name="menuIds"
            allowClear
            fieldProps={{
              multiple: true,
              showCheckedStrategy: TreeSelect.SHOW_CHILD,
              fieldNames: {
                label: 'label',
                value: 'id',
                children: 'children'
              },
              treeCheckable: true
            }}
            rules={[{ required: true, message: '请选择菜单' }]}
            request={async () => {
              const res = await getRoleMenuTreeSelect(0)
              if (res?.menus) {
                return res.menus
              }
              return []
            }}
          />
        </ProForm>
      )
    })
  }

  return (
    <ExcelTable
      columns={[
        {
          title: '角色名称',
          dataIndex: 'roleName',
          hideInTable: true
        },
        {
          title: '角色标识',
          dataIndex: 'roleKey',
          hideInTable: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          hideInTable: true,
          valueEnum: {
            '1': '禁用',
            '2': '启用'
          }
        },
        /** search */
        {
          title: '序号',
          dataIndex: 'roleId',
          hideInSearch: true
        },
        {
          title: '角色名称',
          dataIndex: 'roleName',
          hideInSearch: true
        },
        {
          title: '角色标识',
          dataIndex: 'roleKey',
          hideInSearch: true
        },
        {
          title: '角色排序',
          dataIndex: 'roleSort',
          hideInSearch: true
        },
        {
          title: '备注',
          dataIndex: 'remark',
          hideInSearch: true
        },
        {
          title: '角色状态',
          dataIndex: 'status',
          hideInSearch: true,
          render(dom, entity) {
            return (
              <Switch
                checked={entity?.status === '2'}
                onChange={async val => {
                  const res = await editRoleStatus({
                    roleId: entity.roleId,
                    status: val ? '2' : '1'
                  })
                  if (res) {
                    message.success('修改成功')
                  } else {
                    message.error('修改失败')
                  }
                  actionRef?.current?.reload()
                }}
              />
            )
          }
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          hideInSearch: true,
          valueType: 'dateTime'
        },
        {
          title: '操作',
          key: 'option',
          valueType: 'option',
          render: (_, record) => [
            <Button key="edit" type="link" onClick={() => showModal(record)}>
              编辑
            </Button>,
            <Popconfirm
              key="delete"
              placement="topRight"
              title="确定要删除吗?"
              onConfirm={async () => {
                const res = await delRole({ ids: [record?.roleId] })
                if (res) {
                  message.success('删除成功')
                  actionRef?.current?.reloadAndRest?.()
                  return Promise.resolve()
                }
                return Promise.reject()
              }}
              okText="确定"
              okType="danger"
              cancelText="取消"
            >
              <Button type="link" danger key="delete">
                删除
              </Button>
            </Popconfirm>
          ]
        }
      ]}
      requestFn={async params => {
        const data = await getRoleList({
          ...params
        })
        return data
      }}
      actionRef={actionRef}
      rowSelection={false}
      toolBarRenderFn={() => [
        <PunkEffectButton2 key="add" onClick={() => showModal()}>
          添加
        </PunkEffectButton2>
      ]}
    />
  )
}

export default RoleManangement
