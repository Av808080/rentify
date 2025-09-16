import Dashboard from '@/components/dashboard'

const DashBoardPage = async ({ searchParams }: { searchParams: Promise<{ mode: string }> }) => {
  const mode = (await (searchParams)).mode
  return (
    <Dashboard mode={mode} />
  )
}

export default DashBoardPage