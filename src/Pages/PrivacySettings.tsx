import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

export default function PrivacySettings() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto space-y-6">
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
            <h1 className="text-3xl font-bold theme-text">Privacy & Safety</h1>
            <p className="text-gray-600 dark:text-gray-400">Control your data</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Anonymous Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hide your identity in community posts</p>
              </div>
              <Switch />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Profile Visibility</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Make your profile visible to others</p>
              </div>
              <Switch defaultChecked />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Data Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Help improve BareSouls with usage data</p>
              </div>
              <Switch defaultChecked />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your privacy is our priority. All reflections are encrypted and never shared without your consent.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
