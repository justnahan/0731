'use client'

import { useEffect, useRef } from 'react'

// 滑鼠軌跡星塵效果
export function MouseTrailEffect() {
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!trailRef.current) return

      // 創建粒子元素
      const particle = document.createElement('div')
      particle.className = 'particle-trail'
      particle.style.left = e.clientX + 'px'
      particle.style.top = e.clientY + 'px'
      
      document.body.appendChild(particle)

      // 1秒後移除粒子
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle)
        }
      }, 1000)
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <div ref={trailRef} />
}

// 漂浮魔法粒子背景
export function FloatingParticles({ count = 20 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle}
          className="particle"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            animationDelay: Math.random() * 6 + 's',
            animationDuration: Math.random() * 3 + 6 + 's',
          }}
        />
      ))}
    </div>
  )
}

// 3D書本翻頁效果卡片包裝器
interface BookCardWrapperProps {
  children: React.ReactNode
  className?: string
}

export function BookCardWrapper({ children, className = '' }: BookCardWrapperProps) {
  return (
    <div className={`book-card ${className}`}>
      <div className="book-spine" />
      <div className="book-cover">
        {children}
      </div>
    </div>
  )
}

// 魔法發光按鈕
interface MagicalButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  glowing?: boolean
  breathing?: boolean
  disabled?: boolean
}

export function MagicalButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  glowing = false,
  breathing = false,
  disabled = false
}: MagicalButtonProps) {
  const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300 rounded-lg'
  const variantClasses = {
    primary: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-depth-2',
    secondary: 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 hover:from-amber-200 hover:to-amber-300 shadow-depth-1'
  }
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const glowClass = glowing ? 'glow-amber-strong' : ''
  const breathingClass = breathing ? 'breathing' : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${glowClass} 
        ${breathingClass}
        ${className}
        hover:scale-105 hover:shadow-depth-3
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
        before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// 打字機效果文字
interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypewriterText({ text, speed = 50, className = '' }: TypewriterTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    let i = 0
    const typeWriter = () => {
      if (i < text.length && textRef.current) {
        textRef.current.innerHTML = text.slice(0, i + 1)
        i++
        setTimeout(typeWriter, speed)
      }
    }

    typeWriter()
  }, [text, speed])

  return (
    <span 
      ref={textRef}
      className={`typewriter ${className}`}
    />
  )
}

// 魔法卷軸進度條
interface ScrollProgressProps {
  progress: number
  className?: string
}

export function ScrollProgress({ progress, className = '' }: ScrollProgressProps) {
  return (
    <div className={`scroll-progress ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}

// 星星爆炸效果
export function StarBurstEffect({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (!trigger) return

    const createStarBurst = () => {
      const container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.top = '50%'
      container.style.left = '50%'
      container.style.transform = 'translate(-50%, -50%)'
      container.style.pointerEvents = 'none'
      container.style.zIndex = '9999'

      for (let i = 0; i < 12; i++) {
        const star = document.createElement('div')
        star.innerHTML = '⭐'
        star.style.position = 'absolute'
        star.style.fontSize = '20px'
        star.style.animation = `starBurst 1s ease-out forwards`
        star.style.animationDelay = `${i * 0.1}s`
        star.style.transform = `rotate(${i * 30}deg) translateY(-50px)`
        container.appendChild(star)
      }

      document.body.appendChild(container)

      setTimeout(() => {
        if (document.body.contains(container)) {
          document.body.removeChild(container)
        }
      }, 2000)
    }

    createStarBurst()
  }, [trigger])

  return null
}