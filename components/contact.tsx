'use client'

import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Environment, Sphere, Torus } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import * as THREE from 'three'

function ContactSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.8, 64, 64]} scale={1.2}>
        <meshStandardMaterial
          color="#00ffff"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
          wireframe
        />
      </Sphere>
    </Float>
  )
}

function FloatingRings() {
  const ringsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.1
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={ringsRef}>
      {[...Array(3)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <Torus
            args={[1.5 + i * 0.3, 0.02, 16, 100]}
            rotation={[0, 0, (i * Math.PI) / 3]}
            position={[0, 0, i * 0.2]}
          >
            <meshStandardMaterial
              color={i === 0 ? "#00ffff" : i === 1 ? "#ff00ff" : "#ffff00"}
              transparent
              opacity={0.6}
              emissive={i === 0 ? "#00ffff" : i === 1 ? "#ff00ff" : "#ffff00"}
              emissiveIntensity={0.2}
            />
          </Torus>
        </Float>
      ))}
    </group>
  )
}

function Contact3DBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
      <Suspense fallback={null}>
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff00ff" />
        
        <ContactSphere />
        <FloatingRings />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Suspense>
    </Canvas>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Thank you! Your message has been sent successfully.')
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        })
      } else {
        alert(`Error: ${result.error || 'Failed to send message. Please try again.'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Contact3DBackground />
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: 45 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6"
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Launch?
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            whileHover={{ scale: 1.01, z: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Take the first step into the future of AI automation. Our team of experts is ready 
            to help you transform your business with cutting-edge technology.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -100, rotateY: -30 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.02, 
              rotateY: -2,
            }}
            className="transform-gpu bg-transparent hover:bg-transparent"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.05), transparent, rgba(255, 0, 255, 0.05), transparent)",
                  backgroundSize: "400% 400%"
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative z-10">
                <motion.h3 
                  className="text-2xl lg:text-3xl font-bold text-white mb-8 bg-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Get in Touch
                </motion.h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02, rotateY: 2 }}
                      whileFocus={{ scale: 1.02, rotateY: 2 }}
                      className="bg-transparent"
                    >
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 h-12 text-base"
                        required
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, rotateY: -2 }}
                      whileFocus={{ scale: 1.02, rotateY: -2 }}
                      className="bg-transparent"
                    >
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 h-12 text-base"
                        required
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02, rotateY: 1 }}
                    whileFocus={{ scale: 1.02, rotateY: 1 }}
                    className="bg-transparent"
                  >
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 h-12 text-base"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, rotateY: -1 }}
                    whileFocus={{ scale: 1.02, rotateY: -1 }}
                    className="bg-transparent"
                  >
                    <Textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 resize-none text-base"
                      required
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-transparent"
                  >
                    <Button
                      variant="ghost"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 py-4 text-lg group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <motion.div
                       className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </span>
                      {isSubmitting ? (
                        <motion.div
                          className="ml-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 30 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: 30 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            className="space-y-8 transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateY: -2,
                boxShadow: "0 25px 50px rgba(255, 0, 255, 0.15)"
              }}
              className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 lg:p-10 relative overflow-hidden"
            >
              <motion.h3 
                className="text-2xl lg:text-3xl font-bold text-white mb-8"
                whileHover={{ scale: 1.05, rotateY: -3 }}
              >
                Contact Information
              </motion.h3>
              <div className="space-y-8">
                {[
                  { icon: Mail, label: "Email", value: "saishashank1006@gmail.com", color: "from-cyan-500 to-purple-500" },
                  { icon: Phone, label: "Phone", value: "+91 9866012610", color: "from-purple-500 to-pink-500" },
                  { icon: MapPin, label: "Location", value: "Hyderabad, Telangana", color: "from-pink-500 to-orange-500" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="flex items-center space-x-4 group"
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ 
                        rotateY: 180,
                        scale: 1.2
                      }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <item.icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                      <p className="text-white font-medium text-lg">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateY: 2,
                boxShadow: "0 25px 50px rgba(0, 255, 255, 0.15)"
              }}
              className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 lg:p-10"
            >
              <motion.h3 
                className="text-xl lg:text-2xl font-bold text-white mb-6"
                whileHover={{ scale: 1.05, rotateY: 3 }}
              >
                Why Choose NeuraSpace?
              </motion.h3>
              <ul className="space-y-4 text-gray-300">
                {[
                  { text: "Industry-leading AI expertise", color: "bg-cyan-400" },
                  { text: "Custom solutions for your needs", color: "bg-purple-400" },
                  { text: "24/7 support and maintenance", color: "bg-pink-400" },
                  { text: "Proven track record of success", color: "bg-orange-400" }
                ].map((item, index) => (
                  <motion.li 
                    key={item.text}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <motion.div 
                      className={`w-3 h-3 ${item.color} rounded-full`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    <span className="text-base lg:text-lg">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
