import Image from 'next/image'
import React, { FC } from 'react'

type Props = {
  src: string
  width: string
  height: string
  alt: string
}

const CustomImage: FC<Props> = (props) => {
  return (
    <>
      <div className="image-wrapper">
        <Image src={props.src} width={props.width} height={props.height} alt={props.alt} />
      </div>
    </>
  )
}

export default CustomImage
