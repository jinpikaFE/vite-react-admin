import { storeGlobalUser } from '@/store/globalUser'
import {
  addUser,
  delUser,
  editUser,
  getUserList,
  updateUserStatus
} from '@/apis/accessManagement/user'
import { getDeptTree } from '@/apis/accessManagement/dept'
import ExcelTable from '@/components/exportExcel'
import {
  ActionType,
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect
} from '@ant-design/pro-components'
import { Button, Modal, Popconfirm, Switch, message, Tree, Card, Row, Col, TreeProps } from 'antd'
import { useRef, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { getRoleList } from '@/apis/accessManagement/role'
import FormUploadNew from '@/components/formUploadNew'
import { PlusOutlined } from '@ant-design/icons'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'

const UserManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null)
  const modalFormRef = useRef<ProFormInstance>(null)
  const [deptTree, setDeptTree] = useState<Dept.DeptLabel[]>([])
  const [selectedDeptId, setSelectedDeptId] = useState<number | undefined>()

  // 获取部门树数据
  const fetchDeptTree = async () => {
    try {
      const res = await getDeptTree()
      if (res) {
        setDeptTree(res)
      }
    } catch (error) {
      console.error('获取部门树失败:', error)
    }
  }

  useEffect(() => {
    fetchDeptTree()
  }, [])

  // 部门树选择处理
  const handleDeptSelect = (selectedKeys: React.Key[]) => {
    const deptId = selectedKeys.length > 0 ? Number(selectedKeys[0]) : undefined
    setSelectedDeptId(deptId)
    // 重新加载用户列表
    actionRef?.current?.reload()
  }

  // 处理"全部"选项点击
  const handleAllClick = () => {
    setSelectedDeptId(undefined)
    actionRef?.current?.reload()
  }

  const onSubmit = async (record?: User.UserEntity) => {
    const val = await modalFormRef?.current?.validateFields()
    
    // 角色ID去重处理
    let roleIds = val?.roleIds || []
    if (Array.isArray(roleIds)) {
      roleIds = [...new Set(roleIds)] // 去重
    }
    
    const resVal = {
      ...val,
      roleIds,
      avatar: val?.avatar?.[0] || val?.avatar || ''
    }
    
    if (record) {
      // 编辑
      const res = await editUser({
        ...resVal,
        userId: record?.userId
      })
      message.success('编辑成功')
      actionRef?.current?.reload()
      return Promise.resolve()
    }
    // 新建
    const res = await addUser({ ...resVal })
    message.success('新建成功')
    actionRef?.current?.reload()
    return Promise.resolve()
  }

  const showModal = (record?: User.UserEntity) => {
    Modal.confirm({
      title: record ? '编辑用户' : '添加用户',
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
            sex: '1',
            ...record,
            avatar: record?.avatar ? [record?.avatar] : undefined,
            roleIds: record?.roleIds || []
          }}
          formRef={modalFormRef}
        >
          <ProFormText label="账号" name="username" rules={[{ required: true }]} />
          <ProFormText label="姓名" name="nickName" rules={[{ required: true }]} />
          <ProFormText label="邮箱" name="email" rules={[{ required: true }, { type: 'email', message: '请输入正确的邮箱格式' }]} />
          <ProFormText label="手机号" name="phone" rules={[{ required: true }]} />
          <ProFormSelect
            label="性别"
            name="sex"
            valueEnum={
              new Map([
                ['1', '男'],
                ['2', '女']
              ])
            }
          />
          {!record && (
            <ProFormText.Password label="密码" name="password" rules={[{ required: true }]} />
          )}
          <ProFormTreeSelect
            label="部门"
            name="deptId"
            allowClear
            rules={[{ required: true, message: '请选择部门' }]}
            fieldProps={{
              fieldNames: {
                label: 'label',
                value: 'id',
                children: 'children'
              },
              treeData: deptTree as any,
              placeholder: '请选择部门',
              treeDefaultExpandAll: true
            }}
          />
          <FormUploadNew
            formItemProps={{
              label: '头像',
              name: 'avatar'
            }}
            required={false}
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
    <Row gutter={16}>
      {/* 左侧部门树 */}
      <Col span={6}>
        <Card title="部门管理" size="small" style={{ height: 'calc(100vh - 200px)' }}>
          {/* 全部选项 */}
          <div
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              backgroundColor: selectedDeptId === undefined ? '#e6f7ff' : 'transparent',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              marginBottom: '8px',
              fontWeight: selectedDeptId === undefined ? 'bold' : 'normal'
            }}
            onClick={handleAllClick}
          >
            全部
          </div>
          <Tree
            treeData={deptTree as unknown as TreeProps['treeData']}
            fieldNames={{ title: 'label', key: 'id', children: 'children' }}
            onSelect={handleDeptSelect}
            selectedKeys={selectedDeptId ? [selectedDeptId] : []}
            defaultExpandAll
            showLine
            showIcon
          />
        </Card>
      </Col>

      {/* 右侧用户列表 */}
      <Col span={18}>
        <ExcelTable
          columns={[
            {
              title: '账号/姓名',
              dataIndex: 'username',
              hideInTable: true
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
              title: '手机号',
              dataIndex: 'phone',
              hideInSearch: true
            },
            {
              title: '部门',
              dataIndex: ['dept', 'deptName'],
              hideInSearch: true
            },
            {
              title: '性别',
              dataIndex: 'sex',
              hideInSearch: true,
              valueEnum: {
                '1': '男',
                '2': '女'
              }
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
                    disabled={entity?.username === storeGlobalUser?.userInfo?.username}
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
                  disabled={record?.username === storeGlobalUser?.userInfo?.username}
                >
                  编辑
                </Button>,
                <Popconfirm
                  disabled={record?.username === storeGlobalUser?.userInfo?.username}
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
                    disabled={record?.username === storeGlobalUser?.userInfo?.username}
                  >
                    删除
                  </Button>
                </Popconfirm>
              ]
            }
          ]}
          requestFn={async params => {
            const data = await getUserList({
              ...params,
              deptId: selectedDeptId // 添加部门筛选参数
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
      </Col>
    </Row>
  )
}

export default observer(UserManagement)
