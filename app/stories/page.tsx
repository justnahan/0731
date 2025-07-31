import { Metadata } from 'next'

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
      <header className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">故事世界</h1>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          歡迎來到故事的國度，每個角落都藏著等待被發現的奇妙故事。
          選擇你喜愛的故事類型，開始一段獨特的購物冒險之旅。
        </p>
      </header>

      {/* 故事分類 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 奇幻故事 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-amber-200">
            <div className="text-center">
              <div className="text-4xl mb-4">🏰</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">奇幻世界</h3>
              <p className="text-amber-700 text-sm mb-4">魔法與冒險的故事</p>
              <p className="text-xs text-amber-600">充滿魔法道具和神秘物品的奇幻故事</p>
            </div>
          </div>

          {/* 現代故事 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-amber-200">
            <div className="text-center">
              <div className="text-4xl mb-4">🏙️</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">現代生活</h3>
              <p className="text-amber-700 text-sm mb-4">都市與日常的故事</p>
              <p className="text-xs text-amber-600">融入現代生活的時尚與實用商品故事</p>
            </div>
          </div>

          {/* 復古故事 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-amber-200">
            <div className="text-center">
              <div className="text-4xl mb-4">📻</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">復古懷舊</h3>
              <p className="text-amber-700 text-sm mb-4">經典與回憶的故事</p>
              <p className="text-xs text-amber-600">承載歷史與回憶的經典物品故事</p>
            </div>
          </div>

          {/* 科幻故事 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-amber-200">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">科幻未來</h3>
              <p className="text-amber-700 text-sm mb-4">科技與未來的故事</p>
              <p className="text-xs text-amber-600">想像未來世界的創新科技產品故事</p>
            </div>
          </div>
        </div>

        {/* 推薦故事 */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-amber-900 mb-6 text-center">本週推薦故事</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-200">
            <div className="text-center">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">準備中的精彩故事</h3>
              <p className="text-amber-700 mb-6">
                我們正在精心準備更多引人入勝的故事，每個故事都會帶您進入一個全新的世界，
                並為您推薦最適合的商品。
              </p>
              <div className="text-sm text-amber-600">
                敬請期待，精彩故事即將上線...
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}