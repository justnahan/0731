import { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductStoryGrid } from '@/components/product-story-grid'

export const metadata: Metadata = {
  title: '商品目錄 | 故事驅動商店',
  description: '瀏覽我們精選的商品故事集，每個商品都有獨特的故事等您發現',
  keywords: '商品, 故事, 購物, 產品目錄',
  openGraph: {
    title: '商品目錄',
    description: '瀏覽我們精選的商品故事集，每個商品都有獨特的故事等您發現',
    type: 'website',
  }
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-amber-700">
        <div className="text-2xl mb-4">📚</div>
        <p>故事準備中...</p>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 頁面標題區 */}
      <header className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">商品故事集</h1>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          每個商品都是一個故事的主角，點擊探索它們的奇妙旅程。
        </p>
      </header>

      {/* 主要內容區 */}
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingState />}>
          <ProductStoryGrid />
        </Suspense>
      </main>
    </div>
  )
}