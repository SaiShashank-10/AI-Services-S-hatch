"use client"

import Contact from '@/components/contact'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Suspense } from 'react'
import LoadingScreen from '@/components/loading-screen'
import ScrollToTop from '@/components/scroll-to-top'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Navigation />
        <Contact />
        <Footer />
        <ScrollToTop />
      </Suspense>
    </div>
  )
}
