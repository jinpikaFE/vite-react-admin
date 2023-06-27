import { addCompon, delCompon, editCompon, getComponTree } from '@/apis/accessManagement/compon'
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

const ComponManagement: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const modalFormRef = useRef<ProFormInstance>()

  const onSubmit = async (record?: Resource.ResourceCategoryEntity) => {
    const val = await modalFormRef?.current?.validateFields()
    if (record) {
      // 编辑
      const res = await editCompon({
        ...val,
        id: record?.id
      })
      if (res?.code === 200) {
        message.success('编辑成功')
        actionRef?.current?.reload()
      }
    } else {
      // 新建
      const res = await addCompon({ ...val })
      if (res?.code === 200) {
        message.success('新建成功')
        actionRef?.current?.reload()
      }
    }
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
        /** search */
        {
          title: '序号',
          dataIndex: 'id',
          hideInSearch: true
        },
        {
          title: '组件名',
          dataIndex: 'title',
          hideInSearch: true
        },
        {
          title: '级数',
          dataIndex: 'level',
          hideInSearch: true
        },
        {
          title: '前端名称',
          dataIndex: 'name',
          hideInSearch: true
        },
        {
          title: '前端图标',
          dataIndex: 'icon',
          hideInSearch: true
        },
        {
          title: '是否显示',
          dataIndex: 'isShow',
          hideInSearch: true
        },
        {
          title: '排序',
          dataIndex: 'sort',
          hideInSearch: true
        },
        {
          title: '类型',
          dataIndex: 'type',
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
                const res = await delCompon({ id: record?.id })
                if (res?.code === 200) {
                  message.success('删除成功')
                  actionRef?.current?.reloadAndRest?.()
                }
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
        const data = await getComponTree()
        return {
          code: data?.code,
          data: {
            list: data?.data
          }
        }
      }}
      search={false}
      actionRef={actionRef}
      rowSelection={false}
      toolBarRenderFn={() => [
        <Button key="add" onClick={() => showModal()}>
          添加
        </Button>
      ]}
    />
  )
}

export default ComponManagement
