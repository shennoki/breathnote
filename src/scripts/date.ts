import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const getCorrectDate = (utcDate: string, string?: string): string => {
  const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo')

  if (!string) return jstDate.toString()

  return format(jstDate, string)
}
