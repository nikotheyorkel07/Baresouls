import { Moon, Sun, Monitor } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { colorMode, setColorMode, isDark } = useTheme()

  return (
    <div className="glass-card rounded-2xl p-2 flex gap-2">
      <button
        onClick={() => setColorMode('light')}
        className={cn(
          'p-2 rounded-xl transition-all duration-300',
          colorMode === 'light'
            ? 'bg-yellow-400 text-gray-900 shadow-md'
            : 'text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-black/30'
        )}
        aria-label="Light mode"
      >
        <Sun className="w-5 h-5" />
      </button>

      <button
        onClick={() => setColorMode('system')}
        className={cn(
          'p-2 rounded-xl transition-all duration-300',
          colorMode === 'system'
            ? 'bg-purple-500 text-white shadow-md'
            : 'text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-black/30'
        )}
        aria-label="System mode"
      >
        <Monitor className="w-5 h-5" />
      </button>

      <button
        onClick={() => setColorMode('dark')}
        className={cn(
          'p-2 rounded-xl transition-all duration-300',
          colorMode === 'dark'
            ? 'bg-indigo-600 text-white shadow-md'
            : 'text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-black/30'
        )}
        aria-label="Dark mode"
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  )
}

export function ThemeToggleSimple() {
  const { isDark, toggleColorMode } = useTheme()

  return (
    <motion.button
      onClick={toggleColorMode}
      className="glass-button rounded-full p-3 hover:scale-110 transition-transform"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-indigo-400" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  )
}
