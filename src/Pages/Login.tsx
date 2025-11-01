import { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthProvider'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { Sparkles, Heart, Moon, MessageSquare } from 'lucide-react'

export default function Login() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-glass-lg"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <div>
            <h1 className="text-4xl font-bold theme-text mb-2">BareSouls</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your safe space for emotional wellness
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <GlassCard className="p-3 text-center" hover={false}>
              <Heart className="w-6 h-6 mx-auto mb-1 text-pink-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Community</p>
            </GlassCard>
            <GlassCard className="p-3 text-center" hover={false}>
              <MessageSquare className="w-6 h-6 mx-auto mb-1 text-purple-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">AI Chat</p>
            </GlassCard>
            <GlassCard className="p-3 text-center" hover={false}>
              <Moon className="w-6 h-6 mx-auto mb-1 text-blue-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Reflect</p>
            </GlassCard>
          </div>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard className="p-8">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(168 85 247)',
                      brandAccent: 'rgb(147 51 234)',
                    },
                  },
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                  input: 'glass-input',
                },
              }}
              providers={['google']}
              redirectTo={`${window.location.origin}/`}
              theme="dark"
            />
          </GlassCard>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-gray-600 dark:text-gray-400"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </div>
    </div>
  )
}