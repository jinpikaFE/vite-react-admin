import { MockMethod } from 'vite-plugin-mock';
import login from './login'
import menu from './menu'
export default [
  ...login,
  ...menu
] as MockMethod[];
