import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/admin/login',
    method: 'post',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: {
          tokenHead: 'Bearer ',
          token:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaW54aW4iLCJjcmVhdGVkIjoxNjc4OTMyNTM2NDk5LCJleHAiOjE2Nzk1MzczMzZ9.FVUJDgglmqTiUuSwtDAFLFziWxrERn9gN-uFThYc3qKYjsOFMsCX6qCB-dBvVW1Bjo2Jtt77sm33AhIRVgEeyQ'
        }
      }
      return resObj
    }
  },
  {
    url: '/api/v1/admin/info',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: {
          roles: ['超级管理员'],
          icon: 'http://dummyimage.com/100x100',
          menus: [
            {
              id: 30,
              parentId: '29',
              createTime: '2022-12-20T02:03:06.000+00:00',
              title: '关于页面',
              level: 1,
              sort: 3,
              name: 'AboutPage',
              icon: 'ant-design:aim-outlined',
              isShow: 1,
              type: 0
            },
            {
              id: 32,
              parentId: '31',
              createTime: '2022-12-20T02:06:36.000+00:00',
              title: '分析页',
              level: 1,
              sort: 5,
              name: 'Analysis',
              icon: 'ant-design:bar-chart-outlined',
              isShow: 1,
              type: 0
            },
            {
              id: 33,
              parentId: '31',
              createTime: '2022-12-20T02:07:05.000+00:00',
              title: '工作台',
              level: 1,
              sort: 6,
              name: 'Workbench',
              icon: 'ant-design:calendar-outlined',
              isShow: 1,
              type: 0
            },
            {
              id: 35,
              parentId: '34',
              createTime: '2022-12-20T02:10:15.000+00:00',
              title: '用户管理',
              level: 1,
              sort: 10,
              name: 'User',
              icon: 'ant-design:team-outlined',
              isShow: 1,
              type: 0
            },
            {
              id: 36,
              parentId: '34',
              createTime: '2022-12-20T02:11:13.000+00:00',
              title: '角色管理',
              level: 1,
              sort: 10,
              name: 'Role',
              icon: 'ant-design:apartment-outlined',
              isShow: 1,
              type: 0
            },
            {
              id: 37,
              parentId: '34',
              createTime: '2022-12-20T02:11:55.000+00:00',
              title: '菜单管理',
              level: 1,
              sort: 1,
              name: 'Menu',
              icon: 'ant-design:bars-outlined',
              isShow: 1,
              type: 0
            },
            {
              id: 39,
              parentId: '38',
              createTime: '2022-12-20T02:16:28.000+00:00',
              title: '资源列表',
              level: 2,
              sort: 1,
              name: 'ResourceList',
              icon: 'ant-design:aim-outlined',
              isShow: 0,
              type: 0
            }
          ],
          username: 'jpk'
        }
      }
      return resObj
    }
  }
] as MockMethod[]
