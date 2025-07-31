'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MagicalButton } from '@/components/magical-effects'
import { Search, Filter, Clock, Star, Sparkles, BookOpen } from 'lucide-react'

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

interface StoryInfo {
  id: number
  title: string
  category: string
  emotion: string
  readTime: string
  rating: number
  keywords: string[]
  description: string
  emoji: string
  mood: string
}

// 擴展的故事數據庫
const storyDatabase: StoryInfo[] = [
  {
    id: 1,
    title: '白雲城的傳說',
    category: '奇幻',
    emotion: '冒險',
    readTime: '5分鐘',
    rating: 4.8,
    keywords: ['魔法', '冒險', '勇氣', '友誼', '成長'],
    description: '一個關於勇氣與友誼的魔法冒險故事',
    emoji: '🏰',
    mood: 'adventurous'
  },
  {
    id: 2,
    title: '都市精英的秘密',
    category: '現代',
    emotion: '成功',
    readTime: '3分鐘',
    rating: 4.6,
    keywords: ['事業', '成功', '品味', '都市', '精英'],
    description: '探索現代都市中成功人士的內心世界',
    emoji: '🏙️',
    mood: 'sophisticated'
  },
  {
    id: 3,
    title: '黃金年代的回憶',
    category: '復古',
    emotion: '懷舊',
    readTime: '4分鐘',
    rating: 4.9,
    keywords: ['復古', '懷舊', '經典', '時光', '回憶'],
    description: '重溫那個美好年代的溫暖記憶',
    emoji: '📻',
    mood: 'nostalgic'
  },
  {
    id: 4,
    title: '北歐咖啡館的溫暖',
    category: '現代',
    emotion: '溫暖',
    readTime: '2分鐘',
    rating: 4.7,
    keywords: ['北歐', '咖啡', '溫暖', '簡約', '生活'],
    description: '感受北歐生活的簡約與溫馨',
    emoji: '☕',
    mood: 'cozy'
  },
  {
    id: 5,
    title: '織夢者的恩賜',
    category: '奇幻',
    emotion: '治癒',
    readTime: '6分鐘',
    rating: 4.5,
    keywords: ['治癒', '溫暖', '月光', '編織', '夢境'],
    description: '月光下編織的溫暖治癒故事',
    emoji: '🌙',
    mood: 'healing'
  }
]

// 情感分類
const emotionCategories = [
  { value: 'all', label: '全部情感', icon: '💫', color: 'bg-purple-100 text-purple-800' },
  { value: '冒險', label: '冒險刺激', icon: '⚡', color: 'bg-red-100 text-red-800' },
  { value: '溫暖', label: '溫暖治癒', icon: '🌸', color: 'bg-pink-100 text-pink-800' },
  { value: '懷舊', label: '懷舊復古', icon: '📷', color: 'bg-amber-100 text-amber-800' },
  { value: '成功', label: '成功勵志', icon: '👑', color: 'bg-yellow-100 text-yellow-800' },
  { value: '治癒', label: '心靈治癒', icon: '🕊️', color: 'bg-green-100 text-green-800' }
]

// 故事類型分類
const storyCategories = [
  { value: 'all', label: '全部類型', icon: '📚' },
  { value: '奇幻', label: '奇幻冒險', icon: '🏰' },
  { value: '現代', label: '現代都市', icon: '🏙️' },
  { value: '復古', label: '復古懷舊', icon: '📻' },
  { value: '科幻', label: '未來科幻', icon: '🚀' },
  { value: '浪漫', label: '浪漫愛情', icon: '💕' }
]

// 閱讀時長分類
const readTimeCategories = [
  { value: 'all', label: '全部時長', icon: '⏰' },
  { value: 'quick', label: '輕鬆短讀 (1-3分鐘)', icon: '⚡' },
  { value: 'medium', label: '午休故事 (3-5分鐘)', icon: '☕' },
  { value: 'long', label: '深度閱讀 (5分鐘以上)', icon: '📖' }
]

interface StorySearchSystemProps {
  products: Product[]
  onProductSelect?: (product: Product) => void
}

