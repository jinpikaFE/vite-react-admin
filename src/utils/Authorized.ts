import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';

// 传入权限数组进行render
let Authorized = RenderAuthorize(getAuthority());

// 渲染重载，set新的权限时进行reload
const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getAuthority());
};

/** Hard code block need it。 */
window.reloadAuthorized = reloadAuthorized;

export { reloadAuthorized };
export default Authorized;
