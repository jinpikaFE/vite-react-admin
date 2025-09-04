import http from '@/server'

const VITE_MONITOR_URL = import.meta.env.VITE_MONITOR_URL

export async function getMonitorList(params: Partial<Monitor.MonitorParams> & Global.PageParams) {
  return http.request({
    url: '/v1/monitor',
    method: 'get',
    params,
    baseURL: VITE_MONITOR_URL
  })
}
