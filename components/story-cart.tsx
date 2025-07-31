'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MagicalButton, TypewriterText, FloatingParticles } from '@/components/magical-effects'
import { 
  Heart, Trash2, Plus, Minus, 
  BookOpen, Star, Sparkles, Crown,
  Package, CreditCard, ArrowRight
} from 'lucide-react'

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

interface CartItem {
  product: Product
  quantity: number
  storyQuote: string
  storyCategory: string
  storyEmoji: string
  reasonForBuying: string
}

// 為每個商品生成故事化描述
const getProductStoryInfo = (id: number, _name: string) => {
  const storyInfos = [
    {
      quote: "在白雲城的傳說中，這雙鞋將帶您踏上如風般輕盈的旅程...",
      category: "奇幻冒險",
      emoji: "🏰",
      reason: "因為我渴望如風般自由的冒險"
    },
    {
      quote: "都市精英的秘密，隱藏在最簡約的細節裡...",
      category: "現代時尚",
      emoji: "🏙️",
      reason: "因為我欣賞簡約而不簡單的品味"
    },
    {
      quote: "黃金年代的回憶，每一個反射都承載著珍貴的時光...",
      category: "復古經典",
      emoji: "📻",
      reason: "因為我嚮往那個美好的黃金年代"
    },
    {
      quote: "北歐咖啡館的溫暖，每個清晨都是一個小小的儀式...",
      category: "生活美學",
      emoji: "☕",
      reason: "因為我珍惜日常中的溫暖時光"
    },
    {
      quote: "織夢者的恩賜，月光編織而成的溫暖擁抱...",
      category: "奇幻編織",
      emoji: "🌙",
      reason: "因為我需要這份溫暖的魔法陪伴"
    }
  ]
  
  return storyInfos[(id - 1) % storyInfos.length]
}

const formatPrice = (cents: number) => {
  return `NT$${(cents / 100).toLocaleString()}`
}

