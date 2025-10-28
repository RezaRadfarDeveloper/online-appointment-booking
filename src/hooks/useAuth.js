// useAuth.js

import { supabase } from '@/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // If using Vue Router
import useLocalStorage from './useLocalStorage'

const isLoggedIn = ref(false)
const user = ref(null)
const isLoading = ref(false)

export function useAuth() {
  const router = useRouter() // Initialize router if needed
  const isLoggedInStorage = useLocalStorage('is_loggedIn')
  const userStorage = useLocalStorage('user')
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
    userStorage.value = user.value
    isLoggedInStorage.value = true
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
    userStorage.value = user.value
    isLoggedInStorage.value = true
    isLoggedIn.value = true
    isLoading.value = false
  }

  const logout = async () => {
    err.value = null
    isLoading.value = true
    let { error } = await supabase.auth.signOut()

    if (error) {
      isLoading.value = false
      throw new Error(error.message)
    }

    user.value = null
    isLoggedIn.value = false
    isLoading.value = false
    router.push('/')
  }

  const setIsLoggedIn = (flag) => {
    isLoggedIn.value = flag
  }

  const setUser = (userData) => {
    user.value = userData
  }

  return {
    isLoggedIn,
    user,
    isLoading,
    err,
    login,
    logout,
    signUp,
    setUser,
    setIsLoggedIn,
  }
}
