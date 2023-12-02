import { authOptions } from '@/lib/auth'
import React from 'react'
import { getServerSession } from 'next-auth'

const page = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className='text-xl font-bold text-white'>Welcome to Admin Page {session?.user.name}</div>
  )
}

export default page