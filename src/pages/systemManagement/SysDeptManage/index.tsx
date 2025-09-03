import { addDept, delDept, editDept, getDeptList, getDeptTree } from '@/apis/systemManagement/dept'
import {
  ActionType,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormTreeSelect,
  ProFormText,
  ProFormTextArea,
  ProTable
} from '@ant-design/pro-components'
import { Button, Modal, Popconfirm, Switch, message } from 'antd'
import { useRef } from 'react'
import { observer } from 'mobx-react'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'

const SysDeptManage: React.FC = () => {
  const actionRef = useRef<ActionType>(null)
  const modalFormRef = useRef<ProFormInstance>(null)

  const onSubmit = async (record?: Dept.DeptEntity) => {
    const val = await modalFormRef?.current?.validateFields()
    const resVal = {
      ...val
    }
    if (record) {
      // 编辑
      await editDept(record.deptId, resVal)
      message.success('编辑成功')
      actionRef?.current?.reload()
      return Promise.resolve()
    }
    // 新建
    const res = await addDept({ ...resVal })
    message.success('新建成功')
    actionRef?.current?.reload()
    return Promise.resolve()
  }

  const showModal = (record?: Dept.DeptEntity) => {
    Modal.confirm({
      title: record ? '编辑部门' : '添加部门',
      onOk: async () => onSubmit(record),
      okText: '确定',
      cancelText: '取消',
      width: 600,
      content: (
        <ProForm
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
          submitter={false}
          layout="horizontal"
          initialValues={{
            status: 2,
            sort: 0,
            ...record
          }}
          formRef={modalFormRef}
        >
          <ProFormTreeSelect
            label="上级部门"
            name="parentId"
            allowClear
            fieldProps={{
              fieldNames: {
                label: 'label',
                value: 'id',
                children: 'children'
              },
              treeDefaultExpandAll: true
            }}
            request={async () => {
              const res = await getDeptTree()

              const children = res
              return [
                {
                  label: '主类目',
                  id: 0,
                  children
                }
              ]
            }}
          />
          <ProFormText
            label="部门名称"
            name="deptName"
            rules={[{ required: true, message: '请输入部门名称' }]}
          />
          <ProFormText
            label="负责人"
            name="leader"
            rules={[{ required: true, message: '请输入负责人' }]}
          />
          <ProFormText
            label="手机号"
            name="phone"
            rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}
          />
          <ProFormText
            label="邮箱"
            name="email"
            rules={[{ type: 'email', message: '请输入正确的邮箱格式' }]}
          />
          <ProFormDigit
            min={0}
            precision={0}
            label="排序"
            name="sort"
            rules={[{ required: true, message: '请输入排序' }]}
          />
          <ProFormTextArea label="备注" name="remark" />
          <ProFormRadio.Group
            label="是否启用"
            name="status"
            rules={[{ required: true }]}
            valueEnum={
              new Map([
                [2, '是'],
                [1, '否']
              ])
            }
          />
        </ProForm>
      )
    })
  }

  return (
    <ProTable<Dept.DeptEntity>
      columns={[
        {
          title: '部门名称',
          dataIndex: 'deptName'
        },
        {
          title: '负责人',
          dataIndex: 'leader',
          hideInSearch: true
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          hideInSearch: true
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          hideInSearch: true
        },
        {
          title: '排序',
          dataIndex: 'sort',
          hideInSearch: true
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          hideInSearch: true,
          valueType: 'dateTime'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          hideInSearch: true
        },
        {
          title: '是否启用',
          dataIndex: 'status',
          hideInSearch: true,
          render: (dom: any, entity: Dept.DeptEntity) => {
            return (
              <Switch
                checked={entity?.status === 2}
                onChange={async (val: boolean) => {
                  const res = await editDept(entity.deptId, {
                    status: val ? 2 : 1
                  })
                  if (res) {
                    message.success('修改成功')
                    actionRef?.current?.reload()
                  }
                }}
              />
            )
          }
        },
        {
          title: '操作',
          key: 'option',
          valueType: 'option',
          render: (_: any, record: Dept.DeptEntity) => [
            <Button key="edit" type="link" onClick={() => showModal(record)}>
              编辑
            </Button>,
            <Popconfirm
              key="delete"
              placement="topRight"
              title="确定要删除吗?"
              onConfirm={async () => {
                const res = await delDept(record?.deptId)
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
      request={async (params: any) => {
        const data = await getDeptList({
          ...params
        })
        return {
          data: data,
          success: true,
          total: data?.length
        }
      }}
      actionRef={actionRef}
      rowSelection={false}
      toolBarRender={() => [
        <PunkEffectButton2 key="add" onClick={() => showModal()}>
          添加部门
        </PunkEffectButton2>
      ]}
      rowKey="deptId"
      // 启用树形表格
      expandable={{
        defaultExpandAllRows: true
      }}
      // 支持树形数据
      pagination={false}
    />
  )
}

const ObserverSysDeptManage = observer(SysDeptManage)

export default ObserverSysDeptManage
