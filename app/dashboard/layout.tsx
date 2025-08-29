import { AppShell } from '@/components/layout/app-shell'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Temporarily remove authentication for demo purposes
  // Will be re-enabled when database is connected
  return <AppShell>{children}</AppShell>
}
