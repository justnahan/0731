'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookCardWrapper, MagicalButton } from '@/components/magical-effects'
import { Heart, Clock, Star, BookOpen, Sparkles } from 'lucide-react'

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const storyTheme = getStoryTheme(product.id)
        
        return (
          <BookCardWrapper key={product.id} className="group">
            <Card className="relative overflow-hidden bg-white shadow-depth-2 hover:shadow-depth-3 transition-all duration-500 transform hover:-translate-y-2 texture-paper">
              {/* 魔法光暈效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-amber-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* 燙金裝飾邊框 */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg" style={{ padding: '2px' }}>
                <div className="w-full h-full bg-white rounded-lg" />
              </div>

              {/* 故事分類標籤 - 增強版 */}
              <div className="absolute top-4 left-4 z-20">
                <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-depth-1 gold-foil border-amber-400 px-3 py-1 text-sm font-semibold">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {storyTheme.emoji} {storyTheme.category}
                </Badge>
              </div>

              {/* 收藏按鈕 - 魔法版 */}
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-depth-1 hover:shadow-depth-2 transition-all duration-300 hover:scale-110 glow-amber">
                  <Heart className="h-4 w-4 text-amber-700 hover:text-red-500 transition-colors cursor-pointer" />
                </div>
              </div>

              {/* 商品圖片 - 增強版 */}
              <div className="relative h-52 overflow-hidden rounded-t-lg">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* 魔法覆蓋層 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-amber-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* 古典裝飾角落 */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* 故事內容 - 羊皮紙質感 */}
              <div className="p-6 parchment relative">
                {/* 故事標題 - 專業效果 */}
                <h3 className="text-xl font-bold text-amber-900 mb-3 line-clamp-1 text-stroke">
                  {storyTheme.storyTitle}
                </h3>

                {/* 商品名稱 - 燙金效果 */}
                <h4 className="text-lg font-semibold mb-3 gold-foil">
                  {product.name}
                </h4>

                {/* 故事摘要 - 優雅字體 */}
                <p className="text-sm text-amber-800 mb-5 line-clamp-3 leading-relaxed font-serif">
                  {storyTheme.storyExcerpt}
                </p>

                {/* 故事信息 - 增強版 */}
                <div className="flex items-center justify-between mb-5 text-xs">
                  <div className="flex items-center space-x-4 text-amber-600">
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3 mr-1" />
                      {storyTheme.readTime}
                    </div>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                      {storyTheme.rating}
                    </div>
                  </div>
                </div>

                {/* 價格標籤 - 古典書籤樣式 */}
                <div className="absolute -right-2 top-20 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 text-lg font-bold shadow-depth-2 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-amber-800" />
                  {formatPrice(product.price_in_cents)}
                </div>

                {/* 操作按鈕 */}
                <div className="flex justify-center mt-4">
                  <Link href={`/products/${product.id}`}>
                    <MagicalButton
                      variant="primary"
                      size="md"
                      glowing={true}
                      className="group-hover:breathing"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      開始閱讀故事
                      <Sparkles className="h-4 w-4 ml-2 group-hover:animate-spin" />
                    </MagicalButton>
                  </Link>
                </div>
              </div>

              {/* 古典書頁捲曲效果 */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 transform rotate-45 translate-x-4 translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-depth-1" />
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-gradient-to-br from-amber-200 to-amber-300 transform rotate-45 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            </Card>
          </BookCardWrapper>
        )
      })}
    </div>
  )
}