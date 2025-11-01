import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Moon } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { useReflections, useCreateReflection } from '@/hooks/useReflections'
import { formatDate, getEmotionColor, getEmotionEmoji } from '@/lib/utils'

const emotions = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'anxious', label: 'Anxious', emoji: '😰' },
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'angry', label: 'Angry', emoji: '😠' },
  { id: 'grateful', label: 'Grateful', emoji: '🙏' },
  { id: 'hopeful', label: 'Hopeful', emoji: '✨' },
  { id: 'lonely', label: 'Lonely', emoji: '😔' },
]

export default function Reflect() {
  const [showNewReflection, setShowNewReflection] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const [intensity, setIntensity] = useState(3)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const { data: reflections, isLoading } = useReflections()
  const createReflection = useCreateReflection()

  const handleSave = async () => {
    if (!selectedEmotion || !body) return

    await createReflection.mutateAsync({
      emotion: selectedEmotion,
      intensity,
      title: title || null,
      body,
    })

    setShowNewReflection(false)
    setSelectedEmotion('')
    setIntensity(3)
    setTitle('')
    setBody('')
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
          <div>
            <h1 className="text-3xl font-bold theme-text mb-2">Reflect 🌙</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your emotional journey</p>
          </div>
          <Button onClick={() => setShowNewReflection(true)} className="rounded-full">
            <Plus className="w-5 h-5 mr-2" />
            New Entry
          </Button>
        </motion.div>

        {/* Reflections List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 mx-auto rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading reflections...</p>
            </div>
          ) : reflections && reflections.length > 0 ? (
            reflections.map((reflection, index) => (
              <motion.div
                key={reflection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getEmotionColor(reflection.emotion)} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {getEmotionEmoji(reflection.emotion)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 capitalize">
                          {reflection.emotion}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(reflection.created_at)}
                        </span>
                      </div>
                      {reflection.title && (
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {reflection.title}
                        </h3>
                      )}
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {reflection.body}
                      </p>
                      <div className="flex gap-1 mt-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < reflection.intensity
                                ? 'bg-purple-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <GlassCard className="p-12 text-center">
              <div className="text-6xl mb-4">🌙</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Start Your Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create your first reflection to track your emotional wellness
              </p>
              <Button onClick={() => setShowNewReflection(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Reflection
              </Button>
            </GlassCard>
          )}
        </div>

        {/* New Reflection Dialog */}
        <Dialog open={showNewReflection} onOpenChange={setShowNewReflection}>
          <DialogContent>
            <DialogClose onClose={() => setShowNewReflection(false)} />
            <DialogHeader>
              <DialogTitle>New Reflection</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Emotion Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  How are you feeling?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion.id}
                      onClick={() => setSelectedEmotion(emotion.id)}
                      className={`p-3 rounded-2xl text-center transition-all duration-300 ${
                        selectedEmotion === emotion.id
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105'
                          : 'glass-card hover:scale-105'
                      }`}
                    >
                      <div className="text-2xl mb-1">{emotion.emoji}</div>
                      <div className="text-xs font-medium">{emotion.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Intensity: {intensity}/5
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Title (optional)
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your reflection a title..."
                />
              </div>

              {/* Body */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Your thoughts
                </label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write about your feelings..."
                  rows={6}
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={!selectedEmotion || !body || createReflection.isPending}
                className="w-full"
              >
                {createReflection.isPending ? 'Saving...' : 'Save Reflection'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
