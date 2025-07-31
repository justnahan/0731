'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Book, ShoppingCart, Heart, Search, Home, Library } from 'lucide-react'
import { Input } from '@/components/ui/input'

const navigationItems = [
  { href: '/', label: '首頁', icon: Home, description: '回到故事起點' },
  { href: '/stories', label: '故事世界', icon: Library, description: '探索不同的故事類型' },
  { href: '/products', label: '商品目錄', icon: Book, description: '瀏覽所有商品故事' },
  { href: '/collections', label: '我的收藏', icon: Heart, description: '您珍藏的故事' },
  { href: '/cart', label: '購物車', icon: ShoppingCart, description: '準備帶走的故事' },
]

export function StoryNavigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 shadow-lg border-b-4 border-amber-600">
      <div className="container mx-auto px-4">
        {/* 主導航列 */}
        <div className="flex items-center justify-between h-16">
          {/* Logo 區域 */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Book className="h-8 w-8 text-amber-100 group-hover:text-white transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full opacity-75 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-amber-100 group-hover:text-white transition-colors">
                故事驅動商店
              </div>
              <div className="text-xs text-amber-300">
                Story-Driven Commerce
              </div>
            </div>
          </Link>

          {/* 搜索區域 */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
              <Input
                type="text"
                placeholder="尋找故事..."
                className="pl-10 bg-amber-50 border-amber-300 text-amber-900 placeholder-amber-600 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          {/* 用戶區域 */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center text-amber-100 text-sm">
              <span>故事旅人</span>
            </div>
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">旅</span>
            </div>
          </div>
        </div>

        {/* 主要導航項目 */}
        <div className="flex items-center space-x-1 py-2 overflow-x-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "bg-amber-600 text-white shadow-md"
                    : "text-amber-200 hover:text-white hover:bg-amber-600/50"
                )}
                title={item.description}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                
                {/* 書脊效果 */}
                <div className={cn(
                  "absolute top-0 left-0 w-1 h-full bg-amber-400 rounded-l-lg transition-opacity",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />
              </Link>
            )
          })}
        </div>
      </div>

      {/* 移動端搜索 */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
          <Input
            type="text"
            placeholder="尋找故事..."
            className="pl-10 bg-amber-50 border-amber-300 text-amber-900 placeholder-amber-600 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      </div>
    </nav>
  )
}