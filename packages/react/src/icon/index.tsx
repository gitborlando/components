import { useClassNames } from 'packages/react/src/hooks/use-class-names'
import { ComponentPropsWithRef, forwardRef } from 'react'
import './index.less'

export type IconProps = ComponentPropsWithRef<'div'> & {
  url: string
  normal?: boolean
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ url, className, style, normal, ...rest }, ref) => {
    const classNames = useClassNames(className, 'icon', {
      mask: !normal,
      img: normal,
    })

    if (normal) {
      return (
        <div className={classNames} style={style} {...rest} ref={ref}>
          <img src={url} />
        </div>
      )
    }

    return (
      <div
        className={classNames}
        style={{
          ...style,
          mask: `url("${url}") no-repeat center / contain`,
          WebkitMask: `url("${url}") no-repeat center / contain`,
        }}
        {...rest}
        ref={ref}></div>
    )
  },
)
