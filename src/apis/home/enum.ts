/**
 * 事件类型
 */
export enum EVENTTYPES {
  XHR = 'xhr',
  FETCH = 'fetch',
  CLICK = 'click',
  HISTORY = 'history',
  ERROR = 'error',
  HASHCHANGE = 'hashchange',
  UNHANDLEDREJECTION = 'unhandledrejection',
  RESOURCE = 'resource',
  DOM = 'dom',
  VUE = 'vue',
  REACT = 'react',
  CUSTOM = 'custom',
  PERFORMANCE = 'performance',
  RECORDSCREEN = 'recordScreen',
  WHITESCREEN = 'whiteScreen'
}

/** 性能指标名 */
export enum PERFORMANCE_TYPE {
  /** 上报长任务详情 */
  LongTask = 'longTask',
  /** 上报资源列表 */
  ResourceList = 'resourceList',
  /** 上报内存情况, safari、firefox不支持该属性 */
  Memory = 'memory',
  /** 首屏加载时间 */
  FSP = 'FSP',
  FCP = 'FCP',
  LCP = 'LCP',
  FID = 'FID',
  CLS = 'CLS',
  TTFB = 'TTFB'
}
