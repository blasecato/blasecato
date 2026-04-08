import { Outlet } from 'react-router-dom'
import Header from '@/components/Header/Header'
import { Footer } from '@/components/ui/footer-section'

export default function RootLayout() {
  return (
    <div className="bg-background min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
