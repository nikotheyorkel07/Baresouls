import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTheme, WellnessTheme } from '@/contexts/ThemeContext'
import { GlassCard } from './GlassCard'
import { cn } from '@/lib/utils'

interface ThemeOption {
  id: WellnessTheme
  name: string
  description: string
  gradient: string
  icon: string
}

const themes: ThemeOption[] = [
  {
    id: 'lavender',
    name: 'Lavender Calm',
    description: 'Peaceful purple hues',
    gradient: 'bg-gradient-to-br from-purple-400 to-pink-500',
    icon: '🌸',
  },
  {
    id: 'ocean',
    name: 'Ocean Serenity',
    description: 'Tranquil blue waves',
    gradient: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    icon: '🌊',
  },
  {
    id: 'sunset',
    name: 'Sunset Warmth',
    description: 'Warm orange glow',
    gradient: 'bg-gradient-to-br from-orange-400 to-red-500',
    icon: '🌅',
  },
  {
    id: 'forest',
    name: 'Forest Peace',
    description: 'Natural green calm',
    gradient: 'bg-gradient-to-br from-green-400 to-emerald-500',
    icon: '🌲',
  },
  {
    id: 'moonlight',
    name: 'Moonlight Dreams',
    description: 'Soft silver tones',
    gradient: 'bg-gradient-to-br from-slate-400 to-gray-600',
    icon: '🌙',
  },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {themes.map((themeOption) => (
          <motion.button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={cn(
              'relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300',
              'glass-card hover:shadow-glass-lg',
              theme === themeOption.id && 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-900'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', themeOption.gradient)}>
                {themeOption.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {themeOption.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {themeOption.description}
                </p>
              </div>

              {theme === themeOption.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </div>

            {theme === themeOption.id && (
              <motion.div
                layoutId="activeTheme"
                className={cn('absolute inset-0 -z-10 opacity-10', themeOption.gradient)}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export function ThemePreview() {
  const { theme } = useTheme()
  const currentTheme = themes.find((t) => t.id === theme)

  if (!currentTheme) return null

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-4">
        <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center text-3xl', currentTheme.gradient)}>
          {currentTheme.icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Current Theme
          </h3>
          <p className="text-lg font-bold theme-text">
            {currentTheme.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentTheme.description}
          </p>
        </div>
      </div>
    </GlassCard>
  )
}
