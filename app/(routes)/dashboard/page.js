// This is a Next.js page component that serves as the dashboard for the application.
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Header from './_components/Header'
import WorkspaceList from './_components/WorkspaceList'

function Dashboard() {
  return (
    <div>
      <Header />

      <WorkspaceList />
    </div>
  )
}

export default Dashboard
