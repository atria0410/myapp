import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCurrentUser } from '@/api/v1/sessions'
import { User } from '@/types'

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    })()
  }, [router.pathname])

  return user
}

export default useCurrentUser
