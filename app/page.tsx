'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import LoadingScreen from '@/components/loading-screen'

// Defer 3D-heavy components to the client only to avoid SSR issues
const Hero = dynamic(() => import('@/components/hero'), { ssr: false })
const About = dynamic(() => import('@/components/about'), { ssr: false })
const Services = dynamic(() => import('@/components/services'), { ssr: false })
const Technology = dynamic(() => import('@/components/technology'), { ssr: false })
const Contact = dynamic(() => import('@/components/contact'), { ssr: false })
const Chatbot = dynamic(() => import('@/components/chatbot'), { ssr: false })
const ScrollToTop = dynamic(() => import('@/components/scroll-to-top'), { ssr: false })

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Navigation />
        <Hero />
        <About />
        <Services />
        <Technology />
        <Contact />
        <Footer />
        <Chatbot />
        <ScrollToTop />
      </Suspense>
    </div>
  )
}
