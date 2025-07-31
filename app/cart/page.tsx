import { Metadata } from 'next'
import { StoryCart } from '@/components/story-cart'

export const metadata: Metadata = {
  title: '我的故事收藏 | 故事驅動商店',
  description: '查看您精心挑選的故事珍藏，每一個都承載著獨特的回憶與情感',
  keywords: '故事收藏, 購物車, 結帳, 魔法商品',
  openGraph: {
    title: '我的故事收藏',
    description: '查看您精心挑選的故事珍藏，每一個都承載著獨特的回憶與情感',
    type: 'website',
  }
}

export default function CartPage() {
  return <StoryCart />
}