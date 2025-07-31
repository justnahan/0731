import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductStoryGrid } from '@/components/product-story-grid'
import { Book, ArrowRight, Star, Heart, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: '故事驅動商店 | 每個商品都有故事',
  description: '歡迎來到故事驅動商店，這裡每個商品都有獨特的背景故事等您發現。開始您的故事購物之旅！',
  keywords: '故事商店, 創意購物, 商品故事, 沉浸式購物體驗',
  openGraph: {
    title: '故事驅動商店',
    description: '每個商品都有故事，每次購物都是冒險',
    type: 'website',
  }
}

function LoadingState() {
  return (
    <div className="text-center py-8">
      <div className="animate-spin text-4xl mb-4">📚</div>
      <p className="text-amber-700">精彩故事準備中...</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      {/* 英雄區域 */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 text-center">
          {/* 主標題 */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3">
                <Book className="h-12 w-12 text-amber-600" />
                <div className="text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-amber-900">
                    故事驅動商店
                  </h1>
                  <p className="text-lg text-amber-700 mt-2">
                    Story-Driven Commerce
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
              歡迎來到一個神奇的世界，這裡每個商品都是一個故事的主角。
              <br />
              不只是購物，更是一場充滿想像力的冒險之旅。
            </p>
          </div>

          {/* 特色標籤 */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Badge className="bg-amber-600 text-white hover:bg-amber-700 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              沉浸式體驗
            </Badge>
            <Badge className="bg-amber-600 text-white hover:bg-amber-700 px-4 py-2 text-sm">
              <Book className="h-4 w-4 mr-2" />
              原創故事
            </Badge>
            <Badge className="bg-amber-600 text-white hover:bg-amber-700 px-4 py-2 text-sm">
              <Heart className="h-4 w-4 mr-2" />
              用心策劃
            </Badge>
          </div>

          {/* 操作按鈕 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/stories">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg">
                <Book className="h-5 w-5 mr-2" />
                探索故事世界
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg">
                瀏覽商品故事
              </Button>
            </Link>
          </div>

          {/* 統計數據 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-900">100+</div>
              <div className="text-amber-700">精彩故事</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-900">1000+</div>
              <div className="text-amber-700">故事旅人</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-6 w-6 text-yellow-500 fill-current mr-1" />
                <span className="text-3xl font-bold text-amber-900">4.8</span>
              </div>
              <div className="text-amber-700">用戶評分</div>
            </div>
          </div>
        </div>
      </section>

      {/* 故事分類預覽 */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            故事分類
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            每個分類都有獨特的世界觀和故事背景，等待您的探索
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 bg-white">
            <div className="p-6 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏰</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">奇幻世界</h3>
              <p className="text-amber-700 text-sm mb-4">魔法與冒險的故事</p>
              <div className="text-xs text-amber-600">25+ 故事</div>
            </div>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 bg-white">
            <div className="p-6 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏙️</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">現代生活</h3>
              <p className="text-amber-700 text-sm mb-4">都市與日常的故事</p>
              <div className="text-xs text-amber-600">30+ 故事</div>
            </div>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 bg-white">
            <div className="p-6 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📻</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">復古懷舊</h3>
              <p className="text-amber-700 text-sm mb-4">經典與回憶的故事</p>
              <div className="text-xs text-amber-600">20+ 故事</div>
            </div>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 bg-white">
            <div className="p-6 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">科幻未來</h3>
              <p className="text-amber-700 text-sm mb-4">科技與未來的故事</p>
              <div className="text-xs text-amber-600">15+ 故事</div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link href="/stories">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              探索所有故事分類
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 精選商品故事 */}
      <section className="container mx-auto px-4 py-16 bg-white/50 rounded-t-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            精選商品故事
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            每個商品都經過精心挑選，配有獨特的故事背景
          </p>
        </div>

        <Suspense fallback={<LoadingState />}>
          <ProductStoryGrid />
        </Suspense>

        <div className="text-center mt-8">
          <Link href="/products">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              查看所有商品故事
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 行動呼籲 */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="bg-gradient-to-r from-amber-600 to-amber-700 text-white border-none shadow-2xl">
          <div className="p-12">
            <Book className="h-16 w-16 mx-auto mb-6 text-amber-100" />
            <h2 className="text-3xl font-bold mb-4">開始您的故事之旅</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              加入我們的故事旅人社群，發現更多令人著迷的商品故事，
              讓每次購物都成為一次難忘的冒險體驗。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stories">
                <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50">
                  立即開始探索
                </Button>
              </Link>
              <Link href="/collections">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-700">
                  查看我的收藏
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
