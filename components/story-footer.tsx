import Link from 'next/link'
import { Book, Mail, Heart, Star, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export function StoryFooter() {
  return (
    <footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-amber-100 mt-16">
      {/* 主要內容區 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 品牌故事 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Book className="h-6 w-6 text-amber-400" />
              <h3 className="text-lg font-semibold">我們的故事</h3>
            </div>
            <p className="text-sm text-amber-200 leading-relaxed">
              故事驅動商店致力於將每個商品的背後故事呈現給您，
              讓購物不只是消費，更是一場充滿想像的冒險之旅。
            </p>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            </div>
          </div>

          {/* 故事分類 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">故事分類</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/stories" className="text-amber-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">🏰</span>
                  奇幻世界
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-amber-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">🏙️</span>
                  現代生活
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-amber-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">📻</span>
                  復古懷舊
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-amber-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">🚀</span>
                  科幻未來
                </Link>
              </li>
            </ul>
          </div>

          {/* 快速連結 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">快速導航</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-amber-200 hover:text-white transition-colors">
                  商品目錄
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-amber-200 hover:text-white transition-colors">
                  我的收藏
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-amber-200 hover:text-white transition-colors">
                  購物車
                </Link>
              </li>
              <li>
                <a href="#" className="text-amber-200 hover:text-white transition-colors">
                  聯絡我們
                </a>
              </li>
            </ul>
          </div>

          {/* 訂閱電子報 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              每週新故事
            </h3>
            <p className="text-sm text-amber-200">
              訂閱我們的電子報，第一時間收到最新的商品故事
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="您的電子郵件"
                className="bg-amber-800 border-amber-700 text-amber-100 placeholder-amber-300 focus:border-amber-500"
              />
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                訂閱故事
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-amber-800" />

        {/* 統計信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="flex items-center justify-center">
              <Book className="h-5 w-5 text-amber-400 mr-2" />
              <span className="text-xl font-bold">100+</span>
            </div>
            <p className="text-sm text-amber-200">精彩故事</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center">
              <Users className="h-5 w-5 text-amber-400 mr-2" />
              <span className="text-xl font-bold">1000+</span>
            </div>
            <p className="text-sm text-amber-200">故事旅人</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center">
              <Star className="h-5 w-5 text-amber-400 mr-2" />
              <span className="text-xl font-bold">4.8</span>
            </div>
            <p className="text-sm text-amber-200">平均評分</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-400 mr-2" />
              <span className="text-xl font-bold">24/7</span>
            </div>
            <p className="text-sm text-amber-200">故事陪伴</p>
          </div>
        </div>

        <Separator className="my-8 bg-amber-800" />

        {/* 版權信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-amber-200">
            © 2024 故事驅動商店. 所有故事都有版權保護.
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-amber-200">
            <span className="flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> for story lovers
            </span>
          </div>
        </div>

        {/* 書籍裝飾 */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-amber-400">
            <div className="w-8 h-1 bg-amber-600 rounded"></div>
            <Book className="h-6 w-6" />
            <div className="w-8 h-1 bg-amber-600 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}