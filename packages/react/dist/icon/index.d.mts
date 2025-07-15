import * as react from 'react'
import { ComponentPropsWithRef } from 'react'

type IconProps = ComponentPropsWithRef<'div'> & {
  url: string
  normal?: boolean
}
declare const Icon: react.ForwardRefExoticComponent<
  Omit<IconProps, 'ref'> & react.RefAttributes<HTMLDivElement>
>

export { Icon }
export type { IconProps }
