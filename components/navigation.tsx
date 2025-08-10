'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EggLogo from '@/components/egg-logo'
import Link from 'next/link'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-us' },
    { name: 'Services', href: '/explore-solutions' },
    { name: 'Technology', href: '/ai-automation' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-cyan-500/30 shadow-lg shadow-cyan-500/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/">
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: 5
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center space-x-2 transform-gpu bg-transparent hover:bg-transparent focus:bg-transparent cursor-pointer"
              style={{ transformStyle: "preserve-3d", backgroundColor: "transparent" }}
            >
              <EggLogo className="h-8 w-8 lg:h-10 lg:w-10" />
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent bg-transparent">
                S-HATCH
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2 lg:space-x-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    rotateY: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 relative group transform-gpu bg-transparent hover:bg-transparent focus:bg-transparent block"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {item.name}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"
                      whileHover={{ scaleY: 2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 15px 30px rgba(0, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 px-6 py-2 lg:px-8 lg:py-3 text-sm lg:text-base relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Get Started</span>
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.div
              whileHover={{ scale: 1.1, rotateZ: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-cyan-400 p-2"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, rotateX: -90 }}
            animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
            exit={{ opacity: 0, height: 0, rotateX: -90 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-cyan-500/30 transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -50, rotateY: -30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 150 }}
                  whileHover={{ 
                    x: 10,
                    scale: 1.02,
                    rotateY: 3
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:text-cyan-400 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 relative group transform-gpu bg-transparent hover:bg-transparent focus:bg-transparent"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="px-4 py-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 10px 20px rgba(0, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 py-3 text-base relative overflow-hidden group">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">Get Started</span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
