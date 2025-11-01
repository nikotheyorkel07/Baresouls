import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(pageName: string): string {
  return `/${pageName.toLowerCase()}`
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInMs = now.getTime() - d.getTime()
  const diffInMins = Math.floor(diffInMs / 60000)
  const diffInHours = Math.floor(diffInMs / 3600000)
  const diffInDays = Math.floor(diffInMs / 86400000)

  if (diffInMins < 1) return 'Just now'
  if (diffInMins < 60) return `${diffInMins}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function getEmotionColor(emotion: string): string {
  const emotionColors: Record<string, string> = {
    happy: 'from-yellow-400 to-orange-400',
    sad: 'from-blue-400 to-indigo-500',
    anxious: 'from-purple-400 to-pink-500',
    calm: 'from-teal-400 to-green-400',
    angry: 'from-red-400 to-orange-500',
    grateful: 'from-pink-400 to-rose-400',
    hopeful: 'from-cyan-400 to-blue-400',
    lonely: 'from-gray-400 to-slate-500',
  }
  return emotionColors[emotion.toLowerCase()] || 'from-purple-400 to-pink-400'
}

export function getEmotionEmoji(emotion: string): string {
  const emotionEmojis: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    anxious: '😰',
    calm: '😌',
    angry: '😠',
    grateful: '🙏',
    hopeful: '✨',
    lonely: '😔',
  }
  return emotionEmojis[emotion.toLowerCase()] || '💭'
}

export function getCategoryIcon(category: string): string {
  const categoryIcons: Record<string, string> = {
    encouragement: '💪',
    gratitude: '🙏',
    hope: '✨',
    vent: '💭',
    milestone: '🎉',
    all: '🌸',
  }
  return categoryIcons[category] || '🌸'
}
