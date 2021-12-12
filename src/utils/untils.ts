import type { RouteConfig } from 'react-router-config';

/**
 * 当前pathname是否在路由中有，有则返回当前对象，没有就是undefined
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T>(
  router: T[] = [],
  pathname: string,
): RouteConfig | undefined => {
  let authority = null;
  const reduceAuth = (routers: RouteConfig[]) => {
    for (let index = 0; index < routers.length; index++) {
      const item: RouteConfig = routers[index];
      console.log(item);

      if (item?.path && item?.path === pathname) return (authority = item);
      item?.routes && reduceAuth(item?.routes);
    }
  };

  reduceAuth(router);

  if (authority) return authority;
  return undefined;
};
