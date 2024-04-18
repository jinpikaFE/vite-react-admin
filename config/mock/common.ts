import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/routes',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: [
          {
            id: '1',
            path: '/'
          }
        ]
      }
      return resObj
    }
  }
] as MockMethod[]
