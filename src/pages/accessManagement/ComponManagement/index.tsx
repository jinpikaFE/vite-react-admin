import { addCompon, delCompon, editCompon, getComponTree } from '@/apis/accessManagement/compon'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'
import ExcelTable from '@/components/exportExcel'
import {
  ActionType,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components'
import { Button, Modal, Popconfirm, Switch, message } from 'antd'
import { useRef } from 'react'

enum ComponType {
  MENU,
  PAGE,
  COMPON
}

const ComponManagement: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const modalFormRef = useRef<ProFormInstance>()

  const onSubmit = async (record?: Resource.ResourceCategoryEntity, isCreateNext?: boolean) => {
    const val = await modalFormRef?.current?.validateFields()
    if (record) {
      if (isCreateNext) {
        // 添加下级
        const res = await addCompon({ ...val, parentId: record?.id })
        if (res?.code === 200) {
          message.success('添加成功')
          actionRef?.current?.reload()
          return Promise.resolve()
        }
        return Promise.reject()
      }
      // 编辑
      const res = await editCompon({
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
    const res = await addCompon({ ...val })
    if (res?.code === 200) {
      message.success('新建成功')
      actionRef?.current?.reload()
      return Promise.resolve()
    }
    return Promise.reject()
  }
  const showModal = (record?: Resource.ResourceCategoryEntity, isCreateNext?: boolean) => {
    Modal.confirm({
      title: record ? '编辑' : '添加',
      onOk: async () => onSubmit(record, isCreateNext),
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
            isShow: 1,
            ...(isCreateNext ? {} : record)
          }}
          formRef={modalFormRef}
        >
          <ProFormText label="菜单名" name="title" rules={[{ required: true }]} />
          <ProFormText label="前端名" name="name" rules={[{ required: true }]} />
          <ProFormText label="前端图标" name="icon" rules={[{ required: true }]} />
          <ProFormSelect
            label="类型"
            name="type"
            rules={[{ required: true, message: '请选择' }]}
            valueEnum={
              new Map([
                [ComponType.MENU, '菜单'],
                [ComponType.PAGE, '页面'],
                [ComponType.COMPON, '组件']
              ])
            }
          />
          <ProFormRadio.Group
            label="是否显示"
            name="isShow"
            rules={[{ required: true }]}
            valueEnum={
              new Map([
                [1, '是'],
                [0, '否']
              ])
            }
          />
          <ProFormDigit
            fieldProps={{ precision: 0 }}
            label="排序"
            name="sort"
            rules={[{ required: true }]}
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
          hideInSearch: true,
          render(dom, entity) {
            if (entity?.type === ComponType.MENU) {
              return (
                <Switch
                  checked={Boolean(entity?.isShow)}
                  onChange={async val => {
                    const res = await editCompon({
                      id: entity.id,
                      isShow: +val
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
            return '-'
          }
        },
        {
          title: '排序',
          dataIndex: 'sort',
          hideInSearch: true
        },
        {
          title: '类型',
          dataIndex: 'type',
          hideInSearch: true,
          valueEnum: new Map([
            [ComponType.MENU, '菜单'],
            [ComponType.PAGE, '页面'],
            [ComponType.COMPON, '组件']
          ])
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
            <Button key="add" type="link" onClick={() => showModal(record, true)}>
              添加下级组件
            </Button>,
            <Button key="edit" type="link" onClick={() => showModal(record)}>
              编辑
            </Button>,
            !record?.children && (
              <Popconfirm
                key="delete"
                placement="topRight"
                title="确定要删除吗?"
                onConfirm={async () => {
                  const res = await delCompon({ id: record?.id })
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
            )
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
        <PunkEffectButton2 key="add" onClick={() => showModal()}>
          添加一级组件
        </PunkEffectButton2>
      ]}
    />
  )
}

export default ComponManagement
