"use client"

import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Suspense } from 'react'
import LoadingScreen from '@/components/loading-screen'
import ScrollToTop from '@/components/scroll-to-top'

export default function AboutUsPage() {
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
                    About Us
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                  whileHover={{ scale: 1.01, z: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Pioneering the future of AI automation with cutting-edge technology that transforms businesses and empowers innovation.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -100, rotateY: -30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
                  className="space-y-6"
                >
                  <motion.h2 
                    className="text-3xl font-bold text-white"
                    whileHover={{ scale: 1.05, rotateY: 3 }}
                  >
                    Our Mission
                  </motion.h2>
                  <motion.p 
                    className="text-gray-300 leading-relaxed text-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    To democratize AI technology and make intelligent automation accessible to businesses of all sizes, 
                    enabling them to focus on what truly matters - innovation and growth.
                  </motion.p>
                  <motion.p 
                    className="text-gray-300 leading-relaxed text-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    We believe that the future belongs to those who can harness the power of artificial intelligence 
                    to create more efficient, intelligent, and human-centric solutions.
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 100, rotateY: 30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
                  className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Our Values</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Innovation", description: "Pushing boundaries in AI technology" },
                      { title: "Excellence", description: "Delivering world-class solutions" },
                      { title: "Integrity", description: "Building trust through transparency" },
                      { title: "Collaboration", description: "Working together for better results" }
                    ].map((value, index) => (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05, x: 10 }}
                        className="flex items-center space-x-4"
                      >
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        <div>
                          <h4 className="text-white font-semibold">{value.title}</h4>
                          <p className="text-gray-400 text-sm">{value.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
                className="text-center"
              >
                <motion.h2 
                  className="text-3xl font-bold text-white mb-8"
                  whileHover={{ scale: 1.05, rotateY: 2 }}
                >
                  Ready to Transform Your Future?
                </motion.h2>
                <motion.p 
                  className="text-gray-300 max-w-2xl mx-auto mb-8"
                  whileHover={{ scale: 1.02 }}
                >
                  Join us in shaping the future of AI automation and discover how our cutting-edge solutions 
                  can revolutionize your business operations.
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05, rotateY: 3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  Get Started Today
                </motion.button>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
        <ScrollToTop />
      </Suspense>
    </div>
  )
}
