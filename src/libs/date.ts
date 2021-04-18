import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const getFormattedDate = (date: string | Date | null, conversion: string) => {
  // 下書き中は任意の文字列を返す
  if (!date) return 'Draft'

  const jstDate = utcToZonedTime(new Date(date), 'Asia/Tokyo')

  return format(jstDate, conversion)
}
