import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import { viteMockServe } from 'vite-plugin-mock'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      viteMockServe({
        mockPath: './config/mock',
        enable: mode === 'mock',
        watchFiles: true,
        logger: true
      })
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.sass', '.scss'], // 忽略输入的扩展名
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '~', replacement: path.resolve(__dirname, './node_modules') },
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components')
        },
        { find: '@config', replacement: path.resolve(__dirname, 'config') }
        // {
        //   find: '@antd/dist/reset.css',
        //   replacement: path.join(__dirname, 'node_modules/antd/dist/reset.css')
        // }
        // // { find: 'antd', replacement: path.join(__dirname, 'node_modules/antd/dist/antd.js') },
        // // {
        // //   find: '@ant-design/icons',
        // //   replacement: path.join(__dirname, 'node_modules/@ant-design/icons/dist/index.umd.js')
        // // }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true
        }
      }
    },
    server: {
      proxy: env.VITE_API_TARGET
        ? {
            '/api/': {
              target: env.VITE_API_TARGET,
              changeOrigin: true,
              rewrite: (p: string) => p.replace(/^\//, '')
            }
          }
        : undefined
    },
    build: {
      // 打包出map文件
      sourcemap: true
    }
  }
})
