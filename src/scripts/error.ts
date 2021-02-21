export const fetchFailed = (err: string): void => {
  throw new Error(`FETCH FAILED : ${err}`)
}

export const notFound = (err: string): void => {
  console.log(`${err} NOT FOUND`)
}
