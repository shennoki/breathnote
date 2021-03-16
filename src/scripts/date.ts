import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const getCorrectDate = (date: string | Date, conversion?: string): string => {
  if (!date) return '日付データ無し'
  if (typeof date === 'string') date = new Date(date)

  const jstDate = utcToZonedTime(date, 'Asia/Tokyo')

  if (!conversion) return jstDate.toString()

  return format(jstDate, conversion)
}
