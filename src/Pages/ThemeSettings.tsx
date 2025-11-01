import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ThemeSelector, ThemePreview } from '@/components/ui/ThemeSelector'

export default function ThemeSettings() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-6 flex items-center gap-4"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold theme-text">Theme Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Customize your experience</p>
          </div>
        </motion.div>

        {/* Current Theme Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ThemePreview />
        </motion.div>

        {/* Dark Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Color Mode
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose your preferred color scheme
                </p>
              </div>
              <ThemeToggle />
            </div>
          </GlassCard>
        </motion.div>

        {/* Wellness Theme Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Wellness Themes
          </h2>
          <ThemeSelector />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Your theme preferences are automatically saved and synced across all your devices
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}