import { addMenu, delMenu, editMenu, getMenuList, getMenuTree } from '@/apis/accessManagement/menu'
import {
  ActionType,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable
} from '@ant-design/pro-components'
import { Button, Modal, Popconfirm, Switch, message, Tag } from 'antd'
import { useRef } from 'react'
import { observer } from 'mobx-react'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'

const MenuManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null)
  const modalFormRef = useRef<ProFormInstance>(null)

  const onSubmit = async (record?: Menu.MenuEntity) => {
    const val = await modalFormRef?.current?.validateFields()
    const resVal = {
      ...val
    }
    if (record) {
      // 编辑
      await editMenu(record.menuId, resVal)
      message.success('编辑成功')
      actionRef?.current?.reload()
      return Promise.resolve()
    }
    // 新建
    const res = await addMenu({ ...resVal })
    message.success('新建成功')
    actionRef?.current?.reload()
    return Promise.resolve()
  }

  const showModal = (record?: Menu.MenuEntity) => {
    Modal.confirm({
      title: record ? '编辑菜单' : '添加菜单',
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
            visible: '0',
            sort: 0,
            menuType: 'C',
            ...record
          }}
          formRef={modalFormRef}
        >
          <ProFormSelect
            label="上级菜单"
            name="parentId"
            allowClear
            request={async () => {
              const res = await getMenuTree()
              if (res) {
                // 递归处理菜单树，提取所有菜单项
                const flattenMenus = (menus: Menu.MenuEntity[]): Array<{ label: string; value: number }> => {
                  const result: Array<{ label: string; value: number }> = []
                  menus.forEach(menu => {
                    result.push({
                      label: menu.title,
                      value: menu.menuId
                    })
                    if (menu.children && menu.children.length > 0) {
                      result.push(...flattenMenus(menu.children))
                    }
                  })
                  return result
                }
                return flattenMenus(res)
              }
              return []
            }}
          />
          <ProFormText
            label="菜单名称"
            name="menuName"
            rules={[{ required: true, message: '请输入菜单名称' }]}
            placeholder="请输入英文标识"
          />
          <ProFormText
            label="菜单标题"
            name="title"
            rules={[{ required: true, message: '请输入菜单标题' }]}
            placeholder="请输入中文显示名称"
          />
          <ProFormText
            label="菜单图标"
            name="icon"
            placeholder="请输入图标名称"
          />
          <ProFormText
            label="路由路径"
            name="path"
            placeholder="请输入路由路径"
          />
          <ProFormText
            label="组件路径"
            name="component"
            placeholder="请输入组件路径"
          />
          <ProFormSelect
            label="菜单类型"
            name="menuType"
            rules={[{ required: true, message: '请选择菜单类型' }]}
            valueEnum={
              new Map([
                ['M', '目录'],
                ['C', '菜单'],
                ['F', '按钮']
              ])
            }
          />
          <ProFormText
            label="权限标识"
            name="permission"
            placeholder="请输入权限标识"
          />
          <ProFormDigit
            min={0}
            precision={0}
            label="排序"
            name="sort"
            rules={[{ required: true, message: '请输入排序' }]}
          />
          <ProFormRadio.Group
            label="是否显示"
            name="visible"
            rules={[{ required: true }]}
            valueEnum={
              new Map([
                ['0', '显示'],
                ['1', '隐藏']
              ])
            }
          />
          <ProFormRadio.Group
            label="是否缓存"
            name="noCache"
            valueEnum={
              new Map([
                [false, '缓存'],
                [true, '不缓存']
              ])
            }
          />
          <ProFormTextArea label="备注" name="remark" />
        </ProForm>
      )
    })
  }

  // 菜单类型标签渲染
  const renderMenuType = (menuType: string) => {
    const typeMap = {
      'M': { text: '目录', color: 'blue' },
      'C': { text: '菜单', color: 'green' },
      'F': { text: '按钮', color: 'orange' }
    }
    const type = typeMap[menuType as keyof typeof typeMap]
    return type ? <Tag color={type.color}>{type.text}</Tag> : menuType
  }

  return (
    <ProTable<Menu.MenuEntity>
      columns={[
        {
          title: '菜单名称',
          dataIndex: 'menuName',
          width: 120
        },
        {
          title: '菜单标题',
          dataIndex: 'title',
          width: 120
        },
        {
          title: '图标',
          dataIndex: 'icon',
          width: 80,
          hideInSearch: true,
          render: (icon: string) => icon ? <span>{icon}</span> : '-'
        },
        {
          title: '路由路径',
          dataIndex: 'path',
          width: 120,
          hideInSearch: true
        },
        {
          title: '组件路径',
          dataIndex: 'component',
          width: 150,
          hideInSearch: true
        },
        {
          title: '菜单类型',
          dataIndex: 'menuType',
          width: 80,
          hideInSearch: true,
          render: (menuType: string) => renderMenuType(menuType)
        },
        {
          title: '权限标识',
          dataIndex: 'permission',
          width: 120,
          hideInSearch: true
        },
        {
          title: '排序',
          dataIndex: 'sort',
          width: 60,
          hideInSearch: true
        },
        {
          title: '是否显示',
          dataIndex: 'visible',
          width: 80,
          hideInSearch: true,
          render: (dom: any, entity: Menu.MenuEntity) => {
            return (
              <Switch
                checked={entity?.visible === '0'}
                onChange={async (val: boolean) => {
                  const res = await editMenu(entity.menuId, {
                    visible: val ? '0' : '1'
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
          title: '更新时间',
          dataIndex: 'updatedAt',
          width: 120,
          hideInSearch: true,
          valueType: 'dateTime'
        },
        {
          title: '操作',
          key: 'option',
          valueType: 'option',
          width: 120,
          render: (_: any, record: Menu.MenuEntity) => [
            <Button key="edit" type="link" onClick={() => showModal(record)}>
              编辑
            </Button>,
            <Popconfirm
              key="delete"
              placement="topRight"
              title="确定要删除吗?"
              onConfirm={async () => {
                const res = await delMenu(record?.menuId)
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
        const data = await getMenuList({
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
          添加菜单
        </PunkEffectButton2>
      ]}
      rowKey="menuId"
      // 启用树形表格
      expandable={{
        defaultExpandAllRows: true
      }}
      // 支持树形数据
      pagination={false}
    />
  )
}

export default observer(MenuManagement)
