import { ReactNode } from 'react'
import { BottomNav } from './BottomNav'
import { PageTransition } from './PageTransition'

interface AppLayoutProps {
  children: ReactNode
  showNav?: boolean
}

export function AppLayout({ children, showNav = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <PageTransition>
        <main className={showNav ? 'pb-24' : ''}>
          {children}
        </main>
      </PageTransition>
      {showNav && <BottomNav />}
    </div>
  )
}
