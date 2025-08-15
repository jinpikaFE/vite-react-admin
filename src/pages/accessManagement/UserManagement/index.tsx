import { storeGlobalUser } from '@/store/globalUser'
import {
  addUser,
  delUser,
  editUser,
  getUserList,
  updateUserStatus
} from '@/apis/accessManagement/user'
import ExcelTable from '@/components/exportExcel'
import {
  ActionType,
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { Button, Modal, Popconfirm, Switch, message } from 'antd'
import { useRef } from 'react'
import { observer } from 'mobx-react'
import { getRoleList } from '@/apis/accessManagement/role'
import FormUploadNew from '@/components/formUploadNew'
import { PlusOutlined } from '@ant-design/icons'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'

const UserManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null)
  const modalFormRef = useRef<ProFormInstance>(null)

  const onSubmit = async (record?: User.UserEntity) => {
    const val = await modalFormRef?.current?.validateFields()
    const resVal = {
      ...val,
      icon: val?.icon?.[0]
    }
    if (record) {
      // 编辑
      const res = await editUser({
        ...resVal,
        userId: record?.userId
      })
      if (res) {
        message.success('编辑成功')
        actionRef?.current?.reload()
        return Promise.resolve()
      }
      return Promise.reject()
    }
    // 新建
    const res = await addUser({ ...resVal })
    if (res) {
      message.success('新建成功')
      actionRef?.current?.reload()
      return Promise.resolve()
    }
    return Promise.reject()
  }
  const showModal = (record?: User.UserEntity) => {
    Modal.confirm({
      title: record ? '编辑' : '添加',
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
            status: '2',
            ...record,
            avatar: record?.avatar ? [record?.avatar] : undefined,
            roleIds: record?.roles
          }}
          formRef={modalFormRef}
        >
          <ProFormText label="账号" name="username" rules={[{ required: true }]} />
          <ProFormText label="姓名" name="nickName" rules={[{ required: true }]} />
          <ProFormText label="邮箱" name="email" rules={[{ required: true }]} />
          {!record && (
            <ProFormText.Password label="密码" name="password" rules={[{ required: true }]} />
          )}
          <FormUploadNew
            formItemProps={{
              label: '头像',
              name: 'avatar'
            }}
            required
            uploadProps={
              {
                accept: '.bmp,.jpg,.png,.jpeg',
                children: (
                  <>
                    <div>
                      <PlusOutlined style={{ color: '#40a9ff' }} />
                      <div style={{ marginTop: 8, color: '#40a9ff' }}>上传图片</div>
                    </div>
                  </>
                ),
                listType: 'picture-card',
                maxCount: 1
              } as any
            }
            isDragger={false}
          />
          <ProFormSelect
            label="角色"
            name="roleIds"
            mode="multiple"
            allowClear
            rules={[{ required: true, message: '请选择' }]}
            request={async () => {
              const res = await getRoleList({
                pageIndex: 1,
                pageSize: 9999
              })
              if (res) {
                return res?.list?.map((r: Role.RoleEntity) => ({
                  label: r?.roleName,
                  value: r?.roleId
                }))
              }
              return []
            }}
          />
          <ProFormTextArea label="备注" name="remark" />
          <ProFormRadio.Group
            label="是否启用"
            name="status"
            rules={[{ required: true }]}
            valueEnum={
              new Map([
                ['2', '是'],
                ['1', '否']
              ])
            }
          />
        </ProForm>
      )
    })
  }
  return (
    <ExcelTable
      columns={[
        {
          title: '账号/姓名',
          dataIndex: 'username',
          hideInTable: true
        },
        /** search */

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
          dataIndex: 'avatar',
          hideInSearch: true,
          valueType: 'avatar'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
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
          render(dom, entity) {
            return (
              <Switch
                disabled={entity?.username === storeGlobalUser?.userInfo?.userName}
                checked={entity?.status === '2'}
                onChange={async val => {
                  const res = await updateUserStatus({
                    userId: entity.userId,
                    status: val ? '2' : '1'
                  })

                  message.success('修改成功')

                  actionRef?.current?.reload()
                }}
              />
            )
          }
        },
        {
          title: '操作',
          key: 'option',
          valueType: 'option',
          render: (_, record) => [
            <Button
              key="edit"
              type="link"
              onClick={() => showModal(record)}
              disabled={record?.username === storeGlobalUser?.userInfo?.userName}
            >
              编辑
            </Button>,
            <Popconfirm
              disabled={record?.username === storeGlobalUser?.userInfo?.userName}
              key="delete"
              placement="topRight"
              title="确定要删除吗?"
              onConfirm={async () => {
                const res = await delUser({ userId: record?.userId })
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
              <Button
                type="link"
                danger
                key="delete"
                disabled={record?.userName === storeGlobalUser?.userInfo?.userName}
              >
                删除
              </Button>
            </Popconfirm>
          ]
        }
      ]}
      requestFn={async params => {
        const data = await getUserList({
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
      rowKey="userId"
    />
  )
}

export default observer(UserManagement)
