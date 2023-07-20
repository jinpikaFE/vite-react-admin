declare namespace Monitor {
  type MonitorParams = {
    type: string
    apikey: string
  }

  /**
   * 事件类型
   */
  enum EVENTTYPES {
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
}
