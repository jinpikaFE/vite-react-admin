import {
  addMenu,
  delMenu,
  editMenu,
  getMenuList,
  getMenuTree,
  assignApisToMenu
} from '@/apis/systemManagement/menu'
import { getApiList } from '@/apis/systemManagement/api'
import {
  ActionType,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProTable
} from '@ant-design/pro-components'
import { IconSelector, PaginatedSelect } from '@/components'
import { Button, Modal, Popconfirm, Switch, message, Tag } from 'antd'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2'
import { Icon } from '@iconify/react'
import { MenuTypeEnum, MenuTypeEnumMap } from '@/apis/systemManagement/menu/menu.enum'

const SysMenuManage: React.FC = () => {
  const actionRef = useRef<ActionType>(null)
  const modalFormRef = useRef<ProFormInstance>(null)
  const assignApisFormRef = useRef<ProFormInstance>(null)
  const [assignApisModalVisible, setAssignApisModalVisible] = useState(false)
  const [currentMenu, setCurrentMenu] = useState<Menu.MenuEntity | null>(null)
  const [selectedApiIds, setSelectedApiIds] = useState<number[]>([])

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
            hideInMenu: '0',
            hideLayout: '0',
            sort: 0,
            menuType: MenuTypeEnum.MENU,
            parentId: 0,
            ...record
          }}
          formRef={modalFormRef}
        >
          <ProFormTreeSelect
            label="上级菜单"
            name="parentId"
            allowClear
            fieldProps={{
              fieldNames: {
                label: 'title',
                value: 'menuId'
              },
              treeDefaultExpandAll: true
            }}
            request={async () => {
              const res = await getMenuTree()

              return [
                {
                  title: '主类目',
                  menuId: 0,
                  children: res
                }
              ]
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
          <ProForm.Item label="菜单图标" name="icon">
            <IconSelector placeholder="请选择图标" />
          </ProForm.Item>
          <ProFormText label="路由路径" name="path" placeholder="请输入路由路径" />
          <ProFormText label="组件路径" name="component" placeholder="请输入组件路径" />
          <ProFormSelect
            label="菜单类型"
            name="menuType"
            rules={[{ required: true, message: '请选择菜单类型' }]}
            options={Object.values(MenuTypeEnumMap)}
          />
          <ProFormText label="权限标识" name="permission" placeholder="请输入权限标识" />
          <ProFormDigit
            min={0}
            precision={0}
            label="排序"
            name="sort"
            rules={[{ required: true, message: '请输入排序' }]}
          />
          <ProFormRadio.Group
            label="是否显示"
            name="hideInMenu"
            rules={[{ required: true }]}
            valueEnum={
              new Map([
                ['0', '显示'],
                ['1', '隐藏']
              ])
            }
          />
          <ProFormRadio.Group
            label="是否隐藏布局"
            name="hideLayout"
            valueEnum={
              new Map([
                ['0', '显示'],
                ['1', '隐藏']
              ])
            }
          />
          {/* <ProFormRadio.Group
            label="是否缓存"
            name="noCache"
            valueEnum={
              new Map([
                [false, '缓存'],
                [true, '不缓存']
              ])
            }
          /> */}
          <ProFormTextArea label="备注" name="remark" />
        </ProForm>
      )
    })
  }

  const showAssignApisModal = async (record: Menu.MenuEntity) => {
    setCurrentMenu(record)

    setAssignApisModalVisible(true)
  }

  const handleAssignApis = async () => {
    if (!currentMenu) return

    try {
      const values = await assignApisFormRef?.current?.validateFields()
      console.log(values)

      const apis = values?.apis?.map((item: any) => item?.value || item) || []

      await assignApisToMenu(currentMenu.menuId, { apis })
      message.success('分配API成功')
      setAssignApisModalVisible(false)
      actionRef?.current?.reload()
    } catch (error) {
      message.error('分配API失败')
    }
  }

  // 菜单类型标签渲染
  const renderMenuType = (menuType: MenuTypeEnum) => {
    return menuType ? (
      <Tag color={MenuTypeEnumMap[menuType].color}>{MenuTypeEnumMap[menuType].label}</Tag>
    ) : (
      '-'
    )
  }

  return (
    <>
      <ProTable<Menu.MenuEntity>
        columns={[
          {
            title: '菜单名称',
            dataIndex: 'menuName'
          },
          {
            title: '菜单标题',
            dataIndex: 'title'
          },
          {
            title: '图标',
            dataIndex: 'icon',

            hideInSearch: true,
            render: (dom: any, entity: Menu.MenuEntity) => {
              return entity?.icon ? <Icon icon={entity.icon} /> : '-'
            }
          },
          {
            title: '路由路径',
            dataIndex: 'path',

            hideInSearch: true,
            ellipsis: true
          },

          {
            title: '菜单类型',
            dataIndex: 'menuType',

            hideInSearch: true,
            render: (dom: any, entity: Menu.MenuEntity) =>
              renderMenuType(entity.menuType as MenuTypeEnum)
          },
          {
            title: '权限标识',
            dataIndex: 'permission',

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
            dataIndex: 'hideInMenu',
            width: 80,
            hideInSearch: true,
            render: (dom: any, entity: Menu.MenuEntity) => {
              return (
                <Switch
                  checked={entity?.hideInMenu === '0'}
                  onChange={async (val: boolean) => {
                    const res = await editMenu(entity.menuId, {
                      hideInMenu: val ? '0' : '1'
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
            title: '是否隐藏布局',
            dataIndex: 'hideLayout',

            hideInSearch: true,
            valueEnum: new Map([
              ['0', '显示'],
              ['1', '隐藏']
            ])
          },

          {
            title: '更新时间',
            dataIndex: 'updatedAt',

            hideInSearch: true,
            valueType: 'dateTime'
          },
          {
            title: '操作',
            key: 'option',
            valueType: 'option',
            width: 160,
            render: (_: any, record: Menu.MenuEntity) => [
              <Button key="assign" type="link" onClick={() => showAssignApisModal(record)}>
                分配API
              </Button>,
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

      {/* 分配API模态框 */}
      <Modal
        title={`分配API - ${currentMenu?.title || ''}`}
        open={assignApisModalVisible}
        onOk={handleAssignApis}
        onCancel={() => setAssignApisModalVisible(false)}
        width={800}
        okText="确定"
        cancelText="取消"
        destroyOnHidden
      >
        <ProForm
          layout="horizontal"
          formRef={assignApisFormRef}
          submitter={false}
          initialValues={{
            apis: currentMenu?.sysApi?.map(api => ({
              label: `${api.title}-${api.action}-${api.path}`,
              value: api.id
            }))
          }}
        >
          <PaginatedSelect
            label="API"
            name="apis"
            mode="multiple"
            placeholder="请选择要分配的API"
            tooltip="支持搜索API名称或路径"
            request={async params => {
              const res = await getApiList(params)
              return {
                data: res?.list?.map(api => ({
                  label: `${api.title}-${api.action}-${api.path}`,
                  value: api.id
                })),
                total: res?.count
              }
            }}
            pageSize={20}
          />
        </ProForm>
      </Modal>
    </>
  )
}

const ObserverSysMenuManage = observer(SysMenuManage)

export default ObserverSysMenuManage
