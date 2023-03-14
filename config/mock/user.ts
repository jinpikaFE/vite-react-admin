import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/users',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '查询成功',
        data: [
          {
            _id: '61839f6aa0b7f2fce7d3b359',
            userName: 'user',
            email: '4141@qq.com',
            phone: '15712421423',
            role: 'test',
            avatar: [
              {
                uid: 'avatar_1636015978030',
                name: 'avatar_1636015978030.png',
                status: 'done',
                url: 'http://127.0.0.1:3003/asset/avatar_1636015978030.png'
              }
            ],
            password: 'RBjsYi5YeIHo6txm2CL1pg==',
            salt: 'IjTw',
            registerTime: { $date: '2021-11-04T08:52:58.035Z' }
          }
        ]
      }
      return resObj
    },
    statusCode: 400
  }
] as MockMethod[]
