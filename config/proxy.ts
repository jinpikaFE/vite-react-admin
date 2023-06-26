/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  development: {
    '/api/': {
      target: 'http://127.0.0.1:3060',
      changeOrigin: true,
      rewrite: (path: string) => path.replace('^/', '')
    }
  },
  test: {
    '/api/': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: (path: string) => path.replace('^/', '')
    }
  },
  pre: {
    '/api/': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: (path: string) => path.replace('^/', '')
    }
  },
  pro: {
    '/api/': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: (path: string) => path.replace('^/', '')
    }
  }
} as any
