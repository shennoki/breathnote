/* ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

  SCRIPTS -> ERROR HANDLING

  - 非同期処理等のエラーハンドリングを担当

＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/ */

export const fetchFailed = (err: string): void => {
  throw new Error(`FETCH FAILED : ${err}`)
}

export const notFound = (err: string): void => {
  console.log(`${err} NOT FOUND`)
}
