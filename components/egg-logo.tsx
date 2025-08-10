"use client"

import { motion } from "framer-motion"
import * as React from "react"

type EggLogoProps = {
  size?: number
  className?: string
}

export default function EggLogo({ size = 40, className }: EggLogoProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const wrapperStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    width: className ? undefined : size,
    height: className ? undefined : size,
  }

  return (
    <motion.div
      aria-label="Egg hatching logo"
      role="img"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ scale: 1, rotate: 0 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={className}
      style={wrapperStyle}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
        initial={false}
      >
        {/* Subtle neon glow behind egg (dark-friendly) */}
        <motion.ellipse
          cx="32"
          cy="34"
          rx="18"
          ry="24"
          fill="url(#egg_glow)"
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dark egg base */}
        <motion.ellipse
          cx="32"
          cy="34"
          rx="16"
          ry="22"
          fill="url(#egg_dark)"
          stroke="url(#egg_stroke)"
          strokeWidth="1.5"
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Crack line (neon) */}
        <motion.path
          d="M20 34 C 24 30, 26 38, 30 34 C 34 30, 36 38, 40 34 C 44 30, 46 36, 44 38"
          stroke="url(#crack_grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray="80"
          animate={{ strokeDashoffset: [80, 0, 80] }}
          transition={{ duration: 3.5, times: [0, 0.45, 1], repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Neon spark on hover */}
        <motion.circle
          cx="32"
          cy="30"
          r="4"
          fill="url(#spark_grad)"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -4, 0],
          }}
          transition={{ duration: 3.5, times: [0.2, 0.5, 0.8], repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft highlight (very subtle) */}
        <motion.path
          d="M24 18 C 21 24, 21 29, 24 33"
          stroke="#e5e7eb"
          strokeOpacity="0.25"
          strokeWidth="1.25"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <defs>
          {/* Glow: cyan to purple */}
          <radialGradient id="egg_glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 34) rotate(90) scale(24 18)">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
          </radialGradient>
          {/* Dark shell */}
          <linearGradient id="egg_dark" x1="16" y1="12" x2="48" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0b0f17" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          {/* Neon stroke */}
          <linearGradient id="egg_stroke" x1="16" y1="12" x2="48" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          {/* Crack neon */}
          <linearGradient id="crack_grad" x1="20" y1="30" x2="46" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          {/* Spark */}
          <radialGradient id="spark_grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 30) scale(5)">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </radialGradient>
        </defs>
      </motion.svg>
    </motion.div>
  )
}