export function StoryCart() {
  // 模擬數據 - 實際應該從狀態管理或API獲取
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCheckoutStory, setShowCheckoutStory] = useState(false)

  useEffect(() => {
    // 模擬載入購物車數據
    const mockCartItems: CartItem[] = [
      {
        product: {
          id: 1,
          name: "經典白色運動鞋",
          price_in_cents: 298000,
          image_url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&auto=format&fit=crop"
        },
        quantity: 1,
        storyQuote: getProductStoryInfo(1, "經典白色運動鞋").quote,
        storyCategory: getProductStoryInfo(1, "經典白色運動鞋").category,
        storyEmoji: getProductStoryInfo(1, "經典白色運動鞋").emoji,
        reasonForBuying: getProductStoryInfo(1, "經典白色運動鞋").reason
      },
      {
        product: {
          id: 3,
          name: "復古圓框太陽眼鏡",
          price_in_cents: 89900,
          image_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&auto=format&fit=crop"
        },
        quantity: 2,
        storyQuote: getProductStoryInfo(3, "復古圓框太陽眼鏡").quote,
        storyCategory: getProductStoryInfo(3, "復古圓框太陽眼鏡").category,
        storyEmoji: getProductStoryInfo(3, "復古圓框太陽眼鏡").emoji,
        reasonForBuying: getProductStoryInfo(3, "復古圓框太陽眼鏡").reason
      }
    ]
    
    setTimeout(() => {
      setCartItems(mockCartItems)
      setIsLoading(false)
    }, 1000)
  }, [])

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.product.id !== productId))
    } else {
      setCartItems(items => 
        items.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const removeItem = (productId: number) => {
    setCartItems(items => items.filter(item => item.product.id !== productId))
  }

  const totalAmount = cartItems.reduce((sum, item) => 
    sum + (item.product.price_in_cents * item.quantity), 0
  )

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <TypewriterText 
            text="正在準備您的故事收藏..."
            speed={80}
            className="text-xl text-amber-700 font-serif"
          />
        </div>
      </div>
    )
  }

  // 故事化結帳流程
  if (showCheckoutStory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 relative overflow-hidden">
        <FloatingParticles count={30} />
        
        <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
          <Card className="parchment shadow-depth-3 border-2 border-amber-300">
            <div className="p-12">
              <div className="text-center mb-12">
                <Crown className="h-16 w-16 text-amber-600 mx-auto mb-6 animate-pulse" />
                <h1 className="text-4xl font-bold text-amber-900 mb-4 gold-foil">
                  完成您的故事拼圖
                </h1>
                <p className="text-lg text-amber-700 font-serif leading-relaxed">
                  您即將擁有 {totalItems} 個精彩故事，這些珍貴的回憶將很快抵達您身邊⋯
                </p>
              </div>

              {/* 故事化配送選擇 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
                  <Package className="h-6 w-6 mr-3" />
                  選擇故事到達您手中的方式
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-4">🚀</div>
                      <div>
                        <h3 className="font-bold text-amber-900">魔法快遞</h3>
                        <p className="text-sm text-amber-700">1-2個工作日</p>
                      </div>
                    </div>
                    <p className="text-amber-800 font-serif">
                      由飛天信使護送，讓您的故事以最快的速度抵達
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-4">🌟</div>
                      <div>
                        <h3 className="font-bold text-amber-900">精靈郵遞</h3>
                        <p className="text-sm text-amber-700">3-5個工作日</p>
                      </div>
                    </div>
                    <p className="text-amber-800 font-serif">
                      由森林精靈悉心照料，為您的故事增添更多魔法
                    </p>
                  </Card>
                </div>
              </section>

              {/* 故事化付款方式 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
                  <CreditCard className="h-6 w-6 mr-3" />
                  為這份美好故事付費
                </h2>
                
                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-amber-800 font-serif">故事收藏總價值</span>
                    <span className="text-2xl font-bold text-amber-900">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                  <p className="text-sm text-amber-700 font-serif mb-6">
                    您正在投資的不僅僅是商品，更是一段段珍貴的故事記憶
                  </p>
                  
                  <MagicalButton
                    variant="primary"
                    size="lg"
                    glowing={true}
                    breathing={true}
                    className="w-full"
                  >
                    <Sparkles className="h-5 w-5 mr-3" />
                    開始我的故事新篇章
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </MagicalButton>
                </div>
              </section>

              <div className="text-center">
                <MagicalButton
                  variant="secondary"
                  onClick={() => setShowCheckoutStory(false)}
                >
                  返回故事收藏籃
                </MagicalButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 relative">
      <div className="absolute inset-0 texture-paper opacity-5" />
      <FloatingParticles count={15} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative">
        {/* 故事化標題 */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-8 w-8 text-amber-600 mr-4 breathing" />
            <h1 className="text-4xl font-bold text-amber-900 gold-foil">
              我的故事收藏
            </h1>
            <Crown className="h-8 w-8 text-amber-600 ml-4 breathing" />
          </div>
          <p className="text-lg text-amber-700 font-serif max-w-2xl mx-auto leading-relaxed">
            這些是您精心挑選的故事珍藏，每一個都承載著獨特的回憶與情感
          </p>
        </header>

        {cartItems.length === 0 ? (
          // 空購物車狀態 - 保持原有設計
          <div className="text-center py-16">
            <div className="text-8xl mb-6">📚</div>
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">您的故事收藏籃還是空的</h2>
            <p className="text-amber-700 mb-8 max-w-md mx-auto font-serif">
              探索我們的魔法商店，將心動的故事加入收藏，開始您的奇幻之旅
            </p>
            <Link href="/products">
              <MagicalButton variant="primary" size="lg" glowing={true}>
                <BookOpen className="h-5 w-5 mr-2" />
                探索故事世界
                <Sparkles className="h-5 w-5 ml-2" />
              </MagicalButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左側：故事商品列表 */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.product.id} className="overflow-hidden shadow-depth-2 border-2 border-amber-200 texture-leather">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* 商品圖片 */}
                      <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <Badge className="absolute top-2 left-2 bg-amber-600">
                          {item.storyEmoji} {item.storyCategory}
                        </Badge>
                      </div>

                      {/* 故事信息 */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-amber-900 mb-2">
                            {item.product.name}
                          </h3>
                          <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-400">
                            <p className="text-amber-800 font-serif italic leading-relaxed">
                              &ldquo;{item.storyQuote}&rdquo;
                            </p>
                          </div>
                        </div>

                        {/* 購買理由 */}
                        <div className="flex items-start space-x-3">
                          <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-amber-700 font-serif">
                            {item.reasonForBuying}
                          </p>
                        </div>

                        {/* 數量和價格控制 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-amber-800 font-serif">數量：</span>
                            <div className="flex items-center space-x-2">
                              <MagicalButton
                                variant="secondary"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </MagicalButton>
                              <span className="w-12 text-center font-bold text-amber-900">
                                {item.quantity}
                              </span>
                              <MagicalButton
                                variant="secondary"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </MagicalButton>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="text-2xl font-bold text-amber-900">
                              {formatPrice(item.product.price_in_cents * item.quantity)}
                            </span>
                            <MagicalButton
                              variant="secondary"
                              size="sm"
                              onClick={() => removeItem(item.product.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </MagicalButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 右側：故事化結帳摘要 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 shadow-depth-3 border-2 border-amber-300 parchment">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center gold-foil">
                    故事收藏摘要
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-2 border-b border-amber-200">
                      <span className="text-amber-800 font-serif">故事數量</span>
                      <span className="font-bold text-amber-900">{totalItems} 個</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-amber-200">
                      <span className="text-amber-800 font-serif">故事總價值</span>
                      <span className="font-bold text-amber-900">
                        {formatPrice(totalAmount)}
                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg p-4 border border-amber-300">
                      <div className="flex items-center mb-2">
                        <Star className="h-5 w-5 text-amber-600 mr-2" />
                        <span className="font-bold text-amber-900">故事價值提醒</span>
                      </div>
                      <p className="text-sm text-amber-800 font-serif">
                        您收藏的不只是商品，更是珍貴的故事記憶和生活態度
                      </p>
                    </div>
                  </div>

                  <MagicalButton
                    variant="primary"
                    size="lg"
                    glowing={true}
                    breathing={true}
                    className="w-full mb-4"
                    onClick={() => setShowCheckoutStory(true)}
                  >
                    <Sparkles className="h-5 w-5 mr-3" />
                    完成我的故事拼圖
                    <Crown className="h-5 w-5 ml-3" />
                  </MagicalButton>

                  <div className="text-center">
                    <Link href="/products">
                      <MagicalButton variant="secondary" size="sm">
                        <BookOpen className="h-4 w-4 mr-2" />
                        繼續探索故事
                      </MagicalButton>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}