import { Home, MessageSquare, Moon, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItem {
  icon: typeof Home
  label: string
  path: string
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Moon, label: 'Reflect', path: '/reflect' },
  { icon: User, label: 'Profile', path: '/profile' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 pb-safe"
    >
      <div className="mx-auto max-w-2xl px-4 pb-4">
        <div className="glass-card rounded-3xl p-2 shadow-glass-lg">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'relative flex flex-col items-center gap-1 rounded-2xl px-6 py-3 transition-all duration-300',
                    isActive
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <motion.div
                    className="relative z-10"
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  
                  <span className={cn(
                    'relative z-10 text-xs font-medium transition-all duration-300',
                    isActive ? 'opacity-100' : 'opacity-0'
                  )}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
