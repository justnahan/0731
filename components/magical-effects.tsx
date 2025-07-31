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

// 羽毛筆書寫動畫效果
interface FeatherWritingEffectProps {
  isWriting: boolean
  className?: string
}

export function FeatherWritingEffect({ isWriting, className = '' }: FeatherWritingEffectProps) {
  const featherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!featherRef.current || !isWriting) return

    const feather = featherRef.current
    feather.style.opacity = '1'
    feather.style.animation = 'featherWrite 2s linear infinite'

    return () => {
      feather.style.opacity = '0'
      feather.style.animation = 'none'
    }
  }, [isWriting])

  return (
    <div 
      ref={featherRef}
      className={`feather-writing ${className}`}
      style={{ opacity: 0 }}
    >
      🪶
    </div>
  )
}

// 魔法書頁翻轉效果
interface BookPageFlipProps {
  isFlipping: boolean
  direction: 'next' | 'prev'
  children: React.ReactNode
}

export function BookPageFlip({ isFlipping, direction, children }: BookPageFlipProps) {
  return (
    <div className={`book-page-container ${isFlipping ? `flipping-${direction}` : ''}`}>
      <div className="book-page">
        {children}
      </div>
    </div>
  )
}

// 沉浸式全屏背景效果
interface ImmersiveBackgroundProps {
  storyCategory: string
  children: React.ReactNode
}

export function ImmersiveBackground({ storyCategory, children }: ImmersiveBackgroundProps) {
  const getBackgroundGradient = () => {
    switch (storyCategory) {
      case '奇幻':
        return 'bg-gradient-to-b from-purple-900 via-indigo-800 to-purple-900'
      case '現代':
        return 'bg-gradient-to-b from-gray-800 via-blue-900 to-gray-800'
      case '復古':
        return 'bg-gradient-to-b from-amber-900 via-orange-800 to-amber-900'
      default:
        return 'bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900'
    }
  }

  const getFloatingElements = () => {
    switch (storyCategory) {
      case '奇幻':
        return ['✨', '🌟', '⭐', '💫', '🔮']
      case '現代':
        return ['🏙️', '💼', '📱', '🚗', '☕']
      case '復古':
        return ['📻', '🎭', '🎪', '🎨', '📸']
      default:
        return ['✨', '🌟', '⭐', '💫']
    }
  }

  return (
    <div className={`immersive-background ${getBackgroundGradient()}`}>
      {/* 背景紋理 */}
      <div className="absolute inset-0 texture-paper opacity-10" />
      
      {/* 浮動元素 */}
      <div className="absolute inset-0 overflow-hidden">
        {getFloatingElements().map((element, index) => (
          <div
            key={index}
            className="floating-element"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              fontSize: Math.random() * 20 + 15 + 'px',
              animationDelay: Math.random() * 10 + 's',
              animationDuration: Math.random() * 20 + 20 + 's',
            }}
          >
            {element}
          </div>
        ))}
      </div>
      
      {/* 主要內容 */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// 魔法粒子軌跡效果
interface ParticleTrailProps {
  isActive: boolean
  particleType: string
}

export function ParticleTrail({ isActive, particleType }: ParticleTrailProps) {
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    let animationId: number
    const particles: HTMLDivElement[] = []

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div')
      particle.textContent = particleType
      particle.style.position = 'fixed'
      particle.style.left = x + 'px'
      particle.style.top = y + 'px'
      particle.style.pointerEvents = 'none'
      particle.style.zIndex = '1000'
      particle.style.fontSize = '12px'
      particle.style.opacity = '0.8'
      particle.style.transition = 'all 1s ease-out'
      
      document.body.appendChild(particle)
      particles.push(particle)

      // 動畫效果
      setTimeout(() => {
        particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`
        particle.style.opacity = '0'
      }, 10)

      // 清除粒子
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle)
        }
        const index = particles.indexOf(particle)
        if (index > -1) {
          particles.splice(index, 1)
        }
      }, 1000)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.3) { // 30% 機率產生粒子
        createParticle(e.clientX, e.clientY)
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      particles.forEach(particle => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle)
        }
      })
    }
  }, [isActive, particleType])

  return <div ref={trailRef} />
}

// 閱讀進度環形指示器
interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function CircularProgress({ 
  progress, 
  size = 60, 
  strokeWidth = 4, 
  className = '' 
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`circular-progress ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 背景圓圈 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-amber-200 opacity-30"
        />
        {/* 進度圓圈 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-amber-500 transition-all duration-300 glow-amber"
        />
      </svg>
      {/* 中心文字 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-amber-700">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}