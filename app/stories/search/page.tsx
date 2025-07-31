import { Metadata } from 'next'
import { Suspense } from 'react'
import { StorySearchSystem } from '@/components/story-search-system'
import { Card, CardContent } from '@/components/ui/card'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: '故事搜索與分類 | 故事驅動商店',
  description: '探索數百個精心編織的魔法故事，按情感、類型、時長尋找最觸動您心靈的故事',
  keywords: '故事搜索, 分類, 情感, 奇幻, 現代, 復古',
  openGraph: {
    title: '故事搜索與分類',
    description: '探索數百個精心編織的魔法故事',
    type: 'website',
  }
}

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store' // 確保獲取最新數據
    })
    if (!response.ok) return []
    
    return response.json()
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-6">
          {/* 標題載入動畫 */}
          <div className="text-center space-y-4">
            <div className="h-10 bg-amber-200 rounded w-2/3 mx-auto"></div>
            <div className="h-6 bg-amber-100 rounded w-1/2 mx-auto"></div>
          </div>
          
          {/* 搜索控制台載入動畫 */}
          <Card className="border-2 border-amber-200">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 bg-amber-100 rounded"></div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-8 bg-amber-100 rounded w-24"></div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* 故事卡片載入動畫 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="border-2 border-amber-200">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-amber-100 rounded"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-6 bg-amber-100 rounded w-3/4"></div>
                      <div className="h-4 bg-amber-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-amber-100 rounded w-full"></div>
                  <div className="h-4 bg-amber-100 rounded w-2/3"></div>
                  <div className="h-8 bg-amber-100 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function StorySearchPage() {
  const products = await getProducts()

  // 處理商品選擇
  const handleProductSelect = (product: Product) => {
    redirect(`/products/${product.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Suspense fallback={<LoadingState />}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <StorySearchSystem 
              products={products}
              onProductSelect={handleProductSelect}
            />
          </div>
        </div>
      </Suspense>
    </div>
  )
}