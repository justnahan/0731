import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '我的收藏 | 故事驅動商店',
  description: '查看您收藏的故事和商品，重溫那些觸動您心的精彩時刻',
  keywords: '收藏, 我的故事, 書籤, 喜愛的商品',
  openGraph: {
    title: '我的收藏',
    description: '查看您收藏的故事和商品，重溫那些觸動您心的精彩時刻',
    type: 'website',
  }
}

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 頁面標題區 */}
      <header className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">我的故事書架</h1>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          這裡收藏著您喜愛的故事和商品，每一個都承載著特別的回憶。
        </p>
      </header>

      {/* 主要內容區 */}
      <main className="container mx-auto px-4 py-8">
        {/* 空狀態 */}
        <div className="text-center py-16">
          <div className="text-8xl mb-6">📚</div>
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">您的書架還是空的</h2>
          <p className="text-amber-700 mb-8 max-w-md mx-auto">
            開始探索我們的故事世界，收藏您喜愛的商品故事，它們會出現在這裡。
          </p>
          
          {/* 操作建議 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 border border-amber-200">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold text-amber-900 mb-2">探索故事</h3>
              <p className="text-sm text-amber-700">瀏覽不同類型的故事世界</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-amber-200">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="font-semibold text-amber-900 mb-2">收藏喜愛</h3>
              <p className="text-sm text-amber-700">點擊書籤圖標收藏商品</p>
            </div>
          </div>
        </div>

        {/* 收藏統計 */}
        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-amber-200">
              <div className="text-2xl font-bold text-amber-900">0</div>
              <div className="text-sm text-amber-700">收藏的故事</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-amber-200">
              <div className="text-2xl font-bold text-amber-900">0</div>
              <div className="text-sm text-amber-700">閱讀時間</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-amber-200">
              <div className="text-2xl font-bold text-amber-900">0</div>
              <div className="text-sm text-amber-700">最愛分類</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}