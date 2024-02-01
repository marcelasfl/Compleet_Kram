import Image, { ImageProps } from 'next/image'

type LogoProps = {
  size?: number
  mini?: boolean
} & Omit<ImageProps, 'alt' | 'src'>

export function Logo({ mini, size, width, height, ...props }: LogoProps) {
  return (
    <Image
      src={'/'.concat(mini ? 'mini-logo' : 'logo', '.png')}
      alt="logo"
      {...props}
      width={width || size}
      height={height || size}
    />
  )
}
