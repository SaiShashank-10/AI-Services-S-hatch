'use client'

import { motion } from 'framer-motion'
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Solutions': [
      { name: 'AI Automation', href: '/ai-automation' },
      { name: 'Machine Learning', href: '/explore-solutions' },
      { name: 'Data Analytics', href: '/explore-solutions' },
      { name: 'Custom Development', href: '/explore-solutions' }
    ],
    'Company': [
      { name: 'About Us', href: '/about-us' },
      { name: 'Careers', href: '/about-us' },
      { name: 'News', href: '/about-us' },
      { name: 'Contact', href: '/contact' }
    ],
    'Resources': [
      { name: 'Documentation', href: '/explore-solutions' },
      { name: 'Blog', href: '/about-us' },
      { name: 'Case Studies', href: '/explore-solutions' },
      { name: 'Support', href: '/contact' }
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/about-us' },
      { name: 'Terms of Service', href: '/about-us' },
      { name: 'Cookie Policy', href: '/about-us' },
      { name: 'GDPR', href: '/about-us' }
    ]
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'from-blue-500 to-cyan-500' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'from-blue-600 to-indigo-600' },
    { icon: Mail, href: 'mailto:contact@neuraspace.ai', label: 'Email', color: 'from-purple-500 to-pink-500' }
  ]

  return (
    <footer className="relative bg-black border-t border-gray-800 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-purple-900/10"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="space-y-6 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-8 w-8 lg:h-10 lg:w-10 text-cyan-400" />
                </motion.div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  S-HATCH
                </span>
              </motion.div>
              <motion.p 
                className="text-gray-400 max-w-md leading-relaxed text-base lg:text-lg"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Pioneering the future of AI automation with cutting-edge technology 
                that transforms businesses and empowers innovation.
              </motion.p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0, rotateY: 90 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      rotateY: 10,
                      boxShadow: "0 10px 20px rgba(0, 255, 255, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    viewport={{ once: true }}
                    className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 group transform-gpu`}
                    style={{ transformStyle: "preserve-3d" }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enhanced Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50, rotateX: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              className="transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h3 
                className="text-white font-semibold mb-6 text-lg"
                whileHover={{ scale: 1.05, color: "#00ffff" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {category}
              </motion.h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                      whileHover={{ 
                        x: 8, 
                        scale: 1.05,
                        color: "#00ffff",
                        textShadow: "0 0 10px rgba(0, 255, 255, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                      className="text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm lg:text-base block relative group"
                    >
                      <motion.span
                        className="absolute left-0 top-0 w-0 h-full bg-gradient-to-r from-cyan-400/20 to-transparent group-hover:w-full transition-all duration-300"
                        whileHover={{ scaleX: 1 }}
                        initial={{ scaleX: 0 }}
                      />
                      <span className="relative z-10">{link.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <motion.p 
            className="text-gray-400 text-sm lg:text-base"
            whileHover={{ scale: 1.05, color: "#00ffff" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            © {currentYear} S-HATCH. All rights reserved.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm lg:text-base text-gray-400">
            <motion.span
              whileHover={{ scale: 1.05, color: "#ff00ff" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Made with ❤️ for the future
            </motion.span>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>All systems operational</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
