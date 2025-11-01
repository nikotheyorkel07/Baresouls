import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  content: string
  isFromUser: boolean
  timestamp: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm Luna, your AI companion. I'm here to listen and support you. How are you feeling today?",
      isFromUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isFromUser: true,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputValue('')

    // Simulate Luna's response
    setTimeout(() => {
      const lunaResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I hear you. Thank you for sharing that with me. Would you like to tell me more about how you're feeling?",
        isFromUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, lunaResponse])
    }, 1000)
  }

  return (
    <div className="page-container flex flex-col h-screen">
      <div className="max-w-2xl mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-6 pb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Luna</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your AI companion</p>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-3xl p-4 ${
                  message.isFromUser
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    : 'glass-card'
                }`}
              >
                <p className={message.isFromUser ? 'text-white' : 'text-gray-900 dark:text-white'}>
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.isFromUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="pb-4">
          <GlassCard className="p-3">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Share your thoughts..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="rounded-full">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
