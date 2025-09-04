# Axios 封装使用说明

## 概述

本项目对 Axios 进行了模块化封装，提供了统一的 HTTP 请求管理、错误处理、拦截器配置等功能。

## 架构设计

### 核心模块

- **VAxios**: 主要的 Axios 封装类
- **ResponseHandler**: 响应数据处理器
- **RequestHandler**: 请求处理器  
- **ErrorHandler**: 错误处理器
- **AxiosCanceler**: 请求取消管理器

### 文件结构

```
src/server/
├── index.ts              # 主配置文件，导出axios实例
├── Axios.ts              # VAxios核心类
├── responseHandler.ts    # 响应处理逻辑
├── requestHandler.ts     # 请求处理逻辑
├── errorHandler.ts       # 错误处理逻辑
├── axiosCancel.ts        # 请求取消管理
├── axiosTransform.ts     # 数据转换抽象类
├── checkStatus.ts        # HTTP状态码处理
├── helper.ts             # 工具函数
└── types.ts              # 类型定义
```

## 基础使用

### 导入方式

```typescript
import http from '@/server'
// 或者
import { Axios } from '@/server'
```

### 基本请求

```typescript
// GET 请求
const userInfo = await http.request<User.UserEntity>({
  url: '/api/v1/user/info',
  method: 'get'
})

// POST 请求
const result = await http.request({
  url: '/api/v1/user/create',
  method: 'post',
  data: {
    name: '用户名',
    email: 'user@example.com'
  }
})

// 带参数的 GET 请求
const userList = await http.request({
  url: '/api/v1/users',
  method: 'get',
  params: {
    page: 1,
    page_size: 10
  }
})
```

### 请求配置选项

每个请求都可以传入 `RequestOptions` 来覆盖默认配置：

```typescript
const result = await http.request({
  url: '/api/v1/user/create',
  method: 'post',
  data: userData
}, {
  // 显示成功消息
  isShowSuccessMessage: true,
  successMessageText: '用户创建成功！',
  
  // 显示错误消息
  isShowErrorMessage: true,
  errorMessageText: '创建用户失败',
  
  // 错误提示方式：'none' | 'modal'
  errorMessageMode: 'modal',
  
  // 是否返回原生响应
  isReturnNativeResponse: false,
  
  // 是否进行数据转换
  isTransformResponse: true
})
```

## 高级功能

### 类型安全

使用 TypeScript 泛型确保类型安全：

```typescript
interface UserInfo {
  id: number
  name: string
  email: string
}

// 返回类型将被推断为 UserInfo
const userInfo = await http.request<UserInfo>({
  url: '/api/v1/user/info',
  method: 'get'
})
```

### 分页请求

使用内置的分页类型：

```typescript
import type { PageParams, PageResult } from '@/server'

const getUserList = async (params: PageParams) => {
  return http.request<PageResult<User.UserEntity>>({
    url: '/api/v1/users',
    method: 'get',
    params
  })
}
```

### 自定义拦截器

如果需要修改拦截器行为，可以在 `src/server/index.ts` 中调整：

```typescript
const transform: AxiosTransform = {
  // 请求前处理
  beforeRequestHook: RequestHandler.beforeRequest,
  
  // 请求拦截器
  requestInterceptors: RequestHandler.interceptRequest,
  
  // 响应数据处理
  transformRequestData: ResponseHandler.transformResponse,
  
  // 错误处理
  responseInterceptorsCatch: ErrorHandler.handleResponseError
}
```

## 错误处理

### 自动错误处理

系统会自动处理以下错误：

- **网络错误**: 显示网络异常提示
- **超时错误**: 显示请求超时提示  
- **401 未授权**: 自动清除 token 并跳转登录页
- **其他 HTTP 错误**: 根据状态码显示相应错误信息

### 自定义错误处理

```typescript
try {
  const result = await http.request({
    url: '/api/v1/risky-operation',
    method: 'post',
    data: operationData
  }, {
    // 禁用自动错误提示
    isShowErrorMessage: false
  })
} catch (error) {
  // 自定义错误处理逻辑
  console.error('操作失败:', error)
  // 显示自定义错误信息
}
```

## 请求取消

系统自动管理重复请求的取消，相同的请求会自动取消前一个：

```typescript
// 如果需要禁用自动取消
const result = await http.request({
  url: '/api/v1/data',
  method: 'get',
  headers: {
    ignoreCancelToken: true  // 忽略请求取消
  }
})
```

## 环境配置

在环境变量中配置相关参数：

```bash
# .env 文件
VITE_APP_URL=http://localhost:3000          # API 基础地址
REACT_APP_API_PREFIX=/api                   # API 前缀
REACT_APP_BASE_URL=http://localhost:3000    # 完整 API 地址
VITE_API_TARGET=http://localhost:8080       # 代理目标地址
```

## 最佳实践

### 1. API 模块化

将相关的 API 请求组织在一起：

```typescript
// src/apis/user/index.ts
export const userApi = {
  // 获取用户信息
  getUserInfo: () => http.request<UserInfo>({
    url: '/api/v1/user/info',
    method: 'get'
  }),
  
  // 更新用户信息
  updateUser: (data: Partial<UserInfo>) => http.request({
    url: '/api/v1/user/update',
    method: 'post',
    data
  }, {
    isShowSuccessMessage: true,
    successMessageText: '更新成功！'
  })
}
```

### 2. 错误边界处理

在组件中合理处理错误：

```typescript
const UserComponent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const loadUserData = async () => {
    try {
      setLoading(true)
      setError(null)
      const userData = await userApi.getUserInfo()
      // 处理成功数据
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
}
```

### 3. 类型定义

为 API 响应定义清晰的类型：

```typescript
// src/apis/user/typing.d.ts
declare namespace User {
  interface UserEntity {
    id: number
    name: string
    email: string
    avatar?: string
    roles: string[]
  }
  
  interface UserListParams extends PageParams {
    keyword?: string
    status?: number
  }
}
```

## 注意事项

1. **保持原有功能**: 优化后的封装完全兼容原有的 API 调用方式
2. **类型安全**: 充分利用 TypeScript 的类型检查功能
3. **错误处理**: 合理使用自动错误处理和自定义错误处理
4. **性能优化**: 系统自动处理请求取消，避免重复请求
5. **可维护性**: 模块化设计便于后续维护和扩展
