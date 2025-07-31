import { Metadata } from 'next'
import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MagicalButton } from '@/components/magical-effects'
import Link from 'next/link'
import { CheckCircle, Clock, Truck, BookOpen, Heart, Star, Sparkles, Crown, Gem, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: '故事即將開始新篇章 | 故事驅動商店',
  description: '恭喜！您的故事即將開始新的章節。我們正在精心準備您的魔法商品。',
  openGraph: {
    title: '故事即將開始新篇章',
    description: '恭喜！您的故事即將開始新的章節',
  }
}

// 模擬訂單數據
const mockOrder = {
  id: 'STORY-2024-001',
  date: new Date().toLocaleDateString('zh-TW'),
  status: 'confirmed',
  items: [
    {
      id: 1,
      name: '經典白色運動鞋',
      storyTitle: '白雲城的傳說',
      emoji: '🏰',
      category: '奇幻',
      price: 2980,
      quantity: 1,
      nextChapter: '第三章：新的旅程'
    }
  ],
  shipping: {
    method: '魔法快遞',
    estimatedDays: '2-3',
    trackingStory: '您的故事正在魔法工坊中精心包裝'
  },
  total: 2980
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-amber-200 rounded w-3/4"></div>
          <div className="h-32 bg-amber-100 rounded"></div>
          <div className="h-20 bg-amber-100 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Suspense fallback={<LoadingState />}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* 成功標題 */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-amber-900 mb-4 font-serif">
                🎉 恭喜！您的故事即將開始新的章節
              </h1>
              
              <p className="text-xl text-amber-700 mb-2">
                訂單編號：<strong>{mockOrder.id}</strong>
              </p>
              
              <p className="text-amber-600">
                訂單日期：{mockOrder.date}
              </p>
            </div>

            {/* 訂單詳情 */}
            <Card className="mb-8 border-2 border-amber-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
                <CardTitle className="flex items-center text-amber-900">
                  <BookOpen className="h-5 w-5 mr-2" />
                  您收藏的故事
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{item.emoji}</span>
                          <div>
                            <h3 className="font-bold text-amber-900">{item.name}</h3>
                            <p className="text-amber-700 font-serif italic">
                              &ldquo;{item.storyTitle}&rdquo;
                            </p>
                          </div>
                        </div>
                        
                        <Badge className="bg-amber-200 text-amber-800 mb-3">
                          {item.category} 故事
                        </Badge>
                        
                        {/* 故事續集預告 */}
                        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                          <CardContent className="p-4">
                            <div className="flex items-center mb-2">
                              <Star className="h-4 w-4 text-purple-600 mr-2" />
                              <span className="font-semibold text-purple-800 text-sm">
                                故事續集搶先看
                              </span>
                            </div>
                            <p className="text-purple-700 text-sm font-serif">
                              當您收到商品時，{item.nextChapter} 將會解鎖，
                              為您揭示這個魔法物品在您生活中的新冒險！
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="font-bold text-amber-900">
                          NT${item.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-amber-600">
                          數量：{item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Separator className="my-6" />
                
                <div className="flex justify-between items-center text-lg font-bold text-amber-900">
                  <span>總計</span>
                  <span>NT${mockOrder.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* 配送信息 */}
            <Card className="mb-8 border-2 border-blue-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-sky-100">
                <CardTitle className="flex items-center text-blue-900">
                  <Truck className="h-5 w-5 mr-2" />
                  故事配送旅程
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800 font-medium">配送方式</span>
                    <Badge className="bg-blue-200 text-blue-800">
                      {mockOrder.shipping.method}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800 font-medium">預計送達時間</span>
                    <span className="text-blue-700">
                      {mockOrder.shipping.estimatedDays} 個工作天
                    </span>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800 text-sm">
                        故事狀態更新
                      </span>
                    </div>
                    <p className="text-blue-700 text-sm font-serif">
                      {mockOrder.shipping.trackingStory}
                    </p>
                  </div>
                  
                  {/* 配送時間軸預告 */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-blue-800 mb-3">您的故事旅程時間軸</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm text-blue-700">
                          📦 故事已在魔法工坊完成包裝
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-300 rounded-full mr-3"></div>
                        <span className="text-sm text-blue-600">
                          🚚 故事開始向您的新家旅行
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">
                          🏠 故事成功抵達您的新家
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">
                          ✨ 新章節解鎖，故事繼續
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 後續行動 */}
            <Card className="mb-8 border-2 border-purple-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="flex items-center text-purple-900">
                  <Gift className="h-5 w-5 mr-2" />
                  故事還沒結束...
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-purple-700 font-serif leading-relaxed">
                    您的故事收藏之旅才剛剛開始！我們已經為您準備了更多精彩的續集和相關故事。
                    當您的商品送達時，別忘了回來解鎖專屬的後續章節。
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <MagicalButton
                      variant="primary"
                      className="w-full"
                      glowing={true}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      追蹤我的故事旅程
                    </MagicalButton>
                    
                    <Link href="/products">
                      <MagicalButton
                        variant="secondary"
                        className="w-full"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        探索更多故事
                      </MagicalButton>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 返回首頁 */}
            <div className="text-center">
              <Link href="/">
                <MagicalButton
                  variant="secondary"
                  size="lg"
                  className="px-12"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  返回魔法世界
                  <Gem className="h-5 w-5 ml-2" />
                </MagicalButton>
              </Link>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}