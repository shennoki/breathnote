import Image from 'next/image'
import React from 'react'

type Props = {
  src: string
  width: string
  height: string
  alt: string
}

const CustomImage: React.FC<Props> = ({ src, width, height, alt }) => {
  return <Image src={src} width={width} height={height} alt={alt} />
}

export default CustomImage
