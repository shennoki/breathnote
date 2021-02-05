import React, { FC } from 'react'

type Props = {
  publishedAt: string
}

const Date: FC<Props> = ({ publishedAt }) => {
  return <time dateTime={publishedAt}>{publishedAt}</time>
}

export default Date
