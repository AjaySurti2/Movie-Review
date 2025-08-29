'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Logo } from '@/components/ui/logo'
import { Menu, Home, Settings, LogOut, User } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/preferences', label: 'Preferences', icon: Settings },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const SideNav = ({ isMobile = false }) => (
    <nav className={`flex flex-col h-full bg-[var(--panel)] ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className="mb-8">
        <Logo showText={!isCollapsed} />
      </div>
      
      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`
                  w-full justify-start gap-3 h-12
                  ${isActive 
                    ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-2)]' 
                    : 'text-[var(--text-muted)] hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                {(!isCollapsed || isMobile) && item.label}
              </Button>
            </Link>
          )
        })}
      </div>
      
      <Button
        variant="ghost"
        onClick={() => signOut()}
        className="w-full justify-start gap-3 h-12 text-[var(--text-muted)] hover:text-white hover:bg-white/10"
      >
        <LogOut className="h-5 w-5" />
        {(!isCollapsed || isMobile) && 'Sign out'}
      </Button>
    </nav>
  )

  return (
    <div className="flex h-screen bg-[var(--bg)]">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
        <SideNav />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden bg-black/50 backdrop-blur-sm hover:bg-black/70"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-[var(--panel)]">
          <SideNav isMobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between p-4 md:p-6 bg-[var(--panel)]/50 backdrop-blur-sm border-b border-[var(--border)]">
          <div className="md:hidden" /> {/* Spacer for mobile menu button */}
          <h1 className="text-xl font-bold">Dashboard</h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session?.user?.image || ''} />
                  <AvatarFallback className="bg-[var(--accent)] text-white">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[var(--panel)] border-[var(--border)]">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}