export function StorySearchSystem({ products, onProductSelect }: StorySearchSystemProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedReadTime, setSelectedReadTime] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  // 過濾和搜索邏輯
  const filteredStories = useMemo(() => {
    let filtered = storyDatabase

    // 搜索關鍵字過濾
    if (searchQuery) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // 情感分類過濾
    if (selectedEmotion !== 'all') {
      filtered = filtered.filter(story => story.emotion === selectedEmotion)
    }

    // 故事類型過濾
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(story => story.category === selectedCategory)
    }

    // 閱讀時長過濾
    if (selectedReadTime !== 'all') {
      filtered = filtered.filter(story => {
        const readTimeNum = parseInt(story.readTime)
        switch (selectedReadTime) {
          case 'quick': return readTimeNum <= 3
          case 'medium': return readTimeNum > 3 && readTimeNum <= 5
          case 'long': return readTimeNum > 5
          default: return true
        }
      })
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating
        case 'readTime': return parseInt(a.readTime) - parseInt(b.readTime)
        case 'name': return a.title.localeCompare(b.title)
        default: return 0
      }
    })

    return filtered
  }, [searchQuery, selectedEmotion, selectedCategory, selectedReadTime, sortBy])

  // 獲取對應的商品信息
  const getProductForStory = (storyId: number) => {
    return products.find(product => product.id === storyId)
  }

  return (
    <div className="space-y-6">
      {/* 搜索標題 */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-2 font-serif">
          🔍 尋找您的命中故事
        </h2>
        <p className="text-amber-700">
          探索數百個精心編織的魔法故事，找到最觸動您心靈的那一個
        </p>
      </div>

      {/* 搜索和過濾控制 */}
      <Card className="border-2 border-amber-300 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-900">
            <Search className="h-5 w-5 mr-2" />
            故事探索控制台
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="搜索故事標題、關鍵詞或描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-amber-300 focus:border-amber-500"
            />
          </div>

          {/* 分類標籤 */}
          <Tabs defaultValue="emotion" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="emotion">按情感分類</TabsTrigger>
              <TabsTrigger value="category">按故事類型</TabsTrigger>
              <TabsTrigger value="readtime">按閱讀時長</TabsTrigger>
            </TabsList>
            
            <TabsContent value="emotion" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {emotionCategories.map((emotion) => (
                  <Button
                    key={emotion.value}
                    variant={selectedEmotion === emotion.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedEmotion(emotion.value)}
                    className={`${selectedEmotion === emotion.value ? emotion.color : ''}`}
                  >
                    <span className="mr-2">{emotion.icon}</span>
                    {emotion.label}
                  </Button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="category" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {storyCategories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </Button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="readtime" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {readTimeCategories.map((timeRange) => (
                  <Button
                    key={timeRange.value}
                    variant={selectedReadTime === timeRange.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedReadTime(timeRange.value)}
                  >
                    <span className="mr-2">{timeRange.icon}</span>
                    {timeRange.label}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* 排序選項 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-700">排序方式：</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      評分最高
                    </div>
                  </SelectItem>
                  <SelectItem value="readTime">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      閱讀時間
                    </div>
                  </SelectItem>
                  <SelectItem value="name">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      故事名稱
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              找到 {filteredStories.length} 個故事
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 搜索結果 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => {
          const product = getProductForStory(story.id)
          if (!product) return null

          return (
            <Card 
              key={story.id} 
              className="border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg cursor-pointer group"
              onClick={() => onProductSelect?.(product)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{story.emoji}</span>
                    <div>
                      <CardTitle className="text-lg text-amber-900 group-hover:text-amber-700 transition-colors">
                        {story.title}
                      </CardTitle>
                      <p className="text-sm text-amber-600 font-medium">
                        {product.name}
                      </p>
                    </div>
                  </div>
                  
                  <Badge className={emotionCategories.find(e => e.value === story.emotion)?.color || 'bg-gray-100'}>
                    {story.emotion}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-amber-700 leading-relaxed">
                  {story.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-amber-600">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {story.readTime}
                    </div>
                    
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                      {story.rating}
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {story.category}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {story.keywords.slice(0, 3).map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="text-xs bg-amber-50 text-amber-700">
                      {keyword}
                    </Badge>
                  ))}
                  {story.keywords.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-amber-50 text-amber-700">
                      +{story.keywords.length - 3}
                    </Badge>
                  )}
                </div>
                
                <MagicalButton
                  variant="primary"
                  size="sm"
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation()
                    onProductSelect?.(product)
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  開始閱讀故事
                  <Sparkles className="h-4 w-4 ml-2" />
                </MagicalButton>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 沒有搜索結果 */}
      {filteredStories.length === 0 && (
        <Card className="border-2 border-amber-200">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-amber-800 mb-2">
              沒有找到符合條件的故事
            </h3>
            <p className="text-amber-600 mb-6">
              試試調整搜索條件，或者探索其他類型的魔法故事
            </p>
            <MagicalButton
              variant="secondary"
              onClick={() => {
                setSearchQuery('')
                setSelectedEmotion('all')
                setSelectedCategory('all')
                setSelectedReadTime('all')
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              重置搜索條件
            </MagicalButton>
          </CardContent>
        </Card>
      )}
    </div>
  )
}