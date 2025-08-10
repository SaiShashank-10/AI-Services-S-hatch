"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, rotateX: -90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0, rotateX: -90 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.3 
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group cursor-pointer transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{
            scale: 1.1,
            rotateY: 10,
            rotateX: -10,
            y: -5,
          }}
          whileTap={{
            scale: 0.9,
            rotateY: 0,
            rotateX: 0,
          }}
        >
          {/* 3D Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full blur-lg opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main Button */}
          <motion.div
            className="relative w-full h-full bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
            whileHover={{
              rotateY: 360,
            }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 200
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Animated Arrow */}
            <motion.div
              className="relative z-10"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronUp 
                className="w-6 h-6 text-white group-hover:text-cyan-100 transition-colors duration-300" 
                strokeWidth={3}
              />
            </motion.div>
            
            {/* Floating Particles */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 120}deg) translateY(-20px)`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Hover Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 blur-md"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
