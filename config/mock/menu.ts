import { ResultType } from '@/types/global';

export default [
  {
    url: '/api/menu',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: ResultType<any> = {
        code: 0,
        message: '菜单获取成功',
        data: {
          menuData: [
            {
              path: '/home',
              name: 'welcome',
              component: './Welcome',
              icon: 'icon-home',
              breadcrumbName: 'admin',
              authority: 'admin',
            },
            {
              path: '/authManage',
              name: 'authManage',
              icon: 'icon-manage',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/authManage/componManage',
                  name: 'componManage',
                  icon: 'icon-manage',
                  authority: ['admin', 'user'],
                },
                {
                  path: '/authManage/roleManage',
                  name: 'roleManage',
                  icon: 'icon-manage',
                  authority: ['admin', 'user'],
                },
                {
                  path: '/authManage/userManage',
                  name: 'userManage',
                  icon: 'icon-manage',
                  authority: ['admin', 'user'],
                },
              ],
            },
            {
              path: '/admin',
              name: 'admin',
              access: 'canAdmin',
              component: './Admin',
              icon: 'icon-manage',
              authority: 'admin',
              routes: [
                {
                  path: '/admin/auth1',
                  name: 'sub-page',
                  component: './Welcome',
                  icon: 'icon-manage-order',
                  authority: 'admin1',
                },
                {
                  path: '/admin/auth3',
                  name: '二级页面',
                  component: './Welcome',
                  authority: 'admin',
                  routes: [
                    {
                      path: '/admin/auth3/test',
                      name: '二一级页面',
                      component: './Welcome',
                      authority: 'admin1',
                    },
                    {
                      path: '/admin/auth3/test2',
                      name: '二二级页面',
                      component: './Welcome',
                    },
                    {
                      path: '/admin/auth3/test3',
                      name: '二三级页面',
                      component: './Welcome',
                    },
                  ],
                },
                {
                  path: '/admin/sub-page3',
                  name: '三级页面',
                  component: './Welcome',
                  authority: 'admin',
                },
              ],
            },
            {
              name: '列表页',
              path: '/list',
              component: './ListTableList',
              icon: 'icon-list',
              routes: [
                {
                  path: '/list/sub-page',
                  name: '一级列表页面',
                },
                {
                  path: '/list/sub-page2',
                  name: '二级列表页面',
                  component: './Welcome',
                  authority: 'admin',
                },
                {
                  path: '/list/sub-page3',
                  name: '三级列表页面',
                  component: './Welcome',
                  authority: 'admin',
                },
              ],
            },
            {
              path: 'https://ant.design',
              name: 'Ant Design 官网外链',
              icon: 'icon-detail',
            },
          ],
        },
      };

      return resObj;
    },
  },
];
