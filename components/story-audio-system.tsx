'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Music, Wind, Heart, Sparkles } from 'lucide-react'

interface StoryAudioSystemProps {
  isEnabled: boolean
  storyCategory: string
  isReading: boolean
  currentChapter: number
}

export function StoryAudioSystem({ 
  isEnabled, 
  storyCategory, 
  isReading, 
  currentChapter 
}: StoryAudioSystemProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)

  // 為不同故事類型創建音效
  const createAmbientSound = (category: string) => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    const audioContext = audioContextRef.current
    const gainNode = gainNodeRef.current

    // 停止之前的音效
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
    }

    const oscillator = audioContext.createOscillator()
    const filter = audioContext.createBiquadFilter()
    
    oscillatorRef.current = oscillator

    // 根據故事類型設置不同的音效
    switch (category) {
      case '奇幻':
        // 神秘的風聲效果
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(80, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 3)
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(400, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.03, audioContext.currentTime)
        break
        
      case '現代':
        // 都市環境音
        oscillator.type = 'triangle'
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(800, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime)
        break
        
      case '復古':
        // 復古電台靜音效果
        oscillator.type = 'sawtooth'
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime)
        filter.type = 'highpass'
        filter.frequency.setValueAtTime(300, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.015, audioContext.currentTime)
        break
        
      default:
        // 默認溫和音效
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime)
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(500, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.025, audioContext.currentTime)
    }

    // 連接音頻節點
    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // 開始播放
    oscillator.start()
    
    // 添加音量變化以創造更自然的環境音
    const fadeIn = () => {
      const currentGain = gainNode.gain.value
      gainNode.gain.exponentialRampToValueAtTime(currentGain * 1.2, audioContext.currentTime + 2)
      setTimeout(() => {
        gainNode.gain.exponentialRampToValueAtTime(currentGain * 0.8, audioContext.currentTime + 2)
        setTimeout(fadeIn, 4000)
      }, 2000)
    }
    
    if (isReading) {
      fadeIn()
    }
  }

  // 頁面翻頁音效
  const playPageTurnSound = () => {
    if (!audioContextRef.current || !isEnabled) return

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const filter = audioContext.createBiquadFilter()

    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.3)
    
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1000, audioContext.currentTime)
    filter.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  // 打字音效
  const playTypingSound = () => {
    if (!audioContextRef.current || !isEnabled) return

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(0.02, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.05)
  }

  // 初始化音頻系統
  useEffect(() => {
    if (isEnabled && !audioContextRef.current) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        audioContextRef.current = new AudioContext()
        gainNodeRef.current = audioContextRef.current.createGain()
      } catch (error) {
        console.warn('Audio context not supported:', error)
      }
    }
  }, [isEnabled])

  // 根據閱讀狀態控制環境音
  useEffect(() => {
    if (isEnabled && isReading && audioContextRef.current) {
      createAmbientSound(storyCategory)
      setIsPlaying(true)
    } else if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      setIsPlaying(false)
    }

    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (error) {
          // Oscillator might already be stopped
        }
      }
    }
  }, [isEnabled, isReading, storyCategory])

  // 章節變化時播放翻頁音效
  useEffect(() => {
    if (isEnabled && currentChapter > 0) {
      playPageTurnSound()
    }
  }, [currentChapter, isEnabled])

  // 對外暴露音效函數
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).playTypingSound = playTypingSound
      (window as any).playPageTurnSound = playPageTurnSound
    }
  }, [playTypingSound, playPageTurnSound])

  // 清理音頻資源
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (error) {
          // Oscillator might already be stopped
        }
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close()
      }
    }
  }, [])

  // 音效類型圖標
  const getAudioIcon = () => {
    switch (storyCategory) {
      case '奇幻': return <Sparkles className="h-3 w-3" />
      case '現代': return <Music className="h-3 w-3" />
      case '復古': return <Heart className="h-3 w-3" />
      default: return <Wind className="h-3 w-3" />
    }
  }

  if (!isEnabled) return null

  return (
    <div className="flex items-center space-x-2 text-amber-100 text-xs">
      {isPlaying ? (
        <>
          <Volume2 className="h-3 w-3 animate-pulse" />
          {getAudioIcon()}
          <span className="hidden md:inline">環境音樂播放中</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3 w-3" />
          <span className="hidden md:inline">音效已準備</span>
        </>
      )}
    </div>
  )
}

// 導出音效控制 hook
export function useStoryAudio() {
  const playTyping = () => {
    if (typeof window !== 'undefined' && (window as any).playTypingSound) {
      (window as any).playTypingSound()
    }
  }

  const playPageTurn = () => {
    if (typeof window !== 'undefined' && (window as any).playPageTurnSound) {
      (window as any).playPageTurnSound()
    }
  }

  return { playTyping, playPageTurn }
}