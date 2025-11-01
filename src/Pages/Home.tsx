import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Heart, Moon, MessageSquare, Plus, Users, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/button'
import { useProfile } from '@/hooks/useProfile'
import { usePosts } from '@/hooks/usePosts'
import { cn, formatDate, getCategoryIcon } from '@/lib/utils'

export default function Home() {
  const navigate = useNavigate()
  const { data: profile, isLoading: profileLoading } = useProfile()
  const { data: posts, isLoading: postsLoading } = usePosts()
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts?.filter(post => post.category === activeCategory)

  const categories = [
    { id: 'all', label: 'All', icon: '🌸' },
    { id: 'encouragement', label: 'Support', icon: '💪' },
    { id: 'gratitude', label: 'Thanks', icon: '🙏' },
    { id: 'hope', label: 'Hope', icon: '✨' },
    { id: 'vent', label: 'Vent', icon: '💭' },
    { id: 'milestone', label: 'Win', icon: '🎉' },
  ]

  if (profileLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading...</p>
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
          className="pt-6"
        >
          <h1 className="text-3xl font-bold theme-text mb-2">
            Welcome back, {profile?.display_name || profile?.full_name?.split(' ')[0] || 'friend'} 🌸
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Your safe space to connect</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center mb-2">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.days_active || 0}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Days Active</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.support_given || 0}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Support Given</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-green-400 flex items-center justify-center mb-2">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.reflections_count || 0}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Reflections</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <button
            onClick={() => navigate('/chat')}
            className="glass-card rounded-3xl p-6 hover:scale-105 transition-transform duration-300 text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-3">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Chat with Luna</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Your AI companion</p>
          </button>
          
          <button
            onClick={() => navigate('/reflect')}
            className="glass-card rounded-3xl p-6 hover:scale-105 transition-transform duration-300 text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mb-3">
              <Moon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Reflect</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Journal your feelings</p>
          </button>
        </motion.div>

        {/* Community Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              Community Feed
            </h2>
            <Button size="sm" className="rounded-full">
              <Plus className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>

          {/* Category Filter */}
          <GlassCard className="p-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300',
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-black/30'
                  )}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Posts */}
          <div className="space-y-3">
            {postsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-4">Loading posts...</p>
              </div>
            ) : filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <GlassCard key={post.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{getCategoryIcon(post.category)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-900 dark:text-white">{post.content}</p>
                      <div className="flex gap-2 mt-3">
                        <button className="text-xs px-3 py-1 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 transition-colors">
                          ❤️ {post.reactions?.heart || 0}
                        </button>
                        <button className="text-xs px-3 py-1 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 transition-colors">
                          🤗 {post.reactions?.hug || 0}
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))
            ) : (
              <GlassCard className="p-12 text-center">
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Be the first to share in this category!
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Share Your Thoughts
                </Button>
              </GlassCard>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
