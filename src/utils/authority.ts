import { reloadAuthorized } from './Authorized';

/**
 * 得到权限数组
 * @param str 权限名或者数组字符串。admin, "admin", ["admin"]
 * @returns 返回数组["admin"]
 */
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('authority') : str;
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  // 如过是字符串返回数组
  if (typeof authority === 'string') {
    return [authority];
  }
  // 如果不存在则返回 ['admin']
  if (!authority) {
    return ['admin'];
  }
  return authority;
}

/**
 * 设置权限
 * @param authority 
 */
export function setAuthority(authority: string | string[]): void {
  // 本地储存权限
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('authority', JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}
