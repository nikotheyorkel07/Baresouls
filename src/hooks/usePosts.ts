import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthProvider'

export interface Post {
  id: string
  user_id: string
  category: string
  content: string
  reactions: Record<string, number>
  created_at: string
}

export function usePosts(category?: string) {
  return useQuery({
    queryKey: ['posts', category],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Post[]
    },
  })
}

export function useCreatePost() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: Omit<Post, 'id' | 'user_id' | 'created_at' | 'reactions'>) => {
      if (!user) throw new Error('No user found')

      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...post,
          user_id: user.id,
          reactions: {},
        })
        .select()
        .single()

      if (error) throw error
      return data as Post
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useReactToPost() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, reaction }: { postId: string; reaction: string }) => {
      if (!user) throw new Error('No user found')

      const { data: post } = await supabase
        .from('posts')
        .select('reactions')
        .eq('id', postId)
        .single()

      if (!post) throw new Error('Post not found')

      const reactions = post.reactions || {}
      reactions[reaction] = (reactions[reaction] || 0) + 1

      const { data, error } = await supabase
        .from('posts')
        .update({ reactions })
        .eq('id', postId)
        .select()
        .single()

      if (error) throw error
      return data as Post
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
