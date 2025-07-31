'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Heart, ShoppingCart, Star, Clock, BookOpen, Share2 } from 'lucide-react'

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

interface ProductStoryDetailProps {
  product: Product
}

// 為每個商品生成完整故事內容
const getFullStory = (id: number, name: string) => {
  const stories = [
    {
      category: '奇幻',
      emoji: '🏰',
      title: '白雲城的傳說',
      readTime: '5分鐘',
      rating: 4.8,
      chapters: [
        {
          title: '第一章：雲端的召喚',
          content: `在遙遠的白雲城中，住著一位年邁的鞋匠師傅。他用天空中最純淨的白雲和最堅韌的風編織出了這雙神奇的運動鞋。據說，穿上它的人能夠如風般輕盈，如雲般自由。\n\n這雙${name}承載著白雲城守護者的祝福，每一步都彷彿踏在雲朵之上。無論是在城市的石磚路上，還是在山間的羊腸小徑中，它都能為旅人提供最舒適的保護。`
        },
        {
          title: '第二章：旅程的開始',
          content: `傳說中，這雙鞋的第一位主人是一位勇敢的年輕冒險家。他穿著這雙鞋走遍了七大洲，攀登了最高的山峰，跨越了最深的峽谷。每一次的冒險都讓這雙鞋變得更加堅韌，更加有靈性。\n\n現在，它正在等待下一位有緣人，繼續書寫屬於它的冒險故事。也許，那個人就是您。`
        }
      ]
    },
    {
      category: '現代',
      emoji: '🏙️',
      title: '都市精英的秘密',
      readTime: '3分鐘',
      rating: 4.6,
      chapters: [
        {
          title: '第一章：簡約的力量',
          content: `在摩天大樓林立的都市中，成功往往隱藏在最簡約的細節裡。這個${name}不僅僅是一個錢包，它是都市精英的身份象徵，是品味與實用的完美結合。\n\n採用頂級意大利皮革，經過傳統手工工藝精心製作，每一針每一線都體現著匠人的執著與專業。`
        },
        {
          title: '第二章：成功的夥伴',
          content: `它曾陪伴過無數成功人士出席重要場合，見證了商業帝國的建立，記錄了夢想成真的時刻。在它的保護下，重要的卡片和現金都得到了最安全的守護。\n\n選擇它，就是選擇了一種生活態度 - 簡約而不簡單，低調而不失品味。`
        }
      ]
    },
    {
      category: '復古',
      emoji: '📻',
      title: '黃金年代的回憶',
      readTime: '4分鐘',
      rating: 4.9,
      chapters: [
        {
          title: '第一章：時光的見證',
          content: `這副${name}誕生於那個最美好的年代，當時的天空更藍，陽光更暖，人們的笑容更加純真。它見證了無數美好的時光，每一個反射都承載著珍貴的回憶。\n\n復古的圓框設計不僅是對經典的致敬，更是對永恆美學的追求。無論時代如何變遷，真正的美永遠不會過時。`
        },
        {
          title: '第二章：風格的傳承',
          content: `從好萊塢的黃金時代到現代的時尚街頭，這種經典的設計一直在不同的時代中閃耀著光芒。它不僅保護著佩戴者的眼睛，更為他們的造型增添了無可替代的魅力。\n\n戴上它，您就是自己人生故事的主角，散發著獨特的復古魅力。`
        }
      ]
    },
    {
      category: '現代',
      emoji: '🏙️',
      title: '北歐咖啡館的溫暖',
      readTime: '2分鐘',
      rating: 4.7,
      chapters: [
        {
          title: '第一章：溫暖的源泉',
          content: `在斯堪的納維亞的雪季裡，當外面飄著鵝毛大雪，室內的壁爐溫暖如春時，這個${name}就誕生了。北歐的陶藝師傅用最純淨的陶土和最溫暖的心意創造了它。\n\n簡潔的線條，溫潤的手感，每一個細節都體現著北歐設計的精髓 - 功能與美學的完美平衡。`
        },
        {
          title: '第二章：日常的儀式',
          content: `每個清晨，當您用它享受第一杯咖啡時，都是一個小小的儀式。蒸騰的熱氣帶走昨夜的疲憊，溫暖的觸感喚醒新的一天。\n\n它不僅僅是一個杯子，更是您與美好生活之間的橋樑，是日常中不可或缺的溫暖陪伴。`
        }
      ]
    },
    {
      category: '奇幻',
      emoji: '🏰',
      title: '織夢者的恩賜',
      readTime: '6分鐘',
      rating: 4.5,
      chapters: [
        {
          title: '第一章：月光下的編織',
          content: `在遙遠的山谷深處，生活著一位神秘的織夢者。她只在月圓之夜工作，用銀色的月光為線，將夢境編織成現實。這條${name}就是她的傑作之一。\n\n每一根羊毛都經過月光的洗禮，每一針編織都融入了美好的夢境。穿上它，彷彿能感受到月亮女神的溫柔擁抱。`
        },
        {
          title: '第二章：溫暖的魔法',
          content: `據說，這條圍巾擁有神奇的力量。在最寒冷的冬夜，它能為佩戴者帶來如春日般的溫暖；在最孤獨的時刻，它能讓人感受到被關愛的感覺。\n\n更重要的是，它會記住每一個擁有過它的人的美好回憶，將這些溫暖傳遞給下一位有緣人。`
        },
        {
          title: '第三章：永恆的陪伴',
          content: `這條圍巾見證了無數個冬天的來去，陪伴過不同的人度過人生的各個階段。它不僅僅是禦寒的工具，更是情感的載體，回憶的守護者。\n\n現在，它正在等待與您相遇，準備為您的故事增添新的篇章。`
        }
      ]
    }
  ]
  
  return stories[(id - 1) % stories.length]
}

