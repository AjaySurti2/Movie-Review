import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/ui/logo'
import { CheckCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="mb-8">
            <Logo className="justify-center mb-6" />
          </div>
          
          <h1 className="hero-text text-white mb-8 max-w-4xl">
            MOVIE REVIEWING SITE
          </h1>
          
          <div className="space-y-6 mb-12 max-w-2xl">
            <div className="flex items-center gap-3 text-lg">
              <CheckCircle className="h-6 w-6 text-[var(--success)]" />
              <span>AI based review summary</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <CheckCircle className="h-6 w-6 text-[var(--success)]" />
              <span>Personalized movie reviews</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <CheckCircle className="h-6 w-6 text-[var(--success)]" />
              <span>OTT services where this movie is present</span>
            </div>
          </div>

          <div className="w-full max-w-md space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-black/50 backdrop-blur-sm border-white/20 text-white placeholder:text-[var(--text-muted)] focus-ring h-12"
            />
            <div className="flex gap-3">
              <Link href="/signup" className="flex-1">
                <Button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white h-12 text-lg font-semibold">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-6">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[var(--panel)] border-t border-[var(--border)] py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-8 text-[var(--text-muted)]">
            <Link href="#" className="hover:text-white transition-colors">About</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-[var(--text-muted)] mt-4">
            © 2025 MovieReview. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}