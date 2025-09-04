/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_MODE: string
  // 更多环境变量...
}

interface Window {
  reloadAuthorized: () => void;
}