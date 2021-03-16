import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const index = () => {

  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard')
  }, [])

  return null
}

export default index
