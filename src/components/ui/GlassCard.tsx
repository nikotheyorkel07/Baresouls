import { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  blur?: 'sm' | 'md' | 'lg' | 'xl'
}

export function GlassCard({ 
  children, 
  className, 
  hover = true,
  blur = 'xl',
  ...props 
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  }

  return (
    <div
      className={cn(
        'glass-card rounded-3xl p-6',
        blurClasses[blur],
        hover && 'hover:shadow-glass-lg hover:scale-[1.02] transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
