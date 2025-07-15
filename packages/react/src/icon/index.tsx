import cx from 'classix'
import { ComponentPropsWithRef, forwardRef } from 'react'
import './index.less'

export type IconProps = ComponentPropsWithRef<'div'> & {
  url: string
  normal?: boolean
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ url, className, style, normal, ...rest }, ref) => {
    const maskStyle = {
      mask: `url("${url}") no-repeat center / contain`,
      WebkitMask: `url("${url}") no-repeat center / contain`,
    }

    return (
      <div
        className={cx('g-icon', className)}
        style={{
          ...style,
          ...(!normal && maskStyle),
        }}
        {...rest}
        ref={ref}></div>
    )
  },
)
