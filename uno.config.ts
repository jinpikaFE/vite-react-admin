import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), // 默认预设
    presetAttributify(), // 属性化模式
    presetIcons({
      scale: 1.2,
      warn: true,
    }), // 图标预设
  ],
  shortcuts: {
    // 自定义快捷方式
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-primary': 'btn text-white bg-blue-500 hover:bg-blue-700',
    'btn-secondary': 'btn text-gray-700 bg-gray-200 hover:bg-gray-300',
    'card': 'p-6 rounded-lg shadow-lg bg-white',
    'flex-center': 'flex items-center justify-center',
    'text-gradient': 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
  },
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      },
    },
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  rules: [
    // 自定义规则
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d}px` })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${d}px` })],
  ],
})
