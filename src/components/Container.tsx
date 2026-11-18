import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/** Centred content column: ~1100px max width, 16px gutters on mobile. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-[1100px] px-4 sm:px-6', className)} {...props} />
}
