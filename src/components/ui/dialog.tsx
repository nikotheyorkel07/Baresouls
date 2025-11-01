import { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          {children}
        </>
      )}
    </AnimatePresence>
  )
}

interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  showClose?: boolean
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, showClose = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'glass-card rounded-3xl p-6 shadow-glass-lg',
          'max-h-[90vh] overflow-y-auto',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

DialogContent.displayName = 'DialogContent'

export function DialogHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function DialogTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn('text-2xl font-bold text-gray-900 dark:text-white', className)} {...props}>
      {children}
    </h2>
  )
}

export function DialogDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-gray-600 dark:text-gray-400 mt-2', className)} {...props}>
      {children}
    </p>
  )
}

export function DialogClose({ onClose, className }: { onClose: () => void; className?: string }) {
  return (
    <button
      onClick={onClose}
      className={cn(
        'absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
        'hover:bg-white/30 dark:hover:bg-black/30 transition-colors',
        className
      )}
    >
      <X className="w-5 h-5" />
    </button>
  )
}
