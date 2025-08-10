'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float, Stars, Sparkles as DreiSparkles } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import * as THREE from 'three'

// Mouse position hook
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return mousePosition
}

// Futuristic Space Background Components
function SpaceNebula() {
  const nebulaRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.x = state.clock.elapsedTime * 0.01
      nebulaRef.current.rotation.y = state.clock.elapsedTime * 0.005
      nebulaRef.current.rotation.z = state.clock.elapsedTime * 0.003
    }
  })

  return (
    <mesh ref={nebulaRef} scale={[50, 50, 50]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        color="#1a0033"
        transparent
        opacity={0.3}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function SpaceStars() {
  const starsRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.0001
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.0002
    }
  })

  // Create star field
  const starCount = 8000
  const positions = new Float32Array(starCount * 3)
  const colors = new Float32Array(starCount * 3)
  
  for (let i = 0; i < starCount; i++) {
    // Random positions in a large sphere
    const radius = Math.random() * 100 + 50
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
    
    // Random star colors (white, blue, purple, cyan)
    const colorChoice = Math.random()
    if (colorChoice < 0.4) {
      colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1 // White
    } else if (colorChoice < 0.6) {
      colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1 // Cyan
    } else if (colorChoice < 0.8) {
      colors[i * 3] = 0.5; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1 // Blue
    } else {
      colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1 // Magenta
    }
  }

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.5} 
        vertexColors 
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  )
}

function SpacePlanets({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const planetsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (planetsRef.current) {
      planetsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      planetsRef.current.position.x = mousePosition.x * 2
      planetsRef.current.position.y = mousePosition.y * 1
    }
  })

  return (
    <group ref={planetsRef}>
      {/* Large distant planet */}
      <mesh position={[-15, 5, -20]} scale={3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#4a0080"
          emissive="#2a0040"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Medium planet with rings */}
      <group position={[12, -3, -15]}>
        <mesh scale={2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#0066cc"
            emissive="#003366"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Planet rings */}
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]} scale={2.5}>
          <torusGeometry args={[1.5, 0.1, 8, 64]} />
          <meshStandardMaterial
            color="#00ffff"
            transparent
            opacity={0.6}
            emissive="#00cccc"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
      
      {/* Small moon */}
      <mesh position={[8, 8, -10]} scale={0.8}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#666666"
          emissive="#333333"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  )
}

function SpaceAsteroids({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const asteroidsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (asteroidsRef.current) {
      asteroidsRef.current.children.forEach((asteroid, i) => {
        asteroid.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1)
        asteroid.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.05)
        asteroid.rotation.z = state.clock.elapsedTime * (0.2 + i * 0.03)
        
        // Orbital motion
        const angle = (i / 12) * Math.PI * 2 + state.clock.elapsedTime * 0.1
        const radius = 8 + i * 0.5
        
        asteroid.position.x = Math.cos(angle) * radius + mousePosition.x * 0.5
        asteroid.position.y = Math.sin(angle * 1.5) * 3
        asteroid.position.z = Math.sin(angle) * 4 + mousePosition.y * 0.3
      })
    }
  })

  return (
    <group ref={asteroidsRef}>
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.5} floatIntensity={1}>
          <mesh scale={0.1 + Math.random() * 0.05}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={`hsl(${200 + i * 15}, 60%, 40%)`}
              roughness={0.8}
              metalness={0.2}
              emissive={`hsl(${200 + i * 15}, 60%, 20%)`}
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function SpaceStation({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const stationRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (stationRef.current) {
      stationRef.current.rotation.y = state.clock.elapsedTime * 0.1
      stationRef.current.position.x = mousePosition.x * 0.8
      stationRef.current.position.y = mousePosition.y * 0.5
    }
  })

  return (
    <group ref={stationRef} position={[0, 0, -5]}>
      {/* Central hub */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 2, 8]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.8}
          roughness={0.2}
          emissive="#0066ff"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Rotating rings */}
      {[1, 2, 3].map((i) => (
        <mesh key={i} rotation={[0, 0, i * Math.PI / 3]}>
          <torusGeometry args={[1 + i * 0.3, 0.05, 8, 32]} />
          <meshStandardMaterial
            color="#00ffff"
            metalness={0.9}
            roughness={0.1}
            emissive="#00cccc"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Antenna/solar panels */}
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2, 0.1, 0.5]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#cccc00"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  )
}

function AnimatedSphere({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + mousePosition.y * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + mousePosition.x * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.position.x = mousePosition.x * 0.3
      meshRef.current.position.z = mousePosition.y * 0.2
      
      const scale = 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00ffff"
          attach="material"
          distort={0.6}
          speed={4}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  )
}

