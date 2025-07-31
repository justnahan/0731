import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '購物車 | 故事驅動商店',
  description: '查看您選中的商品，準備將這些精彩故事帶回家',
  keywords: '購物車, 結帳, 商品',
  openGraph: {
    title: '購物車',
    description: '查看您選中的商品，準備將這些精彩故事帶回家',
    type: 'website',
  }
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 頁面標題區 */}
      <header className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">我的故事收藏籃</h1>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          您已選擇的故事商品將在這裡等待，準備開始新的冒險旅程。
        </p>
      </header>

      {/* 主要內容區 */}
      <main className="container mx-auto px-4 py-8">
        {/* 空購物車狀態 */}
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">您的收藏籃還是空的</h2>
          <p className="text-amber-700 mb-8 max-w-md mx-auto">
            探索我們的商品故事，將心動的物品加入收藏籃，開始您的購物之旅。
          </p>
          
          {/* 購物建議 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 border border-amber-200">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="font-semibold text-amber-900 mb-2">閱讀故事</h3>
              <p className="text-sm text-amber-700">深入了解每個商品的背景故事</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-amber-200">
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="font-semibold text-amber-900 mb-2">加入收藏籃</h3>
              <p className="text-sm text-amber-700">選擇心動的商品加入購物車</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-amber-200">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-amber-900 mb-2">帶回家</h3>
              <p className="text-sm text-amber-700">將故事和商品一起帶回家</p>
            </div>
          </div>
        </div>

        {/* 購物車功能預覽 */}
        <section className="mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-900 mb-6 text-center">購物車功能</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium text-amber-900">即將提供：</h4>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    商品數量調整
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    價格自動計算
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    優惠券功能
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    快速結帳
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-amber-900">特色服務：</h4>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    故事包裝服務
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    個性化祝福卡
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    故事續集推薦
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    免費故事閱讀
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}