const formatPrice = (cents: number) => {
  return `NT$${(cents / 100).toLocaleString()}`
}

export function ProductStoryDetail({ product }: ProductStoryDetailProps) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const story = getFullStory(product.id, product.name)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 返回按鈕 */}
      <div className="mb-6">
        <Link href="/products">
          <Button variant="ghost" className="text-amber-700 hover:text-amber-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回商品目錄
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：商品圖片和基本信息 */}
        <div>
          <Card className="overflow-hidden border-2 border-amber-200">
            {/* 商品圖片 */}
            <div className="relative h-96">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-amber-600 text-white">
                  {story.emoji} {story.category}
                </Badge>
              </div>
            </div>

            {/* 商品信息 */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-amber-900 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4 text-sm text-amber-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {story.readTime}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                  {story.rating}
                </div>
              </div>

              <div className="text-3xl font-bold text-amber-900 mb-6">
                {formatPrice(product.price_in_cents)}
              </div>

              {/* 操作按鈕 */}
              <div className="flex space-x-3">
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  加入收藏籃
                </Button>
                <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* 右側：故事內容 */}
        <div>
          <Card className="border-2 border-amber-200 h-fit">
            <div className="p-6">
              {/* 故事標題 */}
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-amber-600 mr-2" />
                <h2 className="text-xl font-semibold text-amber-900">
                  {story.title}
                </h2>
              </div>

              {/* 章節導航 */}
              <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                {story.chapters.map((chapter, index) => (
                  <Button
                    key={index}
                    variant={currentChapter === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentChapter(index)}
                    className={
                      currentChapter === index
                        ? "bg-amber-600 hover:bg-amber-700 text-white whitespace-nowrap"
                        : "border-amber-300 text-amber-700 hover:bg-amber-50 whitespace-nowrap"
                    }
                  >
                    第{index + 1}章
                  </Button>
                ))}
              </div>

              {/* 章節內容 */}
              <div className="bg-amber-50 rounded-lg p-6 min-h-[300px]">
                <h3 className="text-lg font-medium text-amber-900 mb-4">
                  {story.chapters[currentChapter].title}
                </h3>
                <div className="text-amber-800 leading-relaxed whitespace-pre-line">
                  {story.chapters[currentChapter].content}
                </div>
              </div>

              {/* 章節導航 */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                  disabled={currentChapter === 0}
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  上一章
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentChapter(Math.min(story.chapters.length - 1, currentChapter + 1))}
                  disabled={currentChapter === story.chapters.length - 1}
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  下一章
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 相關推薦 */}
      <section className="mt-12">
        <h3 className="text-2xl font-semibold text-amber-900 mb-6 text-center">
          您可能也會喜歡的故事
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-amber-700">更多精彩故事正在準備中...</p>
          <Link href="/products">
            <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white">
              探索更多故事
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}