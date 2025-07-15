import cx from 'classix'
import { forwardRef } from 'react'

const Icon = forwardRef(({ url, className, style, normal, ...rest }, ref) => {
  const maskStyle = {
    mask: `url("${url}") no-repeat center / contain`,
    WebkitMask: `url("${url}") no-repeat center / contain`,
  }
  return /* @__PURE__ */ React.createElement('div', {
    className: cx('icon', className),
    style: {
      ...style,
      ...(!normal && maskStyle),
    },
    ...rest,
    ref,
  })
})

export { Icon }
