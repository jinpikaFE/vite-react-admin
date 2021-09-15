export default [
  {
    url: '/api/datauser',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          name: 'vben',
        },
      };
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vbensss',
      },
    },
  },
];
