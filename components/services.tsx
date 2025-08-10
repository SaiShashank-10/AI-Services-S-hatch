'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Environment } from '@react-three/drei'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Bot, Database, Shield, Workflow, Code, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import * as THREE from 'three'

function ServiceIcon3D({ position, type, color }: { position: [number, number, number], type: string, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  const getGeometry = () => {
    switch (type) {
      case 'sphere': return <sphereGeometry args={[0.3, 32, 32]} />
      case 'box': return <boxGeometry args={[0.5, 0.5, 0.5]} />
      case 'torus': return <torusGeometry args={[0.3, 0.1, 16, 100]} />
      default: return <sphereGeometry args={[0.3, 32, 32]} />
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={0.8}>
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

function Services3DBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <Suspense fallback={null}>
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#9333ea" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#06b6d4" />
        
        <ServiceIcon3D position={[-3, 2, 0]} type="sphere" color="#9333ea" />
        <ServiceIcon3D position={[3, -1, 0]} type="box" color="#06b6d4" />
        <ServiceIcon3D position={[0, 3, -2]} type="torus" color="#f59e0b" />
        <ServiceIcon3D position={[-2, -2, 1]} type="sphere" color="#ef4444" />
        <ServiceIcon3D position={[2, 1, -1]} type="box" color="#10b981" />
        <ServiceIcon3D position={[-1, 0, 2]} type="torus" color="#8b5cf6" />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Suspense>
    </Canvas>
  )
}

const services = [
  {
    icon: Bot,
    title: 'Intelligent Automation',
    description: 'Deploy AI-powered bots that handle complex tasks with human-like intelligence and decision-making capabilities.',
    features: ['Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Autonomous Decision Making'],
    color: 'from-purple-500 to-indigo-500',
    glowColor: 'rgba(147, 51, 234, 0.3)'
  },
  {
    icon: Database,
    title: 'Data Intelligence',
    description: 'Transform raw data into actionable insights with our advanced AI analytics and machine learning platforms.',
    features: ['Real-time Analytics', 'Pattern Recognition', 'Anomaly Detection', 'Predictive Modeling'],
    color: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.3)'
  },
  {
    icon: Shield,
    title: 'AI Security',
    description: 'Protect your digital assets with AI-driven cybersecurity solutions that adapt to emerging threats.',
    features: ['Threat Detection', 'Behavioral Analysis', 'Automated Response', 'Zero-Trust Architecture'],
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.3)'
  },
  {
    icon: Workflow,
    title: 'Process Optimization',
    description: 'Streamline operations with intelligent workflow automation that learns and improves over time.',
    features: ['Workflow Analysis', 'Bottleneck Detection', 'Resource Optimization', 'Performance Monitoring'],
    color: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.3)'
  },
  {
    icon: Code,
    title: 'AI Development',
    description: 'Custom AI solutions tailored to your specific needs, from concept to deployment and beyond.',
    features: ['Custom Models', 'API Integration', 'Cloud Deployment', 'Continuous Learning'],
    color: 'from-rose-500 to-pink-500',
    glowColor: 'rgba(239, 68, 68, 0.3)'
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence',
    description: 'Make data-driven decisions with AI-powered business intelligence and forecasting tools.',
    features: ['Market Analysis', 'Trend Forecasting', 'Risk Assessment', 'Strategic Planning'],
    color: 'from-violet-500 to-purple-500',
    glowColor: 'rgba(139, 92, 246, 0.3)'
  }
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Mouse tracking for 3D tilt effect on title
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTitleHovering, setIsTitleHovering] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (titleRef.current && isTitleHovering) {
        const rect = titleRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const x = e.clientX - centerX
        const y = e.clientY - centerY
        
        setMousePosition({ x, y })
      }
    }

    if (isTitleHovering) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isTitleHovering])

  // Calculate 3D transforms based on mouse position for title
  const titleRotateX = useTransform(
    useMotionValue(mousePosition.y),
    [-200, 200],
    [-20, 20]
  )
  
  const titleRotateY = useTransform(
    useMotionValue(mousePosition.x),
    [-200, 200],
    [20, -20]
  )

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Services3DBackground />
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: 45 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Enhanced 3D Animated Title with Different Effects */}
          <motion.div
            ref={titleRef}
            className="inline-block cursor-pointer mb-6"
            style={{
              rotateX: isTitleHovering ? titleRotateX : 0,
              rotateY: isTitleHovering ? titleRotateY : 0,
              transformStyle: "preserve-3d",
            }}
            onHoverStart={() => setIsTitleHovering(true)}
            onHoverEnd={() => {
              setIsTitleHovering(false)
              setMousePosition({ x: 0, y: 0 })
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-6xl font-bold relative"
              animate={{
                rotateZ: isTitleHovering ? 0 : [0, 1],
                y: isTitleHovering ? 0 : [0, -5],
              }}
              transition={{
                rotateZ: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                y: { duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 3D Text Effect with Different Layering */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                animate={{
                  filter: ["hue-rotate(0deg)", "hue-rotate(60deg)", "hue-rotate(0deg)"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  transform: isTitleHovering ? "translateZ(25px)" : "translateZ(0px)",
                }}
              >
                Our AI Solutions
              </motion.span>
              
              {/* Animated Glow Effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent blur-md opacity-40"
                animate={{
                  opacity: isTitleHovering ? 0.9 : [0.2, 0.6, 0.2],
                  scale: isTitleHovering ? 1.15 : [1, 1.08, 1],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  transform: isTitleHovering ? "translateZ(15px)" : "translateZ(0px)",
                }}
              >
                Our AI Solutions
              </motion.span>
              
              {/* Main Text with Different Gradient */}
              <motion.span 
                className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                style={{
                  transform: isTitleHovering ? "translateZ(35px)" : "translateZ(0px)",
                }}
              >
                Our AI Solutions
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Enhanced 3D Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 30 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: 30 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative z-10"
          >
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed cursor-pointer"
              animate={{
                rotateY: [0, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5
              }}
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{
                scale: 1.03,
                rotateY: 8,
                rotateX: 3,
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Comprehensive AI and automation services designed to transform your business 
              operations and drive unprecedented growth in the digital age.
            </motion.p>
          </motion.div>

          {/* Floating 3D Elements Around Title */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-400 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 0.8, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 100, rotateX: 90, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 0, y: 100, rotateX: 90, scale: 0.8 }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.03, 
                y: -15, 
                rotateY: 5,
                rotateX: -3,
                boxShadow: `0 25px 50px ${service.glowColor}`
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 lg:p-8 h-full hover:border-purple-400/40 transition-all duration-500 relative overflow-hidden">
                {/* Animated background gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Simple floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full"
                      style={{
                        left: `${15 + i * 12}%`,
                        top: `${20 + i * 8}%`,
                      }}
                      animate={{
                        y: [-5, -25, -5],
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.15
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <motion.div 
                    className={`w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ 
                      rotateY: 360,
                      scale: 1.2
                    }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <service.icon className="h-8 w-8 lg:h-9 lg:w-9 text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl lg:text-2xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300"
                    whileHover={{ scale: 1.05, rotateY: 2 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {service.description}
                  </motion.p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <motion.div 
                          className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: featureIndex * 0.2 }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden group/btn"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">Learn More</span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
