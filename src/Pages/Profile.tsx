import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Settings, Palette, Bell, Shield, Download, HelpCircle, LogOut } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/button'
import { ThemeToggleSimple } from '@/components/ui/ThemeToggle'
import { useAuth } from '@/lib/AuthProvider'
import { useProfile } from '@/hooks/useProfile'

export default function Profile() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { data: profile, isLoading } = useProfile()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const menuItems = [
    { icon: Palette, label: 'Theme Settings', path: '/settings/theme', color: 'from-purple-400 to-pink-400' },
    { icon: Bell, label: 'Notifications', path: '/settings/notifications', color: 'from-blue-400 to-cyan-400' },
    { icon: Shield, label: 'Privacy & Safety', path: '/settings/privacy', color: 'from-green-400 to-emerald-400' },
    { icon: Download, label: 'Export Data', path: '/settings/export', color: 'from-orange-400 to-red-400' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help', color: 'from-indigo-400 to-purple-400' },
  ]

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-6 flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold theme-text">Profile</h1>
          <ThemeToggleSimple />
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl mb-4">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>👤</span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {profile?.display_name || profile?.full_name || 'Anonymous User'}
            </h2>
            {profile?.username && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">@{profile.username}</p>
            )}
            
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20 dark:border-black/20">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.days_active || 0}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Days Active</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.reflections_count || 0}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Reflections</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.support_given || 0}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Support</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Settings Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="w-full"
              >
                <GlassCard className="p-4 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white text-left flex-1">
                      {item.label}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </GlassCard>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Sign Out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full rounded-2xl border-2 border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
