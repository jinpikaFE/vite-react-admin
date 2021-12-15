// 定义worker线程脚本代码
const workercode = () => {
  self.onmessage = function (e) {
    // 取回调函数解析
    e.data.cb = new Function('return' + e.data?.cb)();
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
    const toTree = ({
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
      data.forEach(function (item) {
        delete item.children;
      });

      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      const map: any = {};
      data.forEach(function (item) {
        map[item?.[key]] = item;
      });
      //        console.log(map);
      const val: any[] = [];
      data.forEach(function (item) {
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
    const workerResult = toTree(e.data);

    self.postMessage(workerResult); // here it's working without self
  };
};
// 把脚本代码转为string
let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
