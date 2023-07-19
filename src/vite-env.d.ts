/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MODE: string
  readonly VITE_MONITOR_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  COS: any
}
