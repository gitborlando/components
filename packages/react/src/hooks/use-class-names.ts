import { mergeClassNames } from '@utils/class-names'
import equal from 'fast-deep-equal'
import { useMemo, useRef } from 'react'

export function useClassNames(
  customClass: string = '',
  ...args: [...string[], Record<string, any>]
) {
  const lastProps = useRef<Record<string, any>>({})
  const nextProps = args[args.length - 1] as Record<string, any>
  if (!equal(lastProps.current, nextProps)) {
    lastProps.current = nextProps
  }
  return useMemo(
    () => mergeClassNames(customClass, ...args),
    [customClass, ...args, lastProps.current],
  )
}
