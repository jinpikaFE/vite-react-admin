import {
  addResource,
  delResource,
  editResource,
  getResourceList
} from '@/apis/accessManagement/resource'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'
import ExcelTable from '@/components/exportExcel'
import {
  ActionType,
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { Button, Modal, Popconfirm, message } from 'antd'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'

const Resource: React.FC = () => {
  const urlParams: { resourceCategoryId: number } = useParams() as any
  const actionRef = useRef<ActionType>()
  const modalFormRef = useRef<ProFormInstance>()

  const onSubmit = async (record?: Resource.ResourceCategoryEntity) => {
    const val = await modalFormRef?.current?.validateFields()
    if (record) {
      // 编辑
      const res = await editResource({
        ...val,
        id: record?.id,
        categoryId: urlParams?.resourceCategoryId
      })
      if (res?.code === 200) {
        message.success('编辑成功')
        actionRef?.current?.reload()
        return Promise.resolve()
      }
      return Promise.reject()
    }
    // 新建
    const res = await addResource({ ...val, categoryId: urlParams?.resourceCategoryId })
    if (res?.code === 200) {
      message.success('新建成功')
      actionRef?.current?.reload()
      return Promise.resolve()
    }
    return Promise.reject()
  }
  const showModal = (record?: Resource.ResourceCategoryEntity) => {
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
          initialValues={record}
          formRef={modalFormRef}
        >
          <ProFormText label="资源名称" name="name" rules={[{ required: true }]} />
          <ProFormText label="资源URL" name="url" rules={[{ required: true }]} />
          <ProFormTextArea label="描述" name="description" rules={[{ required: true }]} />
        </ProForm>
      )
    })
  }
  return (
    <ExcelTable
      columns={[
        {
          title: '资源名称',
          dataIndex: 'nameKeyword',
          hideInTable: true
        },
        {
          title: '资源路径',
          dataIndex: 'urlKeyword',
          hideInTable: true
        },
        /** search */
        {
          title: '序号',
          dataIndex: 'id',
          hideInSearch: true
        },
        {
          title: '分类名',
          dataIndex: 'name',
          hideInSearch: true
        },
        {
          title: '资源路径',
          dataIndex: 'url',
          hideInSearch: true
        },
        {
          title: '描述',
          dataIndex: 'description',
          hideInSearch: true
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
                const res = await delResource({ id: record?.id })
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
        const data = await getResourceList({
          ...params,
          categoryId: urlParams?.resourceCategoryId
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

export default Resource
