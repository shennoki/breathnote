import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const getFormattedDate = (date: string | Date | null, conversion: string) => {
  // 下書き中は本日の日付を返す
  if (!date) return format(new Date(), 'yyyy / MM / dd')

  const jstDate = utcToZonedTime(new Date(date), 'Asia/Tokyo')

  return format(jstDate, conversion)
}
