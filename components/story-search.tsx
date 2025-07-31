'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { MagicalButton } from '@/components/magical-effects'
import { 
  Search, Filter, Clock, Star, Heart, Sparkles,
  BookOpen, Compass, Crown, Gem, Wand2, Castle
} from 'lucide-react'

// 故事分類定義
const storyCategories = [
  {
    id: 'all',
    name: '全部故事',
    emoji: '📚',
    icon: BookOpen,
    description: '探索所有精彩故事',
    color: 'bg-amber-500'
  },
  {
    id: 'fantasy',
    name: '奇幻冒險',
    emoji: '🏰',
    icon: Castle,
    description: '充滿魔法與奇蹟的世界',
    color: 'bg-purple-500'
  },
  {
    id: 'modern',
    name: '現代時尚',
    emoji: '🏙️',
    icon: Gem,
    description: '都市生活的優雅品味',
    color: 'bg-blue-500'
  },
  {
    id: 'vintage',
    name: '復古經典',
    emoji: '📻',
    icon: Crown,
    description: '黃金時代的美好回憶',
    color: 'bg-amber-600'
  },
  {
    id: 'healing',
    name: '溫暖治愈',
    emoji: '☕',
    icon: Heart,
    description: '給心靈帶來溫暖的故事',
    color: 'bg-green-500'
  },
  {
    id: 'romance',
    name: '浪漫愛情',
    emoji: '💕',
    icon: Sparkles,
    description: '關於愛與美好的故事',
    color: 'bg-pink-500'
  },
  {
    id: 'adventure',
    name: '冒險刺激',
    emoji: '⚔️',
    icon: Compass,
    description: '驚險刺激的探險之旅',
    color: 'bg-red-500'
  },
  {
    id: 'mystery',
    name: '神秘懸疑',
    emoji: '🔮',
    icon: Wand2,
    description: '充滿謎團與魔法的故事',
    color: 'bg-indigo-500'
  }
]

// 故事長度分類
const storyLengths = [
  { id: 'short', name: '輕鬆短讀', time: '5分鐘', emoji: '⚡' },
  { id: 'medium', name: '午休故事', time: '15分鐘', emoji: '📖' },
  { id: 'long', name: '深度閱讀', time: '30分鐘+', emoji: '📚' }
]

// 排序選項
const sortOptions = [
  { id: 'popular', name: '最受歡迎', icon: Star },
  { id: 'newest', name: '最新故事', icon: Sparkles },
  { id: 'rating', name: '評分最高', icon: Crown },
  { id: 'reading_time', name: '閱讀時長', icon: Clock }
]

interface StorySearchProps {
  onCategoryChange: (category: string) => void
  onLengthChange: (length: string) => void
  onSortChange: (sort: string) => void
  onSearchChange: (search: string) => void
  selectedCategory: string
  selectedLength: string
  selectedSort: string
  searchQuery: string
}

