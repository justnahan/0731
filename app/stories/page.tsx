import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MagicalButton } from '@/components/magical-effects'
import { Search, BookOpen, Sparkles, Star, Clock, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: '故事世界 | 故事驅動商店',
  description: '探索不同主題的故事世界，發現每個商品背後的精彩故事',
  keywords: '故事, 購物, 商品故事, 奇幻, 現代, 復古, 科幻',
  openGraph: {
    title: '故事世界',
    description: '探索不同主題的故事世界，發現每個商品背後的精彩故事',
    type: 'website',
  }
}

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 頁面標題區 */}
      <header className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-bold text-amber-900 mb-6 font-serif">
          🎭 故事世界
        </h1>
        <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          歡迎來到故事的國度，每個角落都藏著等待被發現的奇妙故事。
          在這裡，每個商品都有自己的靈魂，每個故事都能觸動您的心靈。
        </p>
        
        {/* 故事搜索入口 */}
        <Link href="/stories/search">
          <MagicalButton
            variant="primary"
            size="lg"
            glowing={true}
            breathing={true}
            className="px-12 py-4 text-lg"
          >
            <Search className="h-6 w-6 mr-3" />
            探索所有魔法故事
            <Sparkles className="h-6 w-6 ml-3" />
          </MagicalButton>
        </Link>
      </header>

      {/* 故事分類導航 */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center font-serif">
            按故事類型探索
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 奇幻故事 */}
            <Link href="/stories/search?category=奇幻">
              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl cursor-pointer group bg-gradient-to-br from-purple-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏰</div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">奇幻世界</h3>
                  <p className="text-purple-700 text-sm mb-4">魔法與冒險的故事</p>
                  <p className="text-xs text-purple-600 leading-relaxed">
                    充滿魔法道具和神秘物品的奇幻故事，帶您進入神奇的魔法世界
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-1 text-xs text-purple-500">
                    <Star className="h-3 w-3" />
                    <span>2 個精彩故事</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 現代故事 */}
            <Link href="/stories/search?category=現代">
              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl cursor-pointer group bg-gradient-to-br from-blue-50 to-sky-50">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏙️</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">現代生活</h3>
                  <p className="text-blue-700 text-sm mb-4">都市與日常的故事</p>
                  <p className="text-xs text-blue-600 leading-relaxed">
                    融入現代生活的時尚與實用商品故事，展現都市精英的生活品味
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-1 text-xs text-blue-500">
                    <Star className="h-3 w-3" />
                    <span>2 個精彩故事</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 復古故事 */}
            <Link href="/stories/search?category=復古">
              <Card className="border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl cursor-pointer group bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📻</div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">復古懷舊</h3>
                  <p className="text-amber-700 text-sm mb-4">經典與回憶的故事</p>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    承載歷史與回憶的經典物品故事，重溫那些美好的黃金歲月
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-1 text-xs text-amber-500">
                    <Star className="h-3 w-3" />
                    <span>1 個精彩故事</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 科幻故事 */}
            <Link href="/stories/search?category=科幻">
              <Card className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl cursor-pointer group bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">科幻未來</h3>
                  <p className="text-green-700 text-sm mb-4">科技與未來的故事</p>
                  <p className="text-xs text-green-600 leading-relaxed">
                    想像未來世界的創新科技產品故事，探索科技改變生活的可能
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-1 text-xs text-green-500">
                    <Clock className="h-3 w-3" />
                    <span>即將推出</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* 按情感分類 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center font-serif">
            按情感類型探索
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link href="/stories/search?emotion=冒險">
              <Card className="border-2 border-red-200 hover:border-red-400 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
                  <h4 className="font-bold text-red-800 text-sm">冒險刺激</h4>
                  <p className="text-xs text-red-600 mt-1">充滿挑戰與驚喜</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/stories/search?emotion=溫暖">
              <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🌸</div>
                  <h4 className="font-bold text-pink-800 text-sm">溫暖治癒</h4>
                  <p className="text-xs text-pink-600 mt-1">撫慰心靈的溫暖</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/stories/search?emotion=懷舊">
              <Card className="border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📷</div>
                  <h4 className="font-bold text-amber-800 text-sm">懷舊復古</h4>
                  <p className="text-xs text-amber-600 mt-1">重溫美好回憶</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/stories/search?emotion=成功">
              <Card className="border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👑</div>
                  <h4 className="font-bold text-yellow-800 text-sm">成功勵志</h4>
                  <p className="text-xs text-yellow-600 mt-1">追求卓越人生</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/stories/search?emotion=治癒">
              <Card className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🕊️</div>
                  <h4 className="font-bold text-green-800 text-sm">心靈治癒</h4>
                  <p className="text-xs text-green-600 mt-1">平靜內心世界</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* 特色功能介紹 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center font-serif">
            故事探索特色
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-900">
                  <Search className="h-5 w-5 mr-2" />
                  智能搜索
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 text-sm leading-relaxed">
                  通過關鍵詞、情感、類型等多種方式搜索故事，
                  精準找到最符合您心境的故事內容。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-sky-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Heart className="h-5 w-5 mr-2" />
                  情感分類
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 text-sm leading-relaxed">
                  按照情感標籤分類故事，無論您想要冒險刺激
                  還是溫暖治癒，都能找到合適的故事。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-900">
                  <Clock className="h-5 w-5 mr-2" />
                  時長選擇
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 text-sm leading-relaxed">
                  根據您的可用時間選擇故事長度，
                  從2分鐘的輕鬆小品到深度長篇應有盡有。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 行動呼籲 */}
        <section className="text-center bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-12 border-2 border-amber-300">
          <div className="text-6xl mb-6">📚✨</div>
          <h2 className="text-3xl font-bold text-amber-900 mb-4 font-serif">
            開始您的故事探索之旅
          </h2>
          <p className="text-lg text-amber-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            每個故事都是一次心靈的旅程，每件商品都承載著獨特的意義。
            讓我們一起發現那些能觸動您內心的魔法故事吧！
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stories/search">
              <MagicalButton variant="primary" size="lg" glowing={true}>
                <BookOpen className="h-5 w-5 mr-2" />
                開始探索故事
                <Sparkles className="h-5 w-5 ml-2" />
              </MagicalButton>
            </Link>
            
            <Link href="/products">
              <MagicalButton variant="secondary" size="lg">
                <Star className="h-5 w-5 mr-2" />
                瀏覽商品故事
              </MagicalButton>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}