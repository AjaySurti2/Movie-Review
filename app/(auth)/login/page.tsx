'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4 relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      
      <Card className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-sm border-white/12 p-8">
        <div className="text-center mb-8">
          <Logo className="justify-center mb-6" />
          <h1 className="text-2xl font-bold">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[var(--panel)] border-[var(--border)] text-white focus-ring"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[var(--panel)] border-[var(--border)] text-white focus-ring"
              required
            />
          </div>

          {error && (
            <p className="text-[var(--accent)] text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white h-12 text-lg font-semibold"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <Link href="#" className="text-[var(--text-muted)] hover:text-white transition-colors">
            Forgot password?
          </Link>
          <div className="text-[var(--text-muted)]">
            New to MovieReview?{' '}
            <Link href="/signup" className="text-white hover:underline">
              Sign up now
            </Link>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-[var(--panel)] rounded-lg border border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] mb-2">Demo Account:</p>
          <p className="text-sm">Email: demo@moviereview.com</p>
          <p className="text-sm">Password: demo123</p>
        </div>
      </Card>
    </div>
  )
}