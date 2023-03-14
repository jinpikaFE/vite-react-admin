/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import moment from 'moment'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(
  date: moment.MomentInput = undefined,
  format = DATE_TIME_FORMAT,
  getNow = false
): string | undefined {
  if (getNow) {
    return moment(date).format(format)
  }
  return date ? moment(date).format(format) : undefined
}

export function formatToDate(
  date: moment.MomentInput = undefined,
  format = DATE_FORMAT,
  getNow = false
): string | undefined {
  if (getNow) {
    return moment(date).format(format)
  }
  return date ? moment(date).format(format) : undefined
}

export const dateUtil = moment

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
