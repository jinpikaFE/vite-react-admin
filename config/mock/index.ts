import { MockMethod } from 'vite-plugin-mock';
import login from './login'
export default [
  ...login
] as MockMethod[];
