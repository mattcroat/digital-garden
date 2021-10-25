import { useState } from 'react'
import NextImage from 'next/image'

interface ImageProps {
  src: string
  alt: string
  width: string
  height: string
  blurDataURL: string
}

export default function Image({
  src,
  alt,
  width,
  height,
  blurDataURL,
}: ImageProps) {
  const [loaded, setLoaded] = useState<boolean>(false)
  const zoom = loaded ? 'zoom' : ''

  return (
    <div className="container">
      <div className={zoom}>
        <NextImage
          onLoadingComplete={() => setLoaded(true)}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          placeholder={blurDataURL ? 'blur' : undefined}
          blurDataURL={blurDataURL}
        />
      </div>

      <style jsx>
        {`
          .container {
            overflow: hidden;
          }

          .zoom {
            animation: zoom 0.3s linear;
          }

          @keyframes zoom {
            from {
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </div>
  )
}
