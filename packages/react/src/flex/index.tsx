import cx from 'classix'
import { forwardRef } from 'react'
import './index.less'
import { FlexProps } from './props'

const FlexContent = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      vshow = true,
      as: As = 'div',
      layout = '',
      block,
      gap,
      className = '',
      onHover,
      onMouseEnter,
      onMouseLeave,
      children,
      ...rest
    },
    ref,
  ) => {
    // const classNames = useClassNames(className, 'flex', {
    //   hidden: !vshow,
    //   [layout]: !!layout,
    //   [`block-${block}`]: !!block,
    //   [`gap-${gap}`]: !!gap && gap % 2 === 0,
    // })
    const classNames = cx('flex')
    return (
      <As
        ref={ref}
        className={classNames}
        onMouseEnter={(e: any) => {
          onHover?.(true)
          onMouseEnter?.(e)
        }}
        onMouseLeave={(e: any) => {
          onHover?.(false)
          onMouseLeave?.(e)
        }}
        {...rest}>
        {children}
      </As>
    )
  },
)

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ vif = true, children, ...rest }, ref) => {
    return Boolean(vif) ? (
      <FlexContent {...rest} ref={ref}>
        {children}
      </FlexContent>
    ) : null
  },
)

Flex.displayName = 'Flex'
