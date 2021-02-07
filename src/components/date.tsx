import React, { FC } from 'react'

type Props = {
  publishedAt: string
}

const Date: FC<Props> = (props) => {
  return (
    <small>
      <time dateTime={props.publishedAt}>{props.publishedAt}</time>
    </small>
  )
}

export default Date