function DynamicLighting({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const lightRef = useRef<THREE.PointLight>(null)
  
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = mousePosition.x * 5
      lightRef.current.position.y = mousePosition.y * 5
      lightRef.current.position.z = 5
      lightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <>
      <pointLight ref={lightRef} color="#00ffff" />
      <pointLight 
        position={[-mousePosition.x * 5, -mousePosition.y * 5, -5]} 
        intensity={1 + Math.sin(Date.now() * 0.001) * 0.3} 
        color="#ff00ff" 
      />
      {/* Ambient space lighting */}
      <ambientLight intensity={0.1} color="#000033" />
      {/* Distant star light */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.3} 
        color="#ffffff" 
      />
    </>
  )
}

function MouseTracker() {
  const { camera } = useThree()
  const mousePosition = useMousePosition()
  
  useFrame(() => {
    camera.position.x = mousePosition.x * 0.5
    camera.position.y = mousePosition.y * 0.3
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Custom cursor component
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', updateMousePosition)
    
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-50"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.4 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </>
  )
}

export default function Hero() {
  const mousePosition = useMousePosition()

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden cursor-none">
      <CustomCursor />
      
      {/* Futuristic Space-Themed 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            {/* Space Environment */}
            <SpaceNebula />
            <SpaceStars />
            <SpacePlanets mousePosition={mousePosition} />
            <SpaceAsteroids mousePosition={mousePosition} />
            <SpaceStation mousePosition={mousePosition} />
            
            {/* Enhanced Lighting for Space */}
            <DynamicLighting mousePosition={mousePosition} />
            
            {/* Main Interactive Elements */}
            <AnimatedSphere mousePosition={mousePosition} />
            <MouseTracker />
            
            {/* Space Particles */}
            <DreiSparkles 
              count={100} 
              scale={[20, 20, 20]} 
              size={1} 
              speed={0.2} 
              color="#00ffff"
            />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.1}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 2.2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Enhanced Space-Themed Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-900/20 to-black/90 z-10"></div>
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 via-transparent to-purple-900/30 z-10"></div>

      {/* Cosmic mouse trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full pointer-events-none z-40"
        style={{
          x: mousePosition.x * window.innerWidth / 2,
          y: mousePosition.y * window.innerHeight / 2,
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.8, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content remains the same */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 90 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            x: mousePosition.x * 10,
            rotateY: mousePosition.x * 2
          }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 100 }}
          className="space-y-8"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ 
              scale: 1, 
              rotateY: 0,
              rotateZ: mousePosition.x * 2
            }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3 transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm text-cyan-300 font-medium">Next-Gen AI Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, rotateX: 45 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              rotateY: mousePosition.x * 1
            }}
            transition={{ duration: 1.2, delay: 0.7, type: "spring", stiffness: 80 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.span 
              className="block bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                backgroundPosition: { duration: 3, repeat: Infinity },
                type: "spring", 
                stiffness: 300 
              }}
            >
              The Future of
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02, rotateY: -2 }}
              animate={{
                backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
              }}
              transition={{ 
                backgroundPosition: { duration: 3, repeat: Infinity, delay: 1.5 },
                type: "spring", 
                stiffness: 300 
              }}
            >
              AI Automation
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, rotateX: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              x: mousePosition.x * 5
            }}
            transition={{ duration: 1, delay: 0.9, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, z: 10 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            Harness the power of advanced artificial intelligence and automation to transform your business. 
            Experience the next generation of intelligent solutions that adapt, learn, and evolve with your needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 45 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              rotateY: mousePosition.x * 1
            }}
            transition={{ duration: 1, delay: 1.1, type: "spring", stiffness: 100 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5, 
                rotateX: -5,
                boxShadow: "0 20px 40px rgba(0, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95, rotateY: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link href="/explore-solutions" className="group inline-block">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 px-10 py-4 text-lg relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Explore Solutions</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                rotateY: -5, 
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(255, 0, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95, rotateY: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 px-10 py-4 text-lg relative overflow-hidden backdrop-blur-sm"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Watch Demo</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: mousePosition.x * 20
        }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotateX: [0, 10, 0],
            rotateZ: mousePosition.x * 5
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.2, rotateY: 10 }}
          className="w-8 h-12 border-2 border-cyan-400/60 rounded-full flex justify-center backdrop-blur-sm bg-black/20 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ 
              y: [0, 16, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
