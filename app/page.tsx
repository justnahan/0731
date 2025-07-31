import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { ProductStoryGrid } from '@/components/product-story-grid'
import { MouseTrailEffect, FloatingParticles, MagicalButton, TypewriterText } from '@/components/magical-effects'
import { Book, ArrowRight, Star, Heart, Sparkles, Wand2, Crown, Gem } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* 滑鼠軌跡星塵效果 */}
      <MouseTrailEffect />
      
      {/* 英雄區域 - 全面升級 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 動態漸變背景 */}
        <div className="absolute inset-0 gradient-magic opacity-20" />
        
        {/* 漂浮魔法粒子 */}
        <FloatingParticles count={30} />
        
        {/* 紋理疊加 */}
        <div className="absolute inset-0 texture-paper opacity-30" />
        
        {/* 主要內容 */}
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          {/* 魔法圓圈裝飾 */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-amber-300/30 rounded-full animate-spin" />
          <div className="absolute top-20 right-20 w-16 h-16 border-2 border-yellow-400/40 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
          <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-amber-400/50 rounded-full animate-bounce" />
          
          {/* 主標題區域 - 立體效果 */}
          <div className="mb-12 relative">
            {/* 魔法光環 */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-amber-400 to-yellow-500 opacity-20 scale-150 animate-pulse" />
            
            <div className="relative">
              {/* 皇冠圖標 */}
              <div className="inline-flex items-center justify-center mb-8 relative">
                <Crown className="h-16 w-16 text-amber-600 breathing glow-amber-strong" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-6 w-6 text-yellow-500 animate-spin" />
                </div>
              </div>
              
              {/* 3D立體標題 */}
              <h1 className="text-5xl md:text-8xl font-bold text-amber-900 mb-4 text-3d gold-foil">
                故事驅動商店
              </h1>
              
              {/* 副標題打字機效果 */}
              <div className="text-xl md:text-2xl text-amber-700 mb-8 font-serif">
                <TypewriterText 
                  text="Story-Driven Commerce - 每個商品都是一個傳奇"
                  speed={80}
                  className="text-amber-600"
                />
              </div>
            </div>
          </div>

          {/* 描述文字 - 羊皮紙效果 */}
          <div className="parchment max-w-4xl mx-auto p-8 rounded-lg shadow-depth-2 mb-12 texture-leather">
            <p className="text-xl md:text-2xl text-amber-900 leading-relaxed font-serif">
              歡迎來到一個充滿魔法的世界，這裡每個商品都承載著
              <span className="gold-foil font-bold"> 獨特的故事靈魂</span>。
              <br className="hidden md:block" />
              不只是購物，更是一場穿越時空的
              <span className="gold-foil font-bold"> 奇幻冒險之旅</span>。
            </p>
          </div>

          {/* 魔法特色標籤 */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full shadow-depth-2 glow-amber transform hover:scale-110 transition-all duration-300">
              <div className="flex items-center">
                <Wand2 className="h-5 w-5 mr-2 animate-pulse" />
                <span className="font-semibold">沉浸式魔法體驗</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-full shadow-depth-2 glow-amber transform hover:scale-110 transition-all duration-300">
              <div className="flex items-center">
                <Book className="h-5 w-5 mr-2 animate-pulse" />
                <span className="font-semibold">原創故事世界</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-6 py-3 rounded-full shadow-depth-2 glow-amber transform hover:scale-110 transition-all duration-300">
              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-2 animate-pulse" />
                <span className="font-semibold">用心編織傳說</span>
              </div>
            </div>
          </div>

          {/* 魔法操作按鈕 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/stories">
              <MagicalButton
                variant="primary"
                size="lg"
                glowing={true}
                breathing={true}
                className="px-12 py-4 text-xl shadow-depth-3"
              >
                <Wand2 className="h-6 w-6 mr-3 animate-pulse" />
                開啟魔法故事之門
                <ArrowRight className="h-6 w-6 ml-3" />
              </MagicalButton>
            </Link>
            <Link href="/products">
              <MagicalButton
                variant="secondary"
                size="lg"
                className="px-12 py-4 text-xl shadow-depth-2"
              >
                <Gem className="h-6 w-6 mr-3" />
                探索珍寶商品
              </MagicalButton>
            </Link>
          </div>

          {/* 魔法統計數據 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="parchment p-6 rounded-lg shadow-depth-2 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-amber-900 mb-2 text-3d">100+</div>
              <div className="text-amber-700 font-serif">精彩魔法故事</div>
              <div className="mt-2">
                <Book className="h-6 w-6 text-amber-600 mx-auto animate-bounce" />
              </div>
            </div>
            <div className="parchment p-6 rounded-lg shadow-depth-2 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-amber-900 mb-2 text-3d">1000+</div>
              <div className="text-amber-700 font-serif">故事冒險旅人</div>
              <div className="mt-2">
                <Crown className="h-6 w-6 text-amber-600 mx-auto animate-pulse" />
              </div>
            </div>
            <div className="parchment p-6 rounded-lg shadow-depth-2 text-center transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-yellow-500 fill-current mr-2 animate-spin" />
                <span className="text-4xl font-bold text-amber-900 text-3d">4.8</span>
              </div>
              <div className="text-amber-700 font-serif">魔法體驗評分</div>
            </div>
          </div>
        </div>
        
        {/* 底部漸變過渡 */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* 故事分類預覽 - 3D書本造型 */}
      <section className="container mx-auto px-4 py-20 relative">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 texture-paper opacity-20" />
        
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6 text-3d">
            魔法故事分類
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto font-serif leading-relaxed">
            每個分類都是一個獨立的魔法世界，擁有獨特的世界觀和故事背景
            <br />
            <span className="gold-foil font-bold">等待您的探索與發現</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 奇幻世界 */}
          <div className="book-card group">
            <Card className="book-cover relative overflow-hidden shadow-depth-3 hover:shadow-depth-3 transition-all duration-700 border-2 border-amber-300 hover:border-amber-500 bg-gradient-to-b from-purple-50 to-purple-100 texture-leather">
              {/* 背景主題動畫 - 星空 */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping" />
                <div className="absolute top-8 right-6 w-1 h-1 bg-white rounded-full animate-pulse" />
                <div className="absolute bottom-10 left-8 w-1 h-1 bg-yellow-300 rounded-full animate-bounce" />
              </div>
              
              <div className="p-8 text-center relative z-10">
                <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-lg">🏰</div>
                <h3 className="text-2xl font-bold text-purple-900 mb-3 gold-foil">奇幻世界</h3>
                <p className="text-purple-700 text-sm mb-6 font-serif leading-relaxed">
                  龍族傳說、魔法學院、
                  <br />
                  古老咒語的神秘故事
                </p>
                <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-depth-1">
                  25+ 魔法故事
                </div>
              </div>
              
              {/* 閃爍魔法邊框 */}
              <div className="absolute inset-0 border-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg animate-pulse" />
            </Card>
          </div>

          {/* 現代生活 */}
          <div className="book-card group">
            <Card className="book-cover relative overflow-hidden shadow-depth-3 hover:shadow-depth-3 transition-all duration-700 border-2 border-amber-300 hover:border-amber-500 bg-gradient-to-b from-blue-50 to-blue-100 texture-leather">
              {/* 背景主題動畫 - 城市 */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-400 to-transparent" />
                <div className="absolute bottom-4 left-4 w-2 h-8 bg-gray-300 opacity-60" />
                <div className="absolute bottom-6 right-6 w-2 h-6 bg-gray-400 opacity-60" />
              </div>
              
              <div className="p-8 text-center relative z-10">
                <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-lg">🏙️</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-3 gold-foil">現代生活</h3>
                <p className="text-blue-700 text-sm mb-6 font-serif leading-relaxed">
                  都市傳說、咖啡館邂逅、
                  <br />
                  日常生活中的溫馨故事
                </p>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-depth-1">
                  30+ 都市故事
                </div>
              </div>
              
              <div className="absolute inset-0 border-2 border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg animate-pulse" />
            </Card>
          </div>

          {/* 復古懷舊 */}
          <div className="book-card group">
            <Card className="book-cover relative overflow-hidden shadow-depth-3 hover:shadow-depth-3 transition-all duration-700 border-2 border-amber-300 hover:border-amber-500 bg-gradient-to-b from-amber-50 to-amber-100 texture-leather">
              {/* 背景主題動畫 - 復古元素 */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <div className="absolute top-4 right-4 text-2xl animate-spin opacity-40">⚙️</div>
                <div className="absolute bottom-4 left-4 text-xl animate-bounce opacity-40">📻</div>
              </div>
              
              <div className="p-8 text-center relative z-10">
                <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-lg">📻</div>
                <h3 className="text-2xl font-bold text-amber-900 mb-3 gold-foil">復古懷舊</h3>
                <p className="text-amber-700 text-sm mb-6 font-serif leading-relaxed">
                  黃金年代、老唱片、
                  <br />
                  時光倒流的經典回憶
                </p>
                <div className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-depth-1">
                  20+ 懷舊故事
                </div>
              </div>
              
              <div className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg animate-pulse" />
            </Card>
          </div>

          {/* 科幻未來 */}
          <div className="book-card group">
            <Card className="book-cover relative overflow-hidden shadow-depth-3 hover:shadow-depth-3 transition-all duration-700 border-2 border-amber-300 hover:border-amber-500 bg-gradient-to-b from-cyan-50 to-cyan-100 texture-leather">
              {/* 背景主題動畫 - 科技元素 */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <div className="absolute top-2 left-2 w-8 h-1 bg-cyan-400 animate-pulse" />
                <div className="absolute top-6 left-4 w-4 h-1 bg-cyan-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-4 right-2 w-6 h-1 bg-cyan-500 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className="p-8 text-center relative z-10">
                <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-lg">🚀</div>
                <h3 className="text-2xl font-bold text-cyan-900 mb-3 gold-foil">科幻未來</h3>
                <p className="text-cyan-700 text-sm mb-6 font-serif leading-relaxed">
                  星際旅行、AI智慧、
                  <br />
                  科技革命的未來想像
                </p>
                <div className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-depth-1">
                  15+ 未來故事
                </div>
              </div>
              
              <div className="absolute inset-0 border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg animate-pulse" />
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/stories">
            <MagicalButton
              variant="primary"
              size="lg"
              glowing={true}
              className="px-10 py-4 text-lg shadow-depth-3"
            >
              <Book className="h-5 w-5 mr-2" />
              探索所有魔法世界
              <ArrowRight className="h-5 w-5 ml-2" />
            </MagicalButton>
          </Link>
        </div>
      </section>

      {/* 精選商品故事 - 瀑布流布局 */}
      <section className="relative py-20 bg-gradient-to-b from-white via-amber-50/30 to-white">
        {/* 背景紋理 */}
        <div className="absolute inset-0 texture-paper opacity-10" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6 text-3d">
              精選魔法珍寶
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto font-serif leading-relaxed">
              每個珍寶都經過魔法師精心挑選，承載著
              <span className="gold-foil font-bold"> 獨特的故事靈魂</span>
              <br />
              等待與有緣人相遇
            </p>
          </div>

          <Suspense fallback={<LoadingState />}>
            <ProductStoryGrid />
          </Suspense>

          <div className="text-center mt-12">
            <Link href="/products">
              <MagicalButton
                variant="primary"
                size="lg"
                glowing={true}
                className="px-10 py-4 text-lg shadow-depth-3"
              >
                <Gem className="h-5 w-5 mr-2" />
                發現更多魔法珍寶
                <ArrowRight className="h-5 w-5 ml-2" />
              </MagicalButton>
            </Link>
          </div>
        </div>
      </section>

      {/* 行動呼籲 - 魔法卷軸風格 */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        {/* 漂浮粒子效果 */}
        <FloatingParticles count={15} />
        
        <div className="relative">
          {/* 魔法卷軸背景 */}
          <Card className="relative overflow-hidden shadow-depth-3 border-none max-w-5xl mx-auto">
            {/* 漸變背景 */}
            <div className="absolute inset-0 gradient-magic" />
            
            {/* 羊皮紙紋理 */}
            <div className="absolute inset-0 parchment opacity-90" />
            
            {/* 古典裝飾邊框 */}
            <div className="absolute inset-4 border-4 border-amber-400/60 rounded-lg decorative-border" />
            
            <div className="relative z-10 p-16">
              {/* 魔法書圖標 */}
              <div className="relative mb-8">
                <Book className="h-20 w-20 mx-auto text-amber-600 breathing glow-amber-strong" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 text-yellow-500 animate-spin" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Crown className="h-6 w-6 text-amber-500 animate-bounce" />
                </div>
              </div>
              
              {/* 標題 */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 text-3d">
                開啟您的魔法傳奇
              </h2>
              
              {/* 描述 */}
              <p className="text-xl md:text-2xl text-amber-800 mb-10 max-w-3xl mx-auto leading-relaxed font-serif">
                加入我們的
                <span className="gold-foil font-bold"> 故事旅人聯盟</span>，
                發現更多令人著迷的魔法珍寶故事，
                <br className="hidden md:block" />
                讓每次探索都成為一次
                <span className="gold-foil font-bold"> 難忘的奇幻冒險</span>。
              </p>
              
              {/* 魔法按鈕 */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/stories">
                  <MagicalButton
                    variant="primary"
                    size="lg"
                    glowing={true}
                    breathing={true}
                    className="px-12 py-4 text-xl shadow-depth-3"
                  >
                    <Wand2 className="h-6 w-6 mr-3 animate-pulse" />
                    立即開始冒險
                    <Sparkles className="h-6 w-6 ml-3" />
                  </MagicalButton>
                </Link>
                <Link href="/collections">
                  <MagicalButton
                    variant="secondary"
                    size="lg"
                    className="px-12 py-4 text-xl shadow-depth-2"
                  >
                    <Heart className="h-6 w-6 mr-3" />
                    查看珍藏寶庫
                  </MagicalButton>
                </Link>
              </div>
              
              {/* 底部裝飾 */}
              <div className="mt-12 flex justify-center space-x-8 opacity-60">
                <Star className="h-6 w-6 text-amber-500 animate-spin" />
                <Gem className="h-6 w-6 text-amber-600 animate-bounce" />
                <Crown className="h-6 w-6 text-amber-500 animate-pulse" />
                <Sparkles className="h-6 w-6 text-amber-600 animate-spin" style={{ animationDirection: 'reverse' }} />
                <Star className="h-6 w-6 text-amber-500 animate-bounce" />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
