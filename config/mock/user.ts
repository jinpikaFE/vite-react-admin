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
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2ODkyMjY5MzczNDYsImV4cCI6MTY4OTgzMTczN30.b5D3MhMRhKZDC9iXYxrW29IXdDUch6hSx9G2h9c5iJsayvAE1bm0DJZe4dp32y95yOy98UJrYesN52-cFgpI9Q'
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
          roles: [
            {
              createTime: '2020-02-02T07:11:05.000+00:00',
              updateTime: '2023-07-10T08:24:55.000+00:00',
              id: 5,
              name: '超级管理员',
              description: '拥有所有查看和操作功能',
              adminCount: 0,
              status: 1,
              sort: 5
            },
            {
              createTime: '2023-07-04T02:11:05.000+00:00',
              updateTime: '2023-07-13T02:41:10.000+00:00',
              id: 14,
              name: 'test',
              description: '1',
              adminCount: 0,
              status: 1,
              sort: 0
            }
          ],
          icon: 'http://jinpika-1308276765.cos.ap-shanghai.myqcloud.com/bootdemo-file/20221220/src=http___desk-fd.zol-img.com.cn_t_s960x600c5_g2_M00_00_0B_ChMlWl6yKqyILFoCACn-5rom2uIAAO4DgEODxAAKf7-298.jpg&refer=http___desk-fd.zol-img.com.png',
          menus: [
            {
              id: 29,
              parentId: null,
              createTime: '2022-12-20T01:57:55.000+00:00',
              title: '首页',
              level: 0,
              sort: 3,
              name: 'About',
              icon: 'ant-design:api-outlined',
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
              title: '组件管理',
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
              level: 0,
              sort: 1,
              name: 'ResourceList',
              icon: 'ant-design:aim-outlined',
              isShow: 0,
              type: 1
            },
            {
              id: 40,
              parentId: '38',
              createTime: '2022-12-20T03:22:03.000+00:00',
              title: '资源分类',
              level: 0,
              sort: 2,
              name: 'ResourceCategory',
              icon: 'ant-design:appstore-outlined',
              isShow: 1,
              type: 1
            },
            {
              id: 42,
              parentId: '41',
              createTime: '2023-07-10T08:24:21.000+00:00',
              title: '一级-1-二级',
              level: 2,
              sort: 3,
              name: '一级-1-二级',
              icon: '2',
              isShow: 1,
              type: 0
            },
            {
              id: 43,
              parentId: '31',
              createTime: '2023-07-10T08:24:37.000+00:00',
              title: '一级-2',
              level: 1,
              sort: 444,
              name: '一级-2',
              icon: '23',
              isShow: 1,
              type: 0
            }
          ],
          username: 'admin'
        }
      }
      return resObj
    }
  },
  {
    url: '/api/v1/admin/list',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: {
          pageNum: 1,
          pageSize: 20,
          totalPage: 1,
          total: 4,
          list: [
            {
              createTime: '2022-12-14T08:03:04.000+00:00',
              updateTime: '2023-07-04T02:11:19.000+00:00',
              id: 16,
              username: 'jinxin',
              icon: 'http://jinpika-1308276765.cos.ap-shanghai.myqcloud.com/bootdemo-file/20230630/下载 (1).png',
              email: 'p.pgljyroc@qq.com',
              nickName: '程静',
              note: 'nisi reprehenderit dolor',
              loginTime: '2023-07-04T02:11:19.000+00:00',
              status: 1,
              roles: [
                {
                  createTime: '2020-02-02T07:11:05.000+00:00',
                  updateTime: null,
                  id: 5,
                  name: '超级管理员',
                  description: '拥有所有查看和操作功能',
                  adminCount: 0,
                  status: 1,
                  sort: 5
                },
                {
                  createTime: '2022-12-20T03:05:58.000+00:00',
                  updateTime: null,
                  id: 11,
                  name: '有权限管理无部分资源',
                  description: '有菜单权限，只有用户管理资源',
                  adminCount: 0,
                  status: 1,
                  sort: 1
                }
              ]
            },
            {
              createTime: '2022-12-20T02:24:45.000+00:00',
              updateTime: '2023-07-13T05:42:17.000+00:00',
              id: 35,
              username: 'admin',
              icon: 'http://jinpika-1308276765.cos.ap-shanghai.myqcloud.com/bootdemo-file/20221220/src=http___desk-fd.zol-img.com.cn_t_s960x600c5_g2_M00_00_0B_ChMlWl6yKqyILFoCACn-5rom2uIAAO4DgEODxAAKf7-298.jpg&refer=http___desk-fd.zol-img.com.png',
              email: 'admin@qq.com',
              nickName: '管理员',
              note: '超级管理员',
              loginTime: '2023-07-13T05:42:17.000+00:00',
              status: 1,
              roles: [
                {
                  createTime: '2020-02-02T07:11:05.000+00:00',
                  updateTime: null,
                  id: 5,
                  name: '超级管理员',
                  description: '拥有所有查看和操作功能',
                  adminCount: 0,
                  status: 1,
                  sort: 5
                },
                {
                  createTime: '2023-07-04T02:11:05.000+00:00',
                  updateTime: null,
                  id: 14,
                  name: 'test',
                  description: '1',
                  adminCount: 0,
                  status: 1,
                  sort: 0
                }
              ]
            },
            {
              createTime: '2022-12-20T03:06:59.000+00:00',
              updateTime: '2022-12-20T03:26:40.000+00:00',
              id: 36,
              username: 'qx',
              icon: 'http://jinpika-1308276765.cos.ap-shanghai.myqcloud.com/bootdemo-file/20221220/yellowbk.png',
              email: 'jinxin@qq.com',
              nickName: '无资源有菜单',
              note: null,
              loginTime: '2022-12-20T03:26:40.000+00:00',
              status: 1,
              roles: [
                {
                  createTime: '2022-12-20T03:05:58.000+00:00',
                  updateTime: null,
                  id: 11,
                  name: '有权限管理无部分资源',
                  description: '有菜单权限，只有用户管理资源',
                  adminCount: 0,
                  status: 1,
                  sort: 1
                }
              ]
            },
            {
              createTime: '2023-06-30T09:30:16.000+00:00',
              updateTime: '2023-07-13T03:38:05.000+00:00',
              id: 38,
              username: 'test',
              icon: 'http://jinpika-1308276765.cos.ap-shanghai.myqcloud.com/bootdemo-file/20230630/src=http___i-1.lanrentuku.com_2020_7_11_e23bfa96-6f7c-4c05-b4e7-0ee93d656d9f.jpg&refer=http___i-1.lanrentuku.png',
              email: '2@qq.com',
              nickName: '1',
              note: '222',
              loginTime: '2023-07-13T03:38:05.000+00:00',
              status: 1,
              roles: [
                {
                  createTime: '2023-07-04T02:11:05.000+00:00',
                  updateTime: null,
                  id: 14,
                  name: 'test',
                  description: '1',
                  adminCount: 0,
                  status: 1,
                  sort: 0
                }
              ]
            }
          ]
        }
      }
      return resObj
    }
  },
  {
    url: '/api/v1/role/list',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: {
          pageNum: 1,
          pageSize: 20,
          totalPage: 1,
          total: 3,
          list: [
            {
              createTime: '2020-02-02T07:11:05.000+00:00',
              updateTime: null,
              id: 5,
              name: '超级管理员',
              description: '拥有所有查看和操作功能',
              adminCount: 0,
              status: 1,
              sort: 5,
              menus: [
                {
                  id: 29,
                  parentId: null,
                  createTime: '2022-12-20T01:57:55.000+00:00',
                  title: '首页',
                  level: 0,
                  sort: 3,
                  name: 'About',
                  icon: 'ant-design:api-outlined',
                  isShow: 1,
                  type: 0
                },
                {
                  id: 43,
                  parentId: '31',
                  createTime: '2023-07-10T08:24:37.000+00:00',
                  title: '一级-2',
                  level: 1,
                  sort: 444,
                  name: '一级-2',
                  icon: '23',
                  isShow: 1,
                  type: 0
                },
                {
                  id: 42,
                  parentId: '41',
                  createTime: '2023-07-10T08:24:21.000+00:00',
                  title: '一级-1-二级',
                  level: 2,
                  sort: 3,
                  name: '一级-1-二级',
                  icon: '2',
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
                  title: '组件管理',
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
                  level: 0,
                  sort: 1,
                  name: 'ResourceList',
                  icon: 'ant-design:aim-outlined',
                  isShow: 0,
                  type: 1
                },
                {
                  id: 40,
                  parentId: '38',
                  createTime: '2022-12-20T03:22:03.000+00:00',
                  title: '资源分类',
                  level: 0,
                  sort: 2,
                  name: 'ResourceCategory',
                  icon: 'ant-design:appstore-outlined',
                  isShow: 1,
                  type: 1
                }
              ],
              resources: [
                {
                  id: 25,
                  createTime: '2020-02-07T08:47:34.000+00:00',
                  name: '后台用户管理',
                  url: '/api/v1/admin/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 26,
                  createTime: '2020-02-07T08:48:24.000+00:00',
                  name: '后台用户角色管理',
                  url: '/api/v1/role/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 27,
                  createTime: '2020-02-07T08:48:48.000+00:00',
                  name: '后台菜单管理',
                  url: '/api/v1/menu/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 28,
                  createTime: '2020-02-07T08:49:18.000+00:00',
                  name: '后台资源分类管理',
                  url: '/api/v1/resourceCategory/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 29,
                  createTime: '2020-02-07T08:49:45.000+00:00',
                  name: '后台资源管理',
                  url: '/api/v1/resource/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 13,
                  createTime: '2020-02-07T08:37:22.000+00:00',
                  name: '优惠券管理',
                  url: '/coupon/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 14,
                  createTime: '2020-02-07T08:37:59.000+00:00',
                  name: '优惠券领取记录管理',
                  url: '/couponHistory/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 15,
                  createTime: '2020-02-07T08:38:28.000+00:00',
                  name: '限时购活动管理',
                  url: '/flash/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 16,
                  createTime: '2020-02-07T08:38:59.000+00:00',
                  name: '限时购商品关系管理',
                  url: '/flashProductRelation/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 17,
                  createTime: '2020-02-07T08:39:22.000+00:00',
                  name: '限时购场次管理',
                  url: '/flashSession/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 18,
                  createTime: '2020-02-07T08:40:07.000+00:00',
                  name: '首页轮播广告管理',
                  url: '/home/advertise/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 19,
                  createTime: '2020-02-07T08:40:34.000+00:00',
                  name: '首页品牌管理',
                  url: '/home/brand/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 20,
                  createTime: '2020-02-07T08:41:06.000+00:00',
                  name: '首页新品管理',
                  url: '/home/newProduct/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 21,
                  createTime: '2020-02-07T08:42:16.000+00:00',
                  name: '首页人气推荐管理',
                  url: '/home/recommendProduct/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 22,
                  createTime: '2020-02-07T08:42:48.000+00:00',
                  name: '首页专题推荐管理',
                  url: '/home/recommendSubject/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 8,
                  createTime: '2020-02-05T06:43:37.000+00:00',
                  name: '订单管理',
                  url: '/order/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 9,
                  createTime: '2020-02-05T06:44:22.000+00:00',
                  name: ' 订单退货申请管理',
                  url: '/returnApply/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 10,
                  createTime: '2020-02-05T06:45:08.000+00:00',
                  name: '退货原因管理',
                  url: '/returnReason/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 11,
                  createTime: '2020-02-05T06:45:43.000+00:00',
                  name: '订单设置管理',
                  url: '/orderSetting/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 12,
                  createTime: '2020-02-05T06:46:23.000+00:00',
                  name: '收货地址管理',
                  url: '/companyAddress/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 1,
                  createTime: '2020-02-04T09:04:55.000+00:00',
                  name: '商品品牌管理',
                  url: '/brand/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 2,
                  createTime: '2020-02-04T09:05:35.000+00:00',
                  name: '商品属性分类管理',
                  url: '/productAttribute/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 3,
                  createTime: '2020-02-04T09:06:13.000+00:00',
                  name: '商品属性管理',
                  url: '/productAttribute/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 4,
                  createTime: '2020-02-04T09:07:15.000+00:00',
                  name: '商品分类管理',
                  url: '/productCategory/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 5,
                  createTime: '2020-02-04T09:09:16.000+00:00',
                  name: '商品管理',
                  url: '/product/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 6,
                  createTime: '2020-02-04T09:09:53.000+00:00',
                  name: '商品库存管理',
                  url: '/sku/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 23,
                  createTime: '2020-02-07T08:44:56.000+00:00',
                  name: ' 商品优选管理',
                  url: '/prefrenceArea/**',
                  description: '',
                  categoryId: 5
                },
                {
                  id: 24,
                  createTime: '2020-02-07T08:45:39.000+00:00',
                  name: '商品专题管理',
                  url: '/subject/**',
                  description: '',
                  categoryId: 5
                },
                {
                  id: 32,
                  createTime: '2022-12-20T03:09:26.000+00:00',
                  name: '菜单树',
                  url: '/api/v1/menu/treeList',
                  description: null,
                  categoryId: 4
                }
              ]
            },
            {
              createTime: '2022-12-20T03:05:58.000+00:00',
              updateTime: null,
              id: 11,
              name: '有权限管理无部分资源',
              description: '有菜单权限，只有用户管理资源',
              adminCount: 0,
              status: 1,
              sort: 1,
              menus: [
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
                  title: '组件管理',
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
                  level: 0,
                  sort: 1,
                  name: 'ResourceList',
                  icon: 'ant-design:aim-outlined',
                  isShow: 0,
                  type: 1
                },
                {
                  id: 40,
                  parentId: '38',
                  createTime: '2022-12-20T03:22:03.000+00:00',
                  title: '资源分类',
                  level: 0,
                  sort: 2,
                  name: 'ResourceCategory',
                  icon: 'ant-design:appstore-outlined',
                  isShow: 1,
                  type: 1
                }
              ],
              resources: [
                {
                  id: 25,
                  createTime: '2020-02-07T08:47:34.000+00:00',
                  name: '后台用户管理',
                  url: '/api/v1/admin/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 32,
                  createTime: '2022-12-20T03:09:26.000+00:00',
                  name: '菜单树',
                  url: '/api/v1/menu/treeList',
                  description: null,
                  categoryId: 4
                }
              ]
            },
            {
              createTime: '2023-07-04T02:11:05.000+00:00',
              updateTime: null,
              id: 14,
              name: 'test',
              description: '1',
              adminCount: 0,
              status: 1,
              sort: 0,
              menus: [
                {
                  id: 43,
                  parentId: '31',
                  createTime: '2023-07-10T08:24:37.000+00:00',
                  title: '一级-2',
                  level: 1,
                  sort: 444,
                  name: '一级-2',
                  icon: '23',
                  isShow: 1,
                  type: 0
                },
                {
                  id: 42,
                  parentId: '41',
                  createTime: '2023-07-10T08:24:21.000+00:00',
                  title: '一级-1-二级',
                  level: 2,
                  sort: 3,
                  name: '一级-1-二级',
                  icon: '2',
                  isShow: 1,
                  type: 0
                }
              ],
              resources: [
                {
                  id: 1,
                  createTime: '2020-02-04T09:04:55.000+00:00',
                  name: '商品品牌管理',
                  url: '/brand/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 2,
                  createTime: '2020-02-04T09:05:35.000+00:00',
                  name: '商品属性分类管理',
                  url: '/productAttribute/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 3,
                  createTime: '2020-02-04T09:06:13.000+00:00',
                  name: '商品属性管理',
                  url: '/productAttribute/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 4,
                  createTime: '2020-02-04T09:07:15.000+00:00',
                  name: '商品分类管理',
                  url: '/productCategory/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 5,
                  createTime: '2020-02-04T09:09:16.000+00:00',
                  name: '商品管理',
                  url: '/product/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 6,
                  createTime: '2020-02-04T09:09:53.000+00:00',
                  name: '商品库存管理',
                  url: '/sku/**',
                  description: null,
                  categoryId: 1
                },
                {
                  id: 8,
                  createTime: '2020-02-05T06:43:37.000+00:00',
                  name: '订单管理',
                  url: '/order/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 9,
                  createTime: '2020-02-05T06:44:22.000+00:00',
                  name: ' 订单退货申请管理',
                  url: '/returnApply/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 10,
                  createTime: '2020-02-05T06:45:08.000+00:00',
                  name: '退货原因管理',
                  url: '/returnReason/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 11,
                  createTime: '2020-02-05T06:45:43.000+00:00',
                  name: '订单设置管理',
                  url: '/orderSetting/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 12,
                  createTime: '2020-02-05T06:46:23.000+00:00',
                  name: '收货地址管理',
                  url: '/companyAddress/**',
                  description: '',
                  categoryId: 2
                },
                {
                  id: 13,
                  createTime: '2020-02-07T08:37:22.000+00:00',
                  name: '优惠券管理',
                  url: '/coupon/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 14,
                  createTime: '2020-02-07T08:37:59.000+00:00',
                  name: '优惠券领取记录管理',
                  url: '/couponHistory/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 15,
                  createTime: '2020-02-07T08:38:28.000+00:00',
                  name: '限时购活动管理',
                  url: '/flash/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 16,
                  createTime: '2020-02-07T08:38:59.000+00:00',
                  name: '限时购商品关系管理',
                  url: '/flashProductRelation/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 17,
                  createTime: '2020-02-07T08:39:22.000+00:00',
                  name: '限时购场次管理',
                  url: '/flashSession/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 18,
                  createTime: '2020-02-07T08:40:07.000+00:00',
                  name: '首页轮播广告管理',
                  url: '/home/advertise/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 19,
                  createTime: '2020-02-07T08:40:34.000+00:00',
                  name: '首页品牌管理',
                  url: '/home/brand/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 20,
                  createTime: '2020-02-07T08:41:06.000+00:00',
                  name: '首页新品管理',
                  url: '/home/newProduct/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 21,
                  createTime: '2020-02-07T08:42:16.000+00:00',
                  name: '首页人气推荐管理',
                  url: '/home/recommendProduct/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 22,
                  createTime: '2020-02-07T08:42:48.000+00:00',
                  name: '首页专题推荐管理',
                  url: '/home/recommendSubject/**',
                  description: '',
                  categoryId: 3
                },
                {
                  id: 25,
                  createTime: '2020-02-07T08:47:34.000+00:00',
                  name: '后台用户管理',
                  url: '/api/v1/admin/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 26,
                  createTime: '2020-02-07T08:48:24.000+00:00',
                  name: '后台用户角色管理',
                  url: '/api/v1/role/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 27,
                  createTime: '2020-02-07T08:48:48.000+00:00',
                  name: '后台菜单管理',
                  url: '/api/v1/menu/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 28,
                  createTime: '2020-02-07T08:49:18.000+00:00',
                  name: '后台资源分类管理',
                  url: '/api/v1/resourceCategory/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 29,
                  createTime: '2020-02-07T08:49:45.000+00:00',
                  name: '后台资源管理',
                  url: '/api/v1/resource/**',
                  description: '',
                  categoryId: 4
                },
                {
                  id: 32,
                  createTime: '2022-12-20T03:09:26.000+00:00',
                  name: '菜单树',
                  url: '/api/v1/menu/treeList',
                  description: null,
                  categoryId: 4
                },
                {
                  id: 23,
                  createTime: '2020-02-07T08:44:56.000+00:00',
                  name: ' 商品优选管理',
                  url: '/prefrenceArea/**',
                  description: '',
                  categoryId: 5
                },
                {
                  id: 24,
                  createTime: '2020-02-07T08:45:39.000+00:00',
                  name: '商品专题管理',
                  url: '/subject/**',
                  description: '',
                  categoryId: 5
                }
              ]
            }
          ]
        }
      }
      return resObj
    }
  },
  {
    url: '/api/v1/menu/treeList',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: [
          {
            id: 29,
            parentId: null,
            createTime: '2022-12-20T01:57:55.000+00:00',
            title: '首页',
            level: 0,
            sort: 3,
            name: 'About',
            icon: 'ant-design:api-outlined',
            isShow: 1,
            type: 0,
            children: null
          },
          {
            id: 31,
            parentId: null,
            createTime: '2022-12-20T02:05:31.000+00:00',
            title: '嵌套路由',
            level: 0,
            sort: 1,
            name: '嵌套路由',
            icon: 'ant-design:appstore-filled',
            isShow: 1,
            type: 0,
            children: [
              {
                id: 41,
                parentId: '31',
                createTime: '2023-07-10T08:24:03.000+00:00',
                title: '一级-1',
                level: 1,
                sort: 2,
                name: '一级-1',
                icon: '2',
                isShow: 1,
                type: 0,
                children: [
                  {
                    id: 42,
                    parentId: '41',
                    createTime: '2023-07-10T08:24:21.000+00:00',
                    title: '一级-1-二级',
                    level: 2,
                    sort: 3,
                    name: '一级-1-二级',
                    icon: '2',
                    isShow: 1,
                    type: 0,
                    children: null
                  }
                ]
              },
              {
                id: 43,
                parentId: '31',
                createTime: '2023-07-10T08:24:37.000+00:00',
                title: '一级-2',
                level: 1,
                sort: 444,
                name: '一级-2',
                icon: '23',
                isShow: 1,
                type: 0,
                children: null
              }
            ]
          },
          {
            id: 34,
            parentId: null,
            createTime: '2022-12-20T02:09:05.000+00:00',
            title: '权限管理',
            level: 0,
            sort: 2,
            name: 'Auth',
            icon: 'ant-design:setting-filled',
            isShow: 1,
            type: 0,
            children: [
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
                type: 0,
                children: null
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
                type: 0,
                children: null
              },
              {
                id: 37,
                parentId: '34',
                createTime: '2022-12-20T02:11:55.000+00:00',
                title: '组件管理',
                level: 1,
                sort: 1,
                name: 'Menu',
                icon: 'ant-design:bars-outlined',
                isShow: 1,
                type: 0,
                children: null
              },
              {
                id: 38,
                parentId: '34',
                createTime: '2022-12-20T02:13:27.000+00:00',
                title: '资源管理',
                level: 1,
                sort: 1,
                name: 'Resource',
                icon: 'ant-design:alert-filled',
                isShow: 1,
                type: 0,
                children: [
                  {
                    id: 39,
                    parentId: '38',
                    createTime: '2022-12-20T02:16:28.000+00:00',
                    title: '资源列表',
                    level: 0,
                    sort: 1,
                    name: 'ResourceList',
                    icon: 'ant-design:aim-outlined',
                    isShow: 0,
                    type: 1,
                    children: null
                  },
                  {
                    id: 40,
                    parentId: '38',
                    createTime: '2022-12-20T03:22:03.000+00:00',
                    title: '资源分类',
                    level: 0,
                    sort: 2,
                    name: 'ResourceCategory',
                    icon: 'ant-design:appstore-outlined',
                    isShow: 1,
                    type: 1,
                    children: null
                  }
                ]
              }
            ]
          }
        ]
      }
      return resObj
    }
  },
  {
    url: '/api/v1/resourceCategory/listAll',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: [
          {
            createTime: '2020-02-05T02:21:44.000+00:00',
            updateTime: '2022-12-20T03:08:49.000+00:00',
            id: 1,
            name: '商品模块',
            sort: 0,
            resources: [
              {
                id: 1,
                createTime: '2020-02-04T09:04:55.000+00:00',
                name: '商品品牌管理',
                url: '/brand/**',
                description: null,
                categoryId: 1
              },
              {
                id: 2,
                createTime: '2020-02-04T09:05:35.000+00:00',
                name: '商品属性分类管理',
                url: '/productAttribute/**',
                description: null,
                categoryId: 1
              },
              {
                id: 3,
                createTime: '2020-02-04T09:06:13.000+00:00',
                name: '商品属性管理',
                url: '/productAttribute/**',
                description: null,
                categoryId: 1
              },
              {
                id: 4,
                createTime: '2020-02-04T09:07:15.000+00:00',
                name: '商品分类管理',
                url: '/productCategory/**',
                description: null,
                categoryId: 1
              },
              {
                id: 5,
                createTime: '2020-02-04T09:09:16.000+00:00',
                name: '商品管理',
                url: '/product/**',
                description: null,
                categoryId: 1
              },
              {
                id: 6,
                createTime: '2020-02-04T09:09:53.000+00:00',
                name: '商品库存管理',
                url: '/sku/**',
                description: null,
                categoryId: 1
              }
            ]
          },
          {
            createTime: '2020-02-05T02:22:34.000+00:00',
            updateTime: '2022-12-20T03:08:45.000+00:00',
            id: 2,
            name: '订单模块',
            sort: 0,
            resources: [
              {
                id: 8,
                createTime: '2020-02-05T06:43:37.000+00:00',
                name: '订单管理',
                url: '/order/**',
                description: '',
                categoryId: 2
              },
              {
                id: 9,
                createTime: '2020-02-05T06:44:22.000+00:00',
                name: ' 订单退货申请管理',
                url: '/returnApply/**',
                description: '',
                categoryId: 2
              },
              {
                id: 10,
                createTime: '2020-02-05T06:45:08.000+00:00',
                name: '退货原因管理',
                url: '/returnReason/**',
                description: '',
                categoryId: 2
              },
              {
                id: 11,
                createTime: '2020-02-05T06:45:43.000+00:00',
                name: '订单设置管理',
                url: '/orderSetting/**',
                description: '',
                categoryId: 2
              },
              {
                id: 12,
                createTime: '2020-02-05T06:46:23.000+00:00',
                name: '收货地址管理',
                url: '/companyAddress/**',
                description: '',
                categoryId: 2
              }
            ]
          },
          {
            createTime: '2020-02-05T02:22:48.000+00:00',
            updateTime: '2022-12-20T03:08:42.000+00:00',
            id: 3,
            name: '营销模块',
            sort: 0,
            resources: [
              {
                id: 13,
                createTime: '2020-02-07T08:37:22.000+00:00',
                name: '优惠券管理',
                url: '/coupon/**',
                description: '',
                categoryId: 3
              },
              {
                id: 14,
                createTime: '2020-02-07T08:37:59.000+00:00',
                name: '优惠券领取记录管理',
                url: '/couponHistory/**',
                description: '',
                categoryId: 3
              },
              {
                id: 15,
                createTime: '2020-02-07T08:38:28.000+00:00',
                name: '限时购活动管理',
                url: '/flash/**',
                description: '',
                categoryId: 3
              },
              {
                id: 16,
                createTime: '2020-02-07T08:38:59.000+00:00',
                name: '限时购商品关系管理',
                url: '/flashProductRelation/**',
                description: '',
                categoryId: 3
              },
              {
                id: 17,
                createTime: '2020-02-07T08:39:22.000+00:00',
                name: '限时购场次管理',
                url: '/flashSession/**',
                description: '',
                categoryId: 3
              },
              {
                id: 18,
                createTime: '2020-02-07T08:40:07.000+00:00',
                name: '首页轮播广告管理',
                url: '/home/advertise/**',
                description: '',
                categoryId: 3
              },
              {
                id: 19,
                createTime: '2020-02-07T08:40:34.000+00:00',
                name: '首页品牌管理',
                url: '/home/brand/**',
                description: '',
                categoryId: 3
              },
              {
                id: 20,
                createTime: '2020-02-07T08:41:06.000+00:00',
                name: '首页新品管理',
                url: '/home/newProduct/**',
                description: '',
                categoryId: 3
              },
              {
                id: 21,
                createTime: '2020-02-07T08:42:16.000+00:00',
                name: '首页人气推荐管理',
                url: '/home/recommendProduct/**',
                description: '',
                categoryId: 3
              },
              {
                id: 22,
                createTime: '2020-02-07T08:42:48.000+00:00',
                name: '首页专题推荐管理',
                url: '/home/recommendSubject/**',
                description: '',
                categoryId: 3
              }
            ]
          },
          {
            createTime: '2020-02-05T02:23:04.000+00:00',
            updateTime: null,
            id: 4,
            name: '权限模块',
            sort: 0,
            resources: [
              {
                id: 25,
                createTime: '2020-02-07T08:47:34.000+00:00',
                name: '后台用户管理',
                url: '/api/v1/admin/**',
                description: '',
                categoryId: 4
              },
              {
                id: 26,
                createTime: '2020-02-07T08:48:24.000+00:00',
                name: '后台用户角色管理',
                url: '/api/v1/role/**',
                description: '',
                categoryId: 4
              },
              {
                id: 27,
                createTime: '2020-02-07T08:48:48.000+00:00',
                name: '后台菜单管理',
                url: '/api/v1/menu/**',
                description: '',
                categoryId: 4
              },
              {
                id: 28,
                createTime: '2020-02-07T08:49:18.000+00:00',
                name: '后台资源分类管理',
                url: '/api/v1/resourceCategory/**',
                description: '',
                categoryId: 4
              },
              {
                id: 29,
                createTime: '2020-02-07T08:49:45.000+00:00',
                name: '后台资源管理',
                url: '/api/v1/resource/**',
                description: '',
                categoryId: 4
              },
              {
                id: 32,
                createTime: '2022-12-20T03:09:26.000+00:00',
                name: '菜单树',
                url: '/api/v1/menu/treeList',
                description: null,
                categoryId: 4
              }
            ]
          },
          {
            createTime: '2020-02-07T08:34:27.000+00:00',
            updateTime: '2022-12-20T03:08:37.000+00:00',
            id: 5,
            name: '内容模块',
            sort: 0,
            resources: [
              {
                id: 23,
                createTime: '2020-02-07T08:44:56.000+00:00',
                name: ' 商品优选管理',
                url: '/prefrenceArea/**',
                description: '',
                categoryId: 5
              },
              {
                id: 24,
                createTime: '2020-02-07T08:45:39.000+00:00',
                name: '商品专题管理',
                url: '/subject/**',
                description: '',
                categoryId: 5
              }
            ]
          },
          {
            createTime: '2020-02-07T08:35:49.000+00:00',
            updateTime: '2022-12-20T03:08:33.000+00:00',
            id: 6,
            name: '其他模块',
            sort: 0,
            resources: []
          }
        ]
      }
      return resObj
    }
  },
  {
    url: '/api/v1/resource/list',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: {
          pageNum: 1,
          pageSize: 20,
          totalPage: 1,
          total: 6,
          list: [
            {
              id: 1,
              createTime: '2020-02-04T09:04:55.000+00:00',
              name: '商品品牌管理',
              url: '/brand/**',
              description: null,
              categoryId: 1
            },
            {
              id: 2,
              createTime: '2020-02-04T09:05:35.000+00:00',
              name: '商品属性分类管理',
              url: '/productAttribute/**',
              description: null,
              categoryId: 1
            },
            {
              id: 3,
              createTime: '2020-02-04T09:06:13.000+00:00',
              name: '商品属性管理',
              url: '/productAttribute/**',
              description: null,
              categoryId: 1
            },
            {
              id: 4,
              createTime: '2020-02-04T09:07:15.000+00:00',
              name: '商品分类管理',
              url: '/productCategory/**',
              description: null,
              categoryId: 1
            },
            {
              id: 5,
              createTime: '2020-02-04T09:09:16.000+00:00',
              name: '商品管理',
              url: '/product/**',
              description: null,
              categoryId: 1
            },
            {
              id: 6,
              createTime: '2020-02-04T09:09:53.000+00:00',
              name: '商品库存管理',
              url: '/sku/**',
              description: null,
              categoryId: 1
            }
          ]
        }
      }
      return resObj
    }
  }
] as MockMethod[]
