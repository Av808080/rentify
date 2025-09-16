import React from 'react'
import Sidebar from './sidebar'
import EditProfile from './services/edit-profile'
import { getAuth } from '@/lib/getAuth'

const Dashboard =async ({mode}:{mode:string}) => {
    const user = await getAuth()
  return (
    <>
    <main className='flex gap-4 my-8'>

    <Sidebar mode={mode} />
    <section className='flex-3/4'>
    <EditProfile user={user!} />
    </section>
    </main>
    </>
  )
}

export default Dashboard