export function StorySearch({
  onCategoryChange,
  onLengthChange,
  onSortChange,
  onSearchChange,
  selectedCategory,
  selectedLength,
  selectedSort,
  searchQuery
}: StorySearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* 搜索欄 */}
      <Card className="p-6 shadow-depth-2 border-2 border-amber-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-600" />
            <Input
              placeholder="尋找您心中的故事..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 text-lg border-2 border-amber-300 focus:border-amber-500 bg-white"
            />
          </div>
          <MagicalButton
            variant="secondary"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="whitespace-nowrap"
          >
            <Filter className="h-5 w-5 mr-2" />
            篩選器
          </MagicalButton>
        </div>

        {/* 快速搜索建議 */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-amber-700 font-serif mr-2">熱門搜索：</span>
          {['魔法', '冒險', '愛情', '治愈', '復古', '神秘'].map((keyword) => (
            <button
              key={keyword}
              onClick={() => onSearchChange(keyword)}
              className="px-3 py-1 text-sm bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors"
            >
              {keyword}
            </button>
          ))}
        </div>
      </Card>

      {/* 故事分類 */}
      <Card className="p-6 shadow-depth-2 border-2 border-amber-200">
        <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
          <BookOpen className="h-6 w-6 mr-2" />
          故事分類
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {storyCategories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-300 text-left
                  ${isSelected 
                    ? 'border-amber-500 bg-amber-50 shadow-depth-1' 
                    : 'border-amber-200 bg-white hover:border-amber-300 hover:bg-amber-25'
                  }
                `}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{category.emoji}</span>
                  <Icon className={`h-5 w-5 ${isSelected ? 'text-amber-600' : 'text-amber-500'}`} />
                </div>
                <h4 className={`font-bold mb-1 ${isSelected ? 'text-amber-900' : 'text-amber-800'}`}>
                  {category.name}
                </h4>
                <p className="text-xs text-amber-600">
                  {category.description}
                </p>
              </button>
            )
          })}
        </div>
      </Card>

      {/* 進階篩選 */}
      {isFilterOpen && (
        <Card className="p-6 shadow-depth-2 border-2 border-amber-200 animate-fade-in">
          <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center">
            <Filter className="h-6 w-6 mr-2" />
            進階篩選
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 故事長度 */}
            <div>
              <h4 className="font-bold text-amber-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                閱讀時長
              </h4>
              <div className="space-y-2">
                {storyLengths.map((length) => (
                  <button
                    key={length.id}
                    onClick={() => onLengthChange(length.id)}
                    className={`
                      w-full p-3 rounded-lg border transition-all text-left
                      ${selectedLength === length.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-amber-200 bg-white hover:border-amber-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{length.emoji}</span>
                        <span className="font-bold text-amber-900">{length.name}</span>
                      </div>
                      <span className="text-sm text-amber-600">{length.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 排序方式 */}
            <div>
              <h4 className="font-bold text-amber-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                排序方式
              </h4>
              <div className="space-y-2">
                {sortOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.id}
                      onClick={() => onSortChange(option.id)}
                      className={`
                        w-full p-3 rounded-lg border transition-all text-left
                        ${selectedSort === option.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-amber-200 bg-white hover:border-amber-300'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <Icon className={`h-5 w-5 mr-3 ${
                          selectedSort === option.id ? 'text-amber-600' : 'text-amber-500'
                        }`} />
                        <span className="font-bold text-amber-900">{option.name}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 清空篩選 */}
          <div className="mt-6 text-center">
            <MagicalButton
              variant="secondary"
              onClick={() => {
                onCategoryChange('all')
                onLengthChange('')
                onSortChange('popular')
                onSearchChange('')
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              清空所有篩選
            </MagicalButton>
          </div>
        </Card>
      )}

      {/* 當前篩選狀態 */}
      <div className="flex flex-wrap gap-2">
        {selectedCategory !== 'all' && (
          <Badge className="bg-amber-100 text-amber-800 px-3 py-1">
            分類: {storyCategories.find(c => c.id === selectedCategory)?.name}
            <button 
              onClick={() => onCategoryChange('all')}
              className="ml-2 hover:text-amber-900"
            >
              ×
            </button>
          </Badge>
        )}
        
        {selectedLength && (
          <Badge className="bg-amber-100 text-amber-800 px-3 py-1">
            時長: {storyLengths.find(l => l.id === selectedLength)?.name}
            <button 
              onClick={() => onLengthChange('')}
              className="ml-2 hover:text-amber-900"
            >
              ×
            </button>
          </Badge>
        )}
        
        {searchQuery && (
          <Badge className="bg-amber-100 text-amber-800 px-3 py-1">
            搜索: &ldquo;{searchQuery}&rdquo;
            <button 
              onClick={() => onSearchChange('')}
              className="ml-2 hover:text-amber-900"
            >
              ×
            </button>
          </Badge>
        )}
      </div>
    </div>
  )
}

// 導出分類數據供其他組件使用
export { storyCategories, storyLengths, sortOptions }