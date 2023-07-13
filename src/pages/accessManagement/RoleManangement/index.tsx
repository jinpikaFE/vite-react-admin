import { getComponTree } from '@/apis/accessManagement/compon'
import { getResourceCategoryList } from '@/apis/accessManagement/resource'
import {
  addRole,
  delRole,
  editRole,
  editRoleStatus,
  getRoleList
} from '@/apis/accessManagement/role'
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

const RoleManangement: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const modalFormRef = useRef<ProFormInstance>()

  const onSubmit = async (record?: Resource.ResourceCategoryEntity) => {
    const val = await modalFormRef?.current?.validateFields()
    const relVal = {
      ...val
    }

    if (record) {
      // 编辑
      const res = await editRole({
        ...relVal,
        id: record?.id
      })
      if (res?.code === 200) {
        message.success('编辑成功')
        actionRef?.current?.reload()
        return Promise.resolve()
      }
      return Promise.reject()
    }
    // 新建
    const res = await addRole({ ...relVal })
    if (res?.code === 200) {
      message.success('新建成功')
      actionRef?.current?.reload()
      return Promise.resolve()
    }
    return Promise.reject()
  }
  const showModal = (record?: Role.RoleEntity) => {
    Modal.confirm({
      title: record ? '编辑' : '添加',
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
            status: 1,
            ...record,
            menus: record?.menus?.map(item => item?.id),
            resources: record?.resources?.map(item => item?.id)
          }}
          formRef={modalFormRef}
        >
          <ProFormText label="角色名称" name="name" rules={[{ required: true }]} />
          <ProFormTextArea label="描述" name="description" rules={[{ required: true }]} />
          <ProFormRadio.Group
            label="是否启用"
            name="status"
            rules={[{ required: true }]}
            valueEnum={
              new Map([
                [1, '是'],
                [0, '否']
              ])
            }
          />
          <ProFormTreeSelect
            label="分配资源"
            name="resources"
            allowClear
            fieldProps={{
              multiple: true,
              showCheckedStrategy: TreeSelect.SHOW_CHILD,
              fieldNames: {
                label: 'name',
                value: 'id',
                children: 'resources'
              },
              treeCheckable: true
            }}
            rules={[{ required: true, message: '请选择' }]}
            request={async () => {
              const res = await getResourceCategoryList()
              if (res?.code === 200) {
                return res?.data?.map((r: any) => ({
                  ...r,
                  id: `categoryId${r?.id}`,
                  disabled: !(r?.resources?.length > 0)
                }))
              }
              return []
            }}
          />
          <ProFormTreeSelect
            label="分配组件"
            name="menus"
            allowClear
            fieldProps={{
              multiple: true,
              showCheckedStrategy: TreeSelect.SHOW_CHILD,
              fieldNames: {
                label: 'title',
                value: 'id'
              },
              treeCheckable: true
            }}
            rules={[{ required: true, message: '请选择' }]}
            request={async () => {
              const res = await getComponTree()
              if (res?.code === 200) {
                return res?.data
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
        },
        {
          title: '是否显示',
          dataIndex: 'status',
          hideInSearch: true,
          render(dom, entity) {
            return (
              <Switch
                checked={Boolean(entity?.status)}
                onChange={async val => {
                  const res = await editRoleStatus({
                    id: entity.id,
                    status: +val
                  })
                  if (res?.code === 200) {
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
          dataIndex: 'createTime',
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
                const res = await delRole({ ids: record?.id })
                if (res?.code === 200) {
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
