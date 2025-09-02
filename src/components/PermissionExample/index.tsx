import { usePermission, PermissionGuard } from '@/utils/usePermission'
import { Button, Card, Space, Tag } from 'antd'
import { observer } from 'mobx-react'
import { MENU_NAMES } from '@/constants/menuNames'

/**
 * 权限控制使用示例组件
 */
function PermissionExample() {
  const {
    userInfo,
    hasMenuNamePermission,
    hasButtonPermission,
    hasRole,
    hasAllPermissions,
    hasAnyPermission
  } = usePermission()

  return (
    <Card title="权限控制示例" style={{ margin: '16px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 用户信息展示 */}
        <Card size="small" title="当前用户信息">
          <p>用户名: {userInfo.username}</p>
          <p>昵称: {userInfo.nickName}</p>
          <p>
            角色:{' '}
            {userInfo.roles?.map(role => (
              <Tag key={role}>{role}</Tag>
            ))}
          </p>
          <p>
            权限:{' '}
            {userInfo.permissions?.map(perm => (
              <Tag key={perm} color="blue">
                {perm}
              </Tag>
            ))}
          </p>
        </Card>

        {/* Hook方式使用权限控制 */}
        <Card size="small" title="Hook方式权限控制">
          <Space wrap>
            {hasButtonPermission('system:user:add') && <Button type="primary">新增用户</Button>}

            {hasButtonPermission('system:user:edit') && <Button>编辑用户</Button>}

            {hasButtonPermission('system:user:delete') && <Button danger>删除用户</Button>}

            {hasRole('admin') && <Button type="dashed">管理员专用功能</Button>}

            {hasMenuNamePermission(MENU_NAMES.USER_MANAGEMENT) && <Button>访问用户管理</Button>}
          </Space>
        </Card>

        {/* 组件方式使用权限控制 */}
        <Card size="small" title="组件方式权限控制">
          <Space wrap>
            <PermissionGuard permission="system:user:add">
              <Button type="primary">新增用户（组件控制）</Button>
            </PermissionGuard>

            <PermissionGuard
              permissions={['system:user:edit', 'system:user:view']}
              fallback={<Button disabled>无编辑权限</Button>}
            >
              <Button>编辑用户（需要编辑和查看权限）</Button>
            </PermissionGuard>

            <PermissionGuard
              anyPermissions={['system:user:delete', 'system:admin']}
              fallback={<Button disabled>无删除权限</Button>}
            >
              <Button danger>删除用户（需要删除权限或管理员权限之一）</Button>
            </PermissionGuard>

            <PermissionGuard role="admin">
              <Button type="dashed">管理员功能（组件控制）</Button>
            </PermissionGuard>

            <PermissionGuard
              anyRoles={['admin', 'super_admin']}
              fallback={<Tag color="red">需要管理员权限</Tag>}
            >
              <Button>高级功能</Button>
            </PermissionGuard>
          </Space>
        </Card>

        {/* 复杂权限检查示例 */}
        <Card size="small" title="复杂权限检查">
          <Space wrap>
            {hasAllPermissions(['system:user:list', 'system:user:view']) && (
              <Button>需要多个权限（AND）</Button>
            )}

            {hasAnyPermission(['system:user:export', 'system:admin']) && (
              <Button>需要权限之一（OR）</Button>
            )}
          </Space>
        </Card>

        {/* 权限检查结果展示 */}
        <Card size="small" title="权限检查结果">
          <Space direction="vertical">
            <div>
              路由菜单权限检查 {MENU_NAMES.USER_MANAGEMENT}:
              <Tag color={hasMenuNamePermission(MENU_NAMES.USER_MANAGEMENT) ? 'green' : 'red'}>
                {hasMenuNamePermission(MENU_NAMES.USER_MANAGEMENT) ? '有权限' : '无权限'}
              </Tag>
            </div>
            <div>
              按钮权限检查 system:user:add:
              <Tag color={hasButtonPermission('system:user:add') ? 'green' : 'red'}>
                {hasButtonPermission('system:user:add') ? '有权限' : '无权限'}
              </Tag>
            </div>
            <div>
              角色检查 admin:
              <Tag color={hasRole('admin') ? 'green' : 'red'}>
                {hasRole('admin') ? '有角色' : '无角色'}
              </Tag>
            </div>
          </Space>
        </Card>
      </Space>
    </Card>
  )
}

const PermissionExampleComponent = observer(PermissionExample)

export default PermissionExampleComponent
