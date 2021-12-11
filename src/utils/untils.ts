import type { RouteConfig } from 'react-router-config';

/**
 * 当前pathname是否在路由中有，有则返回当前对象，没有就是undefined
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends RouteConfig>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  console.log(pathname);

  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && path === pathname) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
