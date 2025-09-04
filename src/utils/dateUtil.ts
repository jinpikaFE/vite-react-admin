/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(
  date?: Date,
  format = DATE_TIME_FORMAT,
  getNow = false
): string | undefined {
  if (getNow) {
    return dayjs(date).format(format)
  }
  return date ? dayjs(date).format(format) : undefined
}

export function formatToDate(
  date?: Date,
  format = DATE_FORMAT,
  getNow = false
): string | undefined {
  if (getNow) {
    return dayjs(date).format(format)
  }
  return date ? dayjs(date).format(format) : undefined
}

export const dateUtil = dayjs

export function toHHmmss(date: number) {
  const hours = parseInt((date / (1000 * 60 * 60)).toFixed(4))
  const minutes = parseInt(((date % (1000 * 60 * 60)) / (1000 * 60)).toFixed(4))
  const seconds = parseInt(((date % (1000 * 60)) / 1000).toFixed(4))
  const time =
    (hours < 10 ? '0' + hours : hours) +
    ':' +
    (minutes < 10 ? '0' + minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds)
  return time
}
