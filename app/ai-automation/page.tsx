"use client"

import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Suspense } from 'react'
import LoadingScreen from '@/components/loading-screen'
import ScrollToTop from '@/components/scroll-to-top'

export default function AIAutomationPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Navigation />
        
        <main className="pt-20">
          <section className="py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                className="text-center mb-16"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    AI Automation
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                  whileHover={{ scale: 1.01, z: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Transform your business operations with intelligent automation powered by cutting-edge AI technology.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Process Automation",
                    description: "Streamline repetitive tasks with intelligent workflow automation",
                    icon: "🤖",
                    color: "from-cyan-500 to-blue-500"
                  },
                  {
                    title: "Smart Decision Making",
                    description: "AI-powered insights for better business decisions",
                    icon: "🧠",
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    title: "Predictive Analytics",
                    description: "Forecast trends and optimize operations",
                    icon: "📊",
                    color: "from-green-500 to-teal-500"
                  },
                  {
                    title: "Natural Language Processing",
                    description: "Understand and process human language intelligently",
                    icon: "💬",
                    color: "from-orange-500 to-red-500"
                  },
                  {
                    title: "Computer Vision",
                    description: "Visual recognition and image processing capabilities",
                    icon: "👁️",
                    color: "from-indigo-500 to-purple-500"
                  },
                  {
                    title: "Autonomous Systems",
                    description: "Self-learning systems that adapt and improve",
                    icon: "⚡",
                    color: "from-pink-500 to-rose-500"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50, rotateX: 30 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -10,
                      rotateY: 5,
                    }}
                    className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300 transform-gpu"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 text-2xl`}
                      whileHover={{ 
                        rotateY: 360,
                        scale: 1.2
                      }}
                      transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {service.icon}
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl font-semibold text-white mb-4"
                      whileHover={{ scale: 1.05, rotateY: 2 }}
                    >
                      {service.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-400 leading-relaxed"
                      whileHover={{ scale: 1.02 }}
                    >
                      {service.description}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
        <ScrollToTop />
      </Suspense>
    </div>
  )
}
