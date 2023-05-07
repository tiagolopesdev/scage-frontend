import { ImgHTMLAttributes } from "react"

interface IActionIconProps extends ImgHTMLAttributes<HTMLImageElement> { }

export const Icon = (props: IActionIconProps) => {

  return (
    <img
      style={{
        width: '20px'
      }}
      {...props}
    />
  )
}
