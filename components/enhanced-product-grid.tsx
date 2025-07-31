'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookCardWrapper, MagicalButton } from '@/components/magical-effects'
import { StorySearch } from '@/components/story-search'
import { Heart, Clock, Star, BookOpen, Sparkles, Filter } from 'lucide-react'

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

interface StoryTheme {
  category: string
  categoryId: string
  emoji: string
  readTime: string
  readTimeMinutes: number
  rating: number
  storyTitle: string
  storyExcerpt: string
  tags: string[]
  lengthCategory: string
}

// 增強的故事主題數據
const getStoryTheme = (id: number): StoryTheme => {
  const themes: StoryTheme[] = [
    { 
      category: '奇幻冒險', 
      categoryId: 'fantasy',
      emoji: '🏰', 
      readTime: '5分鐘', 
      readTimeMinutes: 5,
      lengthCategory: 'short',
      rating: 4.8, 
      storyTitle: '白雲城的傳說', 
      storyExcerpt: '在遙遠的白雲城中，有一雙能夠帶領旅人飛越山川的神奇運動鞋，每一步都承載著勇敢冒險者的夢想...',
      tags: ['魔法', '冒險', '勇氣', '飛翔', '夢想']
    },
    { 
      category: '現代時尚', 
      categoryId: 'modern',
      emoji: '🏙️', 
      readTime: '3分鐘', 
      readTimeMinutes: 3,
      lengthCategory: 'short',
      rating: 4.6, 
      storyTitle: '都市精英的秘密', 
      storyExcerpt: '在繁忙的都市生活中，一個簡約的錢包承載著成功人士的所有秘密，每一次開合都述說著商界傳奇...',
      tags: ['成功', '品味', '簡約', '都市', '精英']
    },
    { 
      category: '復古經典', 
      categoryId: 'vintage',
      emoji: '📻', 
      readTime: '4分鐘', 
      readTimeMinutes: 4,
      lengthCategory: 'short',
      rating: 4.9, 
      storyTitle: '黃金年代的回憶', 
      storyExcerpt: '這副太陽眼鏡曾見證過最美好的年代，在金色陽光下閃耀，如今依然散發著迷人的復古魅力...',
      tags: ['復古', '經典', '懷舊', '時光', '美好']
    },
    { 
      category: '溫暖治愈', 
      categoryId: 'healing',
      emoji: '☕', 
      readTime: '2分鐘', 
      readTimeMinutes: 2,
      lengthCategory: 'short',
      rating: 4.7, 
      storyTitle: '北歐咖啡館的溫暖', 
      storyExcerpt: '每個寒冷的早晨，這個陶瓷馬克杯都會為您帶來一天的溫暖和希望，簡潔的線條蘊含著北歐的生活哲學...',
      tags: ['溫暖', '治愈', '北歐', '咖啡', '生活']
    },
    { 
      category: '奇幻編織', 
      categoryId: 'fantasy',
      emoji: '🌙', 
      readTime: '6分鐘', 
      readTimeMinutes: 6,
      lengthCategory: 'short',
      rating: 4.5, 
      storyTitle: '織夢者的恩賜', 
      storyExcerpt: '山間的織夢者用月光和羊毛編織出這條圍巾，據說能夠抵禦最寒冷的風雪，每一針都融入了美好的夢境...',
      tags: ['月光', '編織', '夢境', '溫暖', '魔法']
    },
  ]
  return themes[(id - 1) % themes.length]
}

const formatPrice = (cents: number) => {
  return `NT$${(cents / 100).toLocaleString()}`
}

