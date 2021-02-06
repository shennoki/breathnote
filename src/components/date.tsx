import React, { FC } from 'react'

type Props = {
  publishedAt: string
}

const Date: FC<Props> = ({ publishedAt }) => {
  return (
    <small>
      <time dateTime={publishedAt}>{publishedAt}</time>
    </small>
  )
}

export default Date
