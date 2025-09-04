import webSee from '@websee/core'
import performance from '@websee/performance'
import recordscreen from '@websee/recordscreen'

export class WebSee {
  constructor(userId: string) {
    if (import.meta.env.VITE_MODE === 'production') {
      this.init(userId)
    }
  }

  init(userId: string) {
    webSee.init({
      dsn: `${import.meta.env.VITE_MONITOR_URL}/v1/mgb/monitor`,
      apikey: import.meta.env.VITE_APP_NAME,
      userId,
      handleHttpStatus(data) {
        const { response } = data
        const { code } = typeof response === 'string' ? JSON.parse(response) : response
        return code === 200
      }
    })

    webSee.use(performance, {})
    webSee.use(recordscreen, {})
  }

  public static Log(params: Record<string, any>) {
    if (import.meta.env.VITE_MODE === 'production') {
      webSee.log(params)
    }
  }
}
