import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const getCorrectDate = (utcDate: string, string?: string): string => {
  /* プレビュー時など日付が設定されていない場合の処理 */
  if (!utcDate) {
    return '日付を取得できません'
  }

  const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo')

  if (!string) return jstDate.toString()

  return format(jstDate, string)
}
