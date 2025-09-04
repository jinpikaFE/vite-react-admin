import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { inspectorServer } from 'react-dev-inspector/plugins/vite';
import { viteMockServe } from 'vite-plugin-mock';
import proxy from './config/proxy';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      reactRefresh(),
      inspectorServer(),
      viteMockServe({
        // default
        localEnabled: process.env.VITE_MODE === 'mock',
        mockPath: './config/mock',
      }),
    ],
    resolve: {
      extensions: [
        '.mjs',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json',
        '.sass',
        '.scss',
      ], // 忽略输入的扩展名
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
        { find: '@config', replacement: path.resolve(__dirname, 'config') },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      proxy: proxy[process.env.VITE_MODE],
    },
  });
};
