'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MagicalButton, StarBurstEffect } from '@/components/magical-effects'
import { Heart, ShoppingCart, Trash2, Plus, Minus, BookOpen, Sparkles, Crown, Gem, Star, Clock } from 'lucide-react'

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

interface CartItem extends Product {
  quantity: number
  storyReason: string
  emotionalConnection: string
  storyEmoji: string
}

interface StoryDrivenCartProps {
  isOpen: boolean
  onClose: () => void
}

// 為每個商品生成情感化的購買理由
const getEmotionalReason = (productName: string) => {
  const reasons = [
    {
      reason: "因為這個故事深深打動了我的心",
      connection: "故事中的冒險精神讓我想起了年輕時的夢想",
      emoji: "💫"
    },
    {
      reason: "這個故事讓我找到了內心的平靜",
      connection: "就像故事中的主人公一樣，我也在尋找屬於自己的答案",
      emoji: "🌟"
    },
    {
      reason: "故事中的溫暖讓我想要擁有它",
      connection: "每次看到它，都會想起那個美好的故事",
      emoji: "✨"
    },
    {
      reason: "這個故事代表了我追求的生活態度",
      connection: "它不只是商品，更是我價值觀的體現",
      emoji: "🎭"
    },
    {
      reason: "故事中的勇氣給了我力量",
      connection: "擁有它就像擁有了故事中的勇氣和智慧",
      emoji: "⚡"
    }
  ]
  
  return reasons[Math.floor(Math.random() * reasons.length)]
}

const formatPrice = (cents: number) => {
  return `NT$${(cents / 100).toLocaleString()}`
}

export function StoryDrivenCart({ isOpen, onClose }: StoryDrivenCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // 從 localStorage 載入購物車數據
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('story-cart')
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart)
          setCartItems(parsed)
        } catch (error) {
          console.error('Error parsing cart data:', error)
        }
      }
    }
  }, [])

  // 保存到 localStorage
  const saveCartToStorage = (items: CartItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('story-cart', JSON.stringify(items))
    }
  }

  // 添加商品到購物車
  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    const emotionalData = getEmotionalReason(product.name)
    
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      setCartItems(updatedItems)
      saveCartToStorage(updatedItems)
    } else {
      const newItem: CartItem = {
        ...product,
        quantity: 1,
        storyReason: emotionalData.reason,
        emotionalConnection: emotionalData.connection,
        storyEmoji: emotionalData.emoji
      }
      const updatedItems = [...cartItems, newItem]
      setCartItems(updatedItems)
      saveCartToStorage(updatedItems)
    }
    
    // 顯示慶祝效果
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 2000)
  }

  // 更新商品數量
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }
    
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedItems)
    saveCartToStorage(updatedItems)
  }

  // 移除商品
  const removeFromCart = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id)
    setCartItems(updatedItems)
    saveCartToStorage(updatedItems)
  }

  // 計算總價
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price_in_cents * item.quantity), 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // 結帳處理
  const handleCheckout = () => {
    setIsCheckingOut(true)
    
    // 模擬結帳流程
    setTimeout(() => {
      setShowCelebration(true)
      setTimeout(() => {
        setIsCheckingOut(false)
        setShowCelebration(false)
        onClose()
        // 重定向到訂單確認頁面
        window.location.href = '/orders/confirmation'
      }, 2000)
    }, 1500)
  }

  // 對外暴露添加到購物車的函數
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).addToStoryCart = addToCart
    }
  }, [cartItems])

  if (!isOpen) return null

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 購物車側邊欄 */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-amber-50 to-orange-50 z-50 shadow-2xl border-l-2 border-amber-300 overflow-y-auto">
        {/* 頂部標題 */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold font-serif flex items-center">
              <BookOpen className="h-6 w-6 mr-2" />
              我的故事收藏
            </h2>
            <MagicalButton variant="secondary" size="sm" onClick={onClose}>
              ✕
            </MagicalButton>
          </div>
          <p className="text-amber-100 text-sm">
            {totalItems} 個珍貴的故事在等待著您
          </p>
        </div>

        {/* 購物車內容 */}
        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">
                您的故事收藏還是空的
              </h3>
              <p className="text-amber-600 mb-6">
                去探索那些令人著迷的魔法故事吧！
              </p>
              <Link href="/products">
                <MagicalButton variant="primary" onClick={onClose}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  開始收藏故事
                </MagicalButton>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 購物車商品列表 */}
              {cartItems.map((item) => (
                <Card key={item.id} className="border-2 border-amber-200 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      {/* 商品圖片 */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute -top-2 -right-2 text-lg">
                          {item.storyEmoji}
                        </div>
                      </div>
                      
                      {/* 商品信息 */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-amber-900 text-sm mb-1 truncate">
                          {item.name}
                        </h4>
                        
                        {/* 情感化購買理由 */}
                        <div className="bg-amber-50 rounded-lg p-3 mb-3">
                          <p className="text-xs text-amber-700 font-medium mb-1">
                            💝 {item.storyReason}
                          </p>
                          <p className="text-xs text-amber-600 italic">
                            &ldquo;{item.emotionalConnection}&rdquo;
                          </p>
                        </div>
                        
                        {/* 價格和數量控制 */}
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-amber-800">
                            {formatPrice(item.price_in_cents)}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Separator className="my-6" />
              
              {/* 總計區域 */}
              <Card className="border-2 border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-lg font-bold text-amber-900 mb-4">
                    <span>故事收藏總價</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <MagicalButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    glowing={true}
                    breathing={true}
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <Crown className="h-5 w-5 mr-2 animate-spin" />
                        正在完成您的故事拼圖...
                      </>
                    ) : (
                      <>
                        <Gem className="h-5 w-5 mr-2" />
                        完成我的故事拼圖
                        <Sparkles className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </MagicalButton>
                  
                  <p className="text-xs text-amber-600 text-center mt-2">
                    讓這些美好的故事成為您生活的一部分
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      {/* 慶祝效果 */}
      <StarBurstEffect trigger={showCelebration} />
    </>
  )
}

// 全局添加到購物車的功能
export const addProductToStoryCart = (product: Product) => {
  if (typeof window !== 'undefined' && (window as any).addToStoryCart) {
    (window as any).addToStoryCart(product)
  }
}