// useAuth.js

import { supabase } from '@/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // If using Vue Router

const isLoggedIn = ref(false)
const user = ref(null)
const isLoading = ref(false)

export function useAuth() {
  const router = useRouter() // Initialize router if needed
  const err = ref(null)

  const login = async ({ email, password }) => {
    isLoading.value = true
    err.value = null

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      err.value = error.message
      isLoggedIn.value = false
      isLoading.value = false
      throw new Error(error)
    }
    user.value = { username: data.user.user_metadata.username, id: data.user.id }
    console.log(user.value)
    isLoggedIn.value = true
  }

  const signUp = async ({ email, password, options }) => {
    isLoading.value = true

    err.value = null

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: options.userName,
        },
      },
    })
    if (error) {
      err.value = error.message
      isLoading.value = false
      throw new Error(error.message)
    }
    user.value = data.user.user_metadata.username
    isLoggedIn.value = true
    isLoading.value = false
  }

  const logout = async () => {
    err.value = null
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
    err,
    login,
    logout,
    signUp,
  }
}
