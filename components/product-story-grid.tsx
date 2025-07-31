'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Clock, Star, BookOpen } from 'lucide-react'

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

// 為每個商品生成故事主題
const getStoryTheme = (id: number) => {
  const themes = [
    { category: '奇幻', emoji: '🏰', readTime: '5分鐘', rating: 4.8, storyTitle: '白雲城的傳說', storyExcerpt: '在遙遠的白雲城中，有一雙能夠帶領旅人飛越山川的神奇運動鞋...' },
    { category: '現代', emoji: '🏙️', readTime: '3分鐘', rating: 4.6, storyTitle: '都市精英的秘密', storyExcerpt: '在繁忙的都市生活中，一個簡約的錢包承載著成功人士的所有秘密...' },
    { category: '復古', emoji: '📻', readTime: '4分鐘', rating: 4.9, storyTitle: '黃金年代的回憶', storyExcerpt: '這副太陽眼鏡曾見證過最美好的年代，如今依然散發著迷人的光芒...' },
    { category: '現代', emoji: '🏙️', readTime: '2分鐘', rating: 4.7, storyTitle: '北歐咖啡館的溫暖', storyExcerpt: '每個寒冷的早晨，這個陶瓷馬克杯都會為您帶來一天的溫暖和希望...' },
    { category: '奇幻', emoji: '🏰', readTime: '6分鐘', rating: 4.5, storyTitle: '織夢者的恩賜', storyExcerpt: '山間的織夢者用月光和羊毛編織出這條圍巾，據說能夠抵禦最寒冷的風雪...' },
  ]
  return themes[(id - 1) % themes.length]
}

const formatPrice = (cents: number) => {
  return `NT$${(cents / 100).toLocaleString()}`
}

export function ProductStoryGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-4xl mb-4">📚</div>
        <p className="text-amber-700">故事準備中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">😔</div>
        <p className="text-amber-700">故事載入失敗，請稍後再試</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const storyTheme = getStoryTheme(product.id)
        
        return (
          <Card key={product.id} className="group relative overflow-hidden bg-white border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* 故事分類標籤 */}
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-amber-600 text-white hover:bg-amber-700">
                {storyTheme.emoji} {storyTheme.category}
              </Badge>
            </div>

            {/* 收藏按鈕 */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-amber-700 hover:text-red-500 transition-colors"
            >
              <Heart className="h-4 w-4" />
            </Button>

            {/* 商品圖片 */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* 故事內容 */}
            <div className="p-6">
              {/* 故事標題 */}
              <h3 className="text-lg font-semibold text-amber-900 mb-2 line-clamp-1">
                {storyTheme.storyTitle}
              </h3>

              {/* 商品名稱 */}
              <h4 className="text-md font-medium text-amber-800 mb-3">
                {product.name}
              </h4>

              {/* 故事摘要 */}
              <p className="text-sm text-amber-700 mb-4 line-clamp-2">
                {storyTheme.storyExcerpt}
              </p>

              {/* 故事信息 */}
              <div className="flex items-center space-x-4 mb-4 text-xs text-amber-600">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {storyTheme.readTime}
                </div>
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                  {storyTheme.rating}
                </div>
              </div>

              {/* 價格和操作 */}
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-amber-900">
                  {formatPrice(product.price_in_cents)}
                </div>
                <Link href={`/products/${product.id}`}>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    <BookOpen className="h-4 w-4 mr-2" />
                    閱讀故事
                  </Button>
                </Link>
              </div>
            </div>

            {/* 書頁效果 */}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-amber-100 transform rotate-45 translate-x-3 translate-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Card>
        )
      })}
    </div>
  )
}