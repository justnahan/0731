import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductStoryDetail } from '@/components/product-story-detail'

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`)
    if (!response.ok) return null
    
    const products: Product[] = await response.json()
    return products.find(product => product.id === parseInt(id)) || null
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  
  if (!product) {
    return {
      title: '商品未找到 | 故事驅動商店',
      description: '抱歉，您尋找的商品故事不存在'
    }
  }
  
  return {
    title: `${product.name}的故事 | 故事驅動商店`,
    description: `探索${product.name}背後的精彩故事，了解這個商品的獨特魅力`,
    openGraph: {
      title: `${product.name}的故事`,
      description: `探索${product.name}背後的精彩故事`,
      images: [product.image_url],
    }
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <ProductStoryDetail product={product} />
    </div>
  )
}