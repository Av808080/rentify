import Auth from '@/components/auth'
import { AuthMode } from '@/types/AuthMode.type'

const AuthPage = async({searchParams}: {searchParams:Promise<{mode ?:AuthMode }>}) => {
    const mode = (await searchParams).mode || "login"
  return (
    <Auth mode={mode} />
  )
}

export default AuthPage