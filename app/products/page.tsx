import { Metadata } from 'next'
import { Suspense } from 'react'
import { EnhancedProductGrid } from '@/components/enhanced-product-grid'

export const metadata: Metadata = {
  title: '故事世界 | 故事驅動商店',
  description: '探索我們精選的故事世界，每個商品都有獨特的故事等您發現。使用智能搜索找到最符合您心意的故事',
  keywords: '故事, 商品, 購物, 搜索, 分類, 奇幻, 現代, 復古, 治愈',
  openGraph: {
    title: '故事世界',
    description: '探索我們精選的故事世界，每個商品都有獨特的故事等您發現',
    type: 'website',
  }
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-amber-700">
        <div className="text-4xl mb-4 animate-bounce">📚</div>
        <p className="font-serif text-lg">故事世界準備中，請稍候...</p>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 頁面標題區 */}
      <header className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-4 gold-foil">
          ✨ 故事世界 ✨
        </h1>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto font-serif leading-relaxed">
          歡迎來到充滿魔法的故事世界！這裡的每個商品都承載著一個精彩的故事，
          使用智能搜索系統找到最打動您心靈的那個故事。
        </p>
      </header>

      {/* 主要內容區 */}
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingState />}>
          <EnhancedProductGrid />
        </Suspense>
      </main>
    </div>
  )
}