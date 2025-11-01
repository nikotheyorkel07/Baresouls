import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthProvider'

export interface Reflection {
  id: string
  user_id: string
  emotion: string
  intensity: number
  title: string | null
  body: string
  created_at: string
}

export function useReflections() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['reflections', user?.id],
    queryFn: async () => {
      if (!user) return []

      const { data, error } = await supabase
        .from('reflections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Reflection[]
    },
    enabled: !!user,
  })
}

export function useCreateReflection() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reflection: Omit<Reflection, 'id' | 'user_id' | 'created_at'>) => {
      if (!user) throw new Error('No user found')

      const { data, error } = await supabase
        .from('reflections')
        .insert({
          ...reflection,
          user_id: user.id,
        })
        .select()
        .single()

      if (error) throw error

      // Update reflection count
      await supabase.rpc('increment_reflections_count', { user_id: user.id })

      return data as Reflection
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections', user?.id] })
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] })
    },
  })
}

export function useDeleteReflection() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reflectionId: string) => {
      const { error } = await supabase
        .from('reflections')
        .delete()
        .eq('id', reflectionId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections', user?.id] })
    },
  })
}
