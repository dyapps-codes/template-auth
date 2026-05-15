import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2, Mail } from 'lucide-react'
import { useAuth } from '@dypai-ai/client-sdk/react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { appConfig } from '@/lib/app-config'
import { toast } from 'sonner'

export function SignUp() {
  const navigate = useNavigate()
  const { signUp, isAuthenticated, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmationEmail, setConfirmationEmail] = useState('')

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(appConfig.homePath, { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    const { error, confirmationRequired } = await signUp(email, password, { name })
    setLoading(false)

    if (error) {
      toast.error(error.message ?? 'Could not create your account')
      return
    }

    if (confirmationRequired) {
      setConfirmationEmail(email)
      return
    }

    navigate(appConfig.homePath)
  }

  if (confirmationEmail) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-[400px] border-border/80 shadow-sm">
          <CardContent className="space-y-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-muted">
              <Mail className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight">Check your inbox</h1>
              <p className="text-sm text-muted-foreground">
                We sent a confirmation link to <span className="font-medium text-foreground">{confirmationEmail}</span>.
                Confirm your email before signing in.
              </p>
            </div>
            <Button asChild className="h-11 w-full">
              <Link to={appConfig.loginPath}>Back to sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-[400px] border-border/80 shadow-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl font-semibold tracking-tight">Create account</CardTitle>
          <CardDescription>Sign up with your email to access the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                autoFocus
                disabled={loading || isLoading}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading || isLoading}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading || isLoading}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading || isLoading}
                className="h-11"
              />
            </div>
            <Button type="submit" className="h-11 w-full font-medium" disabled={loading || isLoading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="border-t pt-6 text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link to={appConfig.loginPath} className="font-medium text-foreground underline-offset-4 hover:underline">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
