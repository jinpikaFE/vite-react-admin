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
      if (item?.path && item?.path === pathname) return (authority = item);
      item?.routes && reduceAuth(item?.routes);
    }
  };

  reduceAuth(router);

  if (authority) return authority;
  return undefined;
};

/**
 *
 * 实现树级递归，生成树形菜单
 * toTree(
    {msg.data,
    '_id',
    'lastMenu',
    (item) => item,}
  )
 * @param {any[]} data 要转换的数组
 * @param {string} key 标识字段
 * @param {string} parentKey 父级字段
 * @param {Function} cb 对item处理的回调函数 (item) => item
 * @param {string} children 子数组字段
 * @param {string} type 基本用于菜单的筛选，菜单与组件用同一个接口，可以前端筛选出菜单也可以后端做,
 * 非菜单节点的子节点请不要设置菜单节点，一般也没有改业务
 * @returns
 */
export const toTree = ({
  data,
  key,
  parentKey,
  cb,
  children = 'children',
  type,
}: {
  data: any[];
  key: string;
  parentKey: string;
  cb: (param: any) => any;
  children?: string;
  type?: string;
}) => {
  // 删除 所有 children,以防止多次调用
  data?.forEach(function (item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map: any = {};
  data?.forEach(function (item) {
    map[item?.[key]] = item;
  });
  //        console.log(map);
  const val: any[] = [];
  data?.forEach(function (item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    const parent = map?.[item?.[parentKey]];
    const newItem = cb(item);
    const getNewVal = () => {
      // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        (parent?.[children] || (parent[children] = [])).push(newItem);
      } else {
        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(newItem);
      }
    };
    if (type) {
      if (item?.type === type) {
        getNewVal();
      }
    } else {
      getNewVal();
    }
  });
  return val;
};

/**
 * 上传附件转base64
 * @param {File} file 文件流
 */
export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
