'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Brain, Cpu, Zap, Rocket } from 'lucide-react'
import * as THREE from 'three'

function FloatingIcon({ position, color, geometry = "sphere" }: { position: [number, number, number], color: string, geometry?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={0.3}>
        {geometry === "box" ? <boxGeometry args={[1, 1, 1]} /> : <sphereGeometry args={[0.5, 32, 32]} />}
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

function AnimatedBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <Suspense fallback={null}>
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff00ff" />
        
        <FloatingIcon position={[-2, 1, 0]} color="#00ffff" geometry="sphere" />
        <FloatingIcon position={[2, -1, 0]} color="#ff00ff" geometry="box" />
        <FloatingIcon position={[0, 2, -1]} color="#ffff00" geometry="sphere" />
        <FloatingIcon position={[-1, -2, 1]} color="#ff6600" geometry="box" />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  )
}

const features = [
  {
    icon: Brain,
    title: 'Neural Intelligence',
    description: 'Advanced machine learning algorithms that continuously adapt and improve performance.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Cpu,
    title: 'Quantum Processing',
    description: 'Leverage quantum computing principles for unprecedented computational power.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Lightning Speed',
    description: 'Real-time processing and instant responses for mission-critical applications.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Rocket,
    title: 'Scalable Solutions',
    description: 'Infinitely scalable architecture that grows with your business needs.',
    color: 'from-green-500 to-teal-500'
  }
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <AnimatedBackground />
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

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
              Pioneering the AI Revolution
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            whileHover={{ scale: 1.01, z: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            We're at the forefront of artificial intelligence and automation, creating solutions that 
            push the boundaries of what's possible. Our technology doesn't just automate—it thinks, 
            learns, and evolves.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 100, rotateX: 90 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: 90 }}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.05, 
                y: -20, 
                rotateY: 5,
                rotateX: -5,
                boxShadow: "0 25px 50px rgba(0, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 h-full hover:border-cyan-400/40 transition-all duration-500 relative overflow-hidden">
                {/* Animated background gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 1, rotate: 5 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Simple floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      animate={{
                        y: [-10, -30, -10],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ 
                      rotateY: 180,
                      scale: 1.2
                    }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl sm:text-2xl font-semibold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: 45 }}
          transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.06, y: -6, rotateY: 1 }}
          whileTap={{ scale: 1.03 }}
          className="mt-16 text-center transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 lg:p-12 max-w-5xl mx-auto relative overflow-hidden hover:bg-transparent">
            {/* Animated border effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent, rgba(255, 0, 255, 0.1), transparent)",
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
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6"
                whileHover={{ scale: 1.05, rotateY: 3 }}
              >
                Ready to Transform Your Future?
              </motion.h3>
              <motion.p 
                className="text-gray-300 mb-8 text-lg sm:text-xl leading-relaxed"
                whileHover={{ scale: 1.02 }}
              >
                Join thousands of forward-thinking companies already leveraging our AI solutions 
                to revolutionize their operations and unlock unprecedented growth.
              </motion.p>
              <div className="flex flex-wrap justify-center gap-8 text-sm sm:text-base text-gray-400">
                {[
                  { label: "99.9% Uptime", color: "bg-cyan-400" },
                  { label: "24/7 Support", color: "bg-purple-400" },
                  { label: "Enterprise Security", color: "bg-pink-400" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="flex items-center space-x-3"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className={`w-3 h-3 ${item.color} rounded-full`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
