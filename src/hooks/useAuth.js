// useAuth.js
import { supabase } from '@/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // If using Vue Router

const isLoggedIn = ref(false)
const user = ref(null)
const isLoading = ref(false)

export function useAuth() {
  const router = useRouter() // Initialize router if needed
  const error = ref(null)

  const login = async ({ email, password }) => {
    isLoading.value = true
    error.value = null
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        throw new Error(error)
      }
      isLoggedIn.value = true
    } catch (err) {
      error.value = err.message
      isLoggedIn.value = false
    } finally {
      isLoading.value = false
    }
  }

  const signUp = async ({ email, password }) => {
    isLoading.value = true
    error.value = null
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'http://localhost:5173/',
        },
      })
      if (error) {
        throw new Error(error.message)
      }
      isLoggedIn.value = true
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    error.value = null
    let { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }

    user.value = null
    isLoggedIn.value = false
    router.push('/')
  }

  return {
    isLoggedIn,
    user,
    isLoading,
    error,
    login,
    logout,
    signUp,
  }
}
