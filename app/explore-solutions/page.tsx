"use client"
 
import Services from '@/components/services'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import ScrollToTop from '@/components/scroll-to-top'

export default function ExploreSolutionsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current && isHovering) {
        const rect = textRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const x = e.clientX - centerX
        const y = e.clientY - centerY
        
        setMousePosition({ x, y })
      }
    }

    if (isHovering) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovering])

  // Calculate 3D transforms based on mouse position
  const rotateX = useTransform(
    useMotionValue(mousePosition.y),
    [-200, 200],
    [15, -15]
  )
  
  const rotateY = useTransform(
    useMotionValue(mousePosition.x),
    [-200, 200],
    [-15, 15]
  )

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative pt-28 pb-10 text-center">
        {/* 3D Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"
            animate={{
              x: [0, 120, 0],
              y: [0, -30, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        {/* Main 3D Animated Title with Mouse Tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="relative z-10"
        >
          <motion.div
            ref={textRef}
            className="inline-block cursor-pointer"
            style={{
              rotateX: isHovering ? rotateX : 0,
              rotateY: isHovering ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => {
              setIsHovering(false)
              setMousePosition({ x: 0, y: 0 })
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold relative"
              animate={{
                rotateY: isHovering ? 0 : [0, 5, 0, -5, 0],
                y: isHovering ? 0 : [0, -10, 0],
              }}
              transition={{
                rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 3D Text Effect with Multiple Layers */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                animate={{
                  filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  transform: isHovering ? "translateZ(20px)" : "translateZ(0px)",
                }}
              >
                Explore Solutions
              </motion.span>
              
              {/* Glow Effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent blur-sm opacity-50"
                animate={{
                  opacity: isHovering ? 0.8 : [0.3, 0.7, 0.3],
                  scale: isHovering ? 1.1 : [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  transform: isHovering ? "translateZ(10px)" : "translateZ(0px)",
                }}
              >
                Explore Solutions
              </motion.span>
              
              {/* Main Text */}
              <motion.span 
                className="relative bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                style={{
                  transform: isHovering ? "translateZ(30px)" : "translateZ(0px)",
                }}
              >
                Explore Solutions
              </motion.span>
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* 3D Animated Subtitle with Mouse Tilt */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
          className="mt-8 relative z-10"
        >
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg lg:text-xl cursor-pointer"
            animate={{
              rotateY: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{
              scale: 1.02,
              rotateY: 5,
              rotateX: 2,
            }}
          >
            Discover our full range of AI-driven products and services designed to transform your business.
          </motion.p>
        </motion.div>

        {/* Floating 3D Elements */}
        <motion.div
          className="absolute top-1/2 left-10 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-3 h-3 bg-purple-400 rounded-full"
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 0.7, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-20 w-1 h-1 bg-blue-400 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 2, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </section>

      {/* Reuse the Services grid/3D background */}
      <Services />
      <ScrollToTop />
    </main>
  )
}


