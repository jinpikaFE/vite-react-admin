import { MockMethod } from 'vite-plugin-mock';
import login from './login';
import menu from './menu';
import compon from './compon';

export default [...login, ...menu, ...compon] as MockMethod[];
