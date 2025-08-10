'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import * as THREE from 'three'

function TechSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} scale={1}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshStandardMaterial
        color="#00ffff"
        metalness={0.9}
        roughness={0.1}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function OrbitingElements() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh
              position={[
                Math.cos(angle) * 3.5,
                Math.sin(angle * 2) * 0.5,
                Math.sin(angle) * 3.5
              ]}
              scale={0.1}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={`hsl(${180 + i * 30}, 70%, 50%)`}
                metalness={0.8}
                roughness={0.2}
                emissive={`hsl(${180 + i * 30}, 70%, 50%)`}
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

const technologies = [
  { name: 'Machine Learning', progress: 95, color: 'from-cyan-500 to-blue-500', icon: '🤖' },
  { name: 'Neural Networks', progress: 90, color: 'from-purple-500 to-pink-500', icon: '🧠' },
  { name: 'Computer Vision', progress: 88, color: 'from-green-500 to-teal-500', icon: '👁️' },
  { name: 'Natural Language Processing', progress: 92, color: 'from-orange-500 to-red-500', icon: '💬' },
  { name: 'Robotics', progress: 85, color: 'from-indigo-500 to-purple-500', icon: '🦾' },
  { name: 'Quantum Computing', progress: 78, color: 'from-pink-500 to-rose-500', icon: '⚛️' }
]

export default function Technology() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="technology" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-900/10 to-black"></div>

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
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Cutting-Edge Technology
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            whileHover={{ scale: 1.01, z: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Our technology stack represents the pinnacle of AI innovation, combining the latest 
            advances in machine learning, quantum computing, and neural networks.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Simplified 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -45 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -100, rotateY: -45 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            className="h-96 lg:h-[500px] relative transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
              <Suspense fallback={null}>
                <Environment preset="night" />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
                <pointLight position={[0, 10, -10]} intensity={0.8} color="#ffff00" />
                
                <TechSphere />
                <OrbitingElements />
                
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  autoRotate 
                  autoRotateSpeed={0.8}
                  maxPolarAngle={Math.PI / 1.5}
                  minPolarAngle={Math.PI / 2.5}
                />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Enhanced Technology Progress */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 45 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: 45 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            className="space-y-8 transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 50, rotateX: 30 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1, type: "spring", stiffness: 120 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  rotateY: 2,
                }}
                className="group bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 transform-gpu hover:bg-transparent"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <motion.span 
                      className="text-2xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {tech.icon}
                    </motion.span>
                    <motion.h3 
                      className="text-white font-medium text-lg group-hover:text-cyan-300 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech.name}
                    </motion.h3>
                  </div>
                  <motion.span 
                    className="text-gray-400 text-lg font-bold"
                    whileHover={{ scale: 1.1, color: "#00ffff" }}
                  >
                    {tech.progress}%
                  </motion.span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0, scale: 1 }}
                    animate={isInView ? { width: `${tech.progress}%`, scale: 1 } : { width: 0, scale: 1 }}
                    transition={{ duration: 2, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    className={`h-full bg-gradient-to-r ${tech.color} rounded-full relative overflow-hidden`}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-white/30"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute right-0 top-0 w-2 h-full bg-white/50 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: 45 }}
          transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '99.9%', label: 'Accuracy Rate', color: 'from-cyan-400 to-blue-400' },
            { value: '10x', label: 'Faster Processing', color: 'from-purple-400 to-pink-400' },
            { value: '24/7', label: 'Autonomous Operation', color: 'from-green-400 to-teal-400' },
            { value: '∞', label: 'Scalability', color: 'from-orange-400 to-red-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.5, rotateY: 90 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.1, type: "spring", stiffness: 150 }}
              whileHover={{ 
                scale: 1.1, 
                y: -10,
                rotateY: 5,
              }}
              className="text-center group transform-gpu bg-transparent hover:bg-transparent"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                className={`text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}
                animate={{ 
                  textShadow: ["0 0 0px rgba(0,255,255,0)", "0 0 20px rgba(0,255,255,0.5)", "0 0 0px rgba(0,255,255,0)"]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <motion.div 
                className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
