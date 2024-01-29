import dayjs from 'dayjs'
import { DATE_TIME_FORMAT } from './dateUtil'

function typeOf(obj: Record<string, any>) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object FormData]': 'formdata'
  } as Record<string, any>
  return map[toString.call(obj)]
}

// 生成uuid
function uuid(len: number, radix?: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const uuid = []
  let i
  // eslint-disable-next-line no-param-reassign
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)]
    }
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * 数组删除
 * @param {Array} arr 数组
 * @param {*=} func 删除条件
 */
const arrRemove = (arr: any[], func: any): any[] => {
  if (Array.isArray(arr)) {
    return arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1)
      return acc.concat(val)
    }, [])
  }
  return []
}

/**
 * 数组去重
 * @param {Array} arr 数组
 */
const uniqueElements = (arr: any[]) => [...new Set(arr)]

/**
 * 数组条件去重
 * @param {Array} arr 数组
 * @param {*=} fn 删除条件
 */
const uniqueElementsBy = (arr: any[], fn: any): any[] => {
  return arr.reduce((acc, v) => {
    if (!acc.some((x: any) => fn(v, x))) {
      acc.push(v)
    }
    return acc
  }, [])
}

/**
 * 深拷贝
 * @param {Array} obj 被拷贝对象
 */
const deepClone = (obj: any) => {
  if (obj === null) {
    return null
  }
  const clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    key => (clone[key] = typeOf(obj[key]) === 'object' ? deepClone(obj[key]) : obj[key])
  )
  if (Array.isArray(obj)) {
    clone.length = obj.length
    return Array.from(clone)
  }
  return clone
}

/**
 * 数组扁平
 * @param {Array} arr 对象数组
 */
const flatten = (arr: any[], depth = 1): any[] => {
  return arr.reduce(
    (a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  )
}

/**
 * 对象过滤
 * @param {Array} obj 对象
 * @param {Function} fn 过滤条件
 */
const omitBy = (obj: any, fn: any) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc: any, key) => ((acc[key] = obj[key]), acc), {})

// 删除空数据
function deleteObjEmptyData(obj: Record<string, any>, isStr = true) {
  const newObj = deepClone(obj)
  for (const item in obj) {
    const t = typeOf(newObj[item])
    if (t === 'array') {
      if (!newObj[item].length) {
        delete newObj[item]
      } else {
        newObj[item] = isStr ? newObj[item].join(' ') : newObj[item]
      }
    } else {
      if (newObj[item] === '' || newObj[item] === null || newObj[item] === undefined) {
        delete newObj[item]
      }
    }
  }
  return newObj
}

const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/** 导出execl */
const exportExecl = (data: any) => {
  const blob = new Blob([data], {
    type: 'application/vnd.ms-excel'
  }) // for .xlsx files

  // 通过URL.createObjectURL生成文件路径
  const url = window.URL.createObjectURL(blob)

  // 创建a标签
  const ele = document.createElement('a')
  ele.style.display = 'none'

  // 设置href属性为文件路径，download属性可以设置文件名称
  ele.href = url
  ele.download = dayjs().format(DATE_TIME_FORMAT) + '列表数据.xlsx'
  // const fileName = decodeURI(
  //   data.headers['content-disposition'].split(';')[1].split('filename=')[1],
  // );
  // ele.setAttribute('download', fileName);
  // 将a标签添加到页面并模拟点击
  document.querySelectorAll('body')[0].appendChild(ele)
  ele.click()

  // 移除a标签
  ele.remove()
}

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
  type
}: {
  data: any[]
  key: string
  parentKey: string
  cb: (param: any) => any
  children?: string
  type?: string
}) => {
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
    delete item.children
  })

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map: any = {}
  data.forEach(function (item) {
    map[item?.[key]] = item
  })
  //        console.log(map);
  const val: any[] = []
  data.forEach(function (item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    const parent = map?.[item?.[parentKey]]
    const newItem = cb(item)
    const getNewVal = () => {
      // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        ;(parent?.[children] || (parent[children] = [])).push(newItem)
      } else {
        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(newItem)
      }
    }
    if (type) {
      if (item?.type === type) {
        getNewVal()
      }
    } else {
      getNewVal()
    }
  })
  return val
}

export {
  uuid,
  arrRemove,
  uniqueElementsBy,
  uniqueElements,
  deepClone,
  flatten,
  omitBy,
  deleteObjEmptyData,
  getBase64,
  exportExecl,
  toTree
}
