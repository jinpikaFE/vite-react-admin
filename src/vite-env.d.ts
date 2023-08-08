/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MODE: string
  readonly VITE_MONITOR_URL: string
  readonly VITE_JINPIKAAI_URL: string
  readonly VITE_APP_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  COS: any
}
