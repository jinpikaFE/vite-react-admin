import { ResultType } from '@/types/global';

export default [
  {
    url: '/api/roles',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: ResultType<any> = {
        code: 0,
        message: '查询成功',
        data: [
          {
            _id: '61839a6862f95fc94d2d592b',
            name: 'test',
            authority: [
              '61639c15ec93bb0b6a96f50f',
              '61639a71ec93bb0b6a96f504',
              '61639dadec93bb0b6a96f530',
              '61639e34ec93bb0b6a96f547',
            ],
            registerTime: { $date: '2021-11-04T08:31:36.075Z' },
          },
        ],
      };
      return resObj;
    },
  },
  {
    url: '/api/roles/all',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: ResultType<any> = {
        code: 0,
        message: '查询成功',
        data: [
          {
            _id: '61839a6862f95fc94d2d592b',
            name: 'test',
            authority: [
              '61639c15ec93bb0b6a96f50f',
              '61639a71ec93bb0b6a96f504',
              '61639dadec93bb0b6a96f530',
              '61639e34ec93bb0b6a96f547',
            ],
            registerTime: { $date: '2021-11-04T08:31:36.075Z' },
          },
        ],
      };
      return resObj;
    },
  },
  {
    url: '/api/roles/61839a6862f95fc94d2d592b',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: ResultType<any> = {
        code: 0,
        message: '查询成功',
        data: {
          _id: '61839a6862f95fc94d2d592b',
          name: 'test',
          authority: [
            '61639c15ec93bb0b6a96f50f',
            '61639a71ec93bb0b6a96f504',
            '61639dadec93bb0b6a96f530',
            '61639e34ec93bb0b6a96f547',
          ],
          registerTime: { $date: '2021-11-04T08:31:36.075Z' },
        },
      };
      return resObj;
    },
  },
];