export function EnhancedProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 搜索和篩選狀態
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLength, setSelectedLength] = useState('')
  const [selectedSort, setSelectedSort] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')

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

  // 篩選和排序邏輯
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.map(product => ({ 
      product, 
      storyTheme: getStoryTheme(product.id) 
    }))

    // 分類篩選
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(({ storyTheme }) => 
        storyTheme.categoryId === selectedCategory
      )
    }

    // 長度篩選
    if (selectedLength) {
      filtered = filtered.filter(({ storyTheme }) => 
        storyTheme.lengthCategory === selectedLength
      )
    }

    // 搜索篩選
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(({ product, storyTheme }) => 
        product.name.toLowerCase().includes(query) ||
        storyTheme.storyTitle.toLowerCase().includes(query) ||
        storyTheme.storyExcerpt.toLowerCase().includes(query) ||
        storyTheme.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // 排序
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'rating':
          return b.storyTheme.rating - a.storyTheme.rating
        case 'reading_time':
          return a.storyTheme.readTimeMinutes - b.storyTheme.readTimeMinutes
        case 'newest':
          return b.product.id - a.product.id
        case 'popular':
        default:
          return b.storyTheme.rating * Math.random() - a.storyTheme.rating * Math.random()
      }
    })

    return filtered
  }, [products, selectedCategory, selectedLength, selectedSort, searchQuery])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="animate-spin text-4xl mb-4">📚</div>
          <p className="text-amber-700 font-serif">故事準備中，請稍候...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">😔</div>
        <p className="text-amber-700 font-serif">故事載入失敗，請稍後再試</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 搜索和篩選區域 */}
      <StorySearch
        onCategoryChange={setSelectedCategory}
        onLengthChange={setSelectedLength}
        onSortChange={setSelectedSort}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        selectedLength={selectedLength}
        selectedSort={selectedSort}
        searchQuery={searchQuery}
      />

      {/* 結果統計 */}
      <div className="flex items-center justify-between">
        <div className="text-amber-700 font-serif">
          找到 <span className="font-bold text-amber-900">{filteredAndSortedProducts.length}</span> 個精彩故事
        </div>
        
        {filteredAndSortedProducts.length > 0 && (
          <div className="text-sm text-amber-600 flex items-center">
            <Filter className="h-4 w-4 mr-1" />
            {selectedSort === 'popular' && '按熱門度排序'}
            {selectedSort === 'rating' && '按評分排序'}
            {selectedSort === 'reading_time' && '按閱讀時長排序'}
            {selectedSort === 'newest' && '按最新排序'}
          </div>
        )}
      </div>

      {/* 商品故事網格 */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-bold text-amber-900 mb-4">找不到相關故事</h3>
          <p className="text-amber-700 mb-8 max-w-md mx-auto font-serif">
            請嘗試調整搜索條件，或探索其他精彩的故事分類
          </p>
          <MagicalButton
            variant="secondary"
            onClick={() => {
              setSelectedCategory('all')
              setSelectedLength('')
              setSearchQuery('')
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            重置篩選條件
          </MagicalButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProducts.map(({ product, storyTheme }) => (
            <BookCardWrapper key={product.id} className="group">
              <Card className="relative overflow-hidden bg-white shadow-depth-2 hover:shadow-depth-3 transition-all duration-500 transform hover:-translate-y-2 texture-paper">
                {/* 魔法光暈效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-amber-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* 燙金裝飾邊框 */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg" style={{ padding: '2px' }}>
                  <div className="w-full h-full bg-white rounded-lg" />
                </div>

                {/* 故事分類標籤 */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-depth-1 gold-foil border-amber-400 px-3 py-1 text-sm font-semibold">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {storyTheme.emoji} {storyTheme.category}
                  </Badge>
                </div>

                {/* 收藏按鈕 */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-depth-1 hover:shadow-depth-2 transition-all duration-300 hover:scale-110 glow-amber">
                    <Heart className="h-4 w-4 text-amber-700 hover:text-red-500 transition-colors cursor-pointer" />
                  </div>
                </div>

                {/* 商品圖片 */}
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

                {/* 故事內容 */}
                <div className="p-6 parchment relative">
                  {/* 故事標題 */}
                  <h3 className="text-xl font-bold text-amber-900 mb-3 line-clamp-1 text-stroke">
                    {storyTheme.storyTitle}
                  </h3>

                  {/* 商品名稱 */}
                  <h4 className="text-lg font-semibold mb-3 gold-foil">
                    {product.name}
                  </h4>

                  {/* 故事摘要 */}
                  <p className="text-sm text-amber-800 mb-5 line-clamp-3 leading-relaxed font-serif">
                    {storyTheme.storyExcerpt}
                  </p>

                  {/* 故事標籤 */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {storyTheme.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 故事信息 */}
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

                  {/* 價格標籤 */}
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
          ))}
        </div>
      )}
    </div>
  )
}