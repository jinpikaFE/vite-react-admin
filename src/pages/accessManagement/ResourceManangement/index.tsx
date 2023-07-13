import {
  addResourceCategory,
  delResourceCategory,
  editResourceCategory,
  getResourceCategoryList
} from '@/apis/accessManagement/resource'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'
import ExcelTable from '@/components/exportExcel'
import {
  ActionType,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormText
} from '@ant-design/pro-components'
import { Button, Modal, Popconfirm, message } from 'antd'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ResourceManangement: React.FC = () => {
  const navigate = useNavigate()
  const actionRef = useRef<ActionType>()
  const modalFormRef = useRef<ProFormInstance>()

  const onSubmit = async (record?: Resource.ResourceCategoryEntity) => {
    const val = await modalFormRef?.current?.validateFields()
    if (record) {
      // 编辑
      const res = await editResourceCategory({
        ...val,
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
    const res = await addResourceCategory(val)
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
          <ProFormText label="名称" name="name" rules={[{ required: true }]} />
          <ProFormDigit
            label="排序"
            name="sort"
            rules={[{ required: true }]}
            fieldProps={{ precision: 0 }}
          />
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
          title: '分类名',
          dataIndex: 'name',
          hideInSearch: true
        },
        {
          title: '排序',
          dataIndex: 'sort',
          hideInSearch: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
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
          title: '操作',
          key: 'option',
          valueType: 'option',
          render: (_, record) => [
            <Button key="detail" type="link" onClick={() => navigate(`${record?.id}/resource`)}>
              资源列表
            </Button>,
            <Button key="edit" type="link" onClick={() => showModal(record)}>
              编辑
            </Button>,
            <Popconfirm
              key="delete"
              placement="topRight"
              title="确定要删除吗?"
              onConfirm={async () => {
                const res = await delResourceCategory({ id: record?.id })
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
      headerTitle="资源分类"
      requestFn={async () => {
        const data = await getResourceCategoryList()
        return {
          code: data?.code,
          data: {
            list: data?.data
          }
        }
      }}
      actionRef={actionRef}
      search={false}
      rowSelection={false}
      toolBarRenderFn={() => [
        <PunkEffectButton2 key="add" onClick={() => showModal()}>
          添加
        </PunkEffectButton2>
      ]}
    />
  )
}

export default ResourceManangement
