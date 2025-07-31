'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MagicalButton, TypewriterText, ScrollProgress, StarBurstEffect, FloatingParticles, ImmersiveBackground, ParticleTrail, CircularProgress, FeatherWritingEffect } from '@/components/magical-effects'
import { StoryAudioSystem, useStoryAudio } from '@/components/story-audio-system'
import { StoryDrivenCart, addProductToStoryCart } from '@/components/story-driven-cart'
import { ArrowLeft, Heart, ShoppingCart, Star, Clock, BookOpen, Share2, Maximize, Minimize, Volume2, VolumeX, Sparkles, Crown, Gem } from 'lucide-react'

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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isTypewriterMode, setIsTypewriterMode] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showStarBurst, setShowStarBurst] = useState(false)
  const [isLoadingStory, setIsLoadingStory] = useState(false)
  const [particleTrailActive, setParticleTrailActive] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showAddToCartAnimation, setShowAddToCartAnimation] = useState(false)
  const story = getFullStory(product.id, product.name)
  const { playTyping, playPageTurn } = useStoryAudio()

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  useEffect(() => {
    // 計算閱讀進度
    const progress = ((currentChapter + 1) / story.chapters.length) * 100
    setReadingProgress(progress)
  }, [currentChapter, story.chapters.length])

  const handleChapterChange = (newChapter: number) => {
    setIsLoadingStory(true)
    setParticleTrailActive(true)
    
    // 播放翻頁音效
    if (soundEnabled) {
      playPageTurn()
    }
    
    setTimeout(() => {
      setCurrentChapter(newChapter)
      setIsTypewriterMode(true)
      setIsLoadingStory(false)
      
      // 激活粒子軌跡效果
      setTimeout(() => {
        setParticleTrailActive(false)
      }, 1000)
      
      // 打字機效果結束
      setTimeout(() => setIsTypewriterMode(false), 3000)
      
      // 完成故事時顯示星星爆炸效果
      if (newChapter === story.chapters.length - 1) {
        setShowStarBurst(true)
        setTimeout(() => setShowStarBurst(false), 2000)
      }
    }, 500)
  }

  // 情感化加入購物車處理
  const handleEmotionalAddToCart = () => {
    setShowAddToCartAnimation(true)
    setParticleTrailActive(true)
    
    // 播放特殊音效
    if (soundEnabled) {
      playTyping()
    }
    
    // 添加到購物車
    addProductToStoryCart(product)
    
    setTimeout(() => {
      setShowAddToCartAnimation(false)
      setParticleTrailActive(false)
      setIsCartOpen(true)
    }, 1500)
  }

  // 全屏沉浸式故事閱讀模式
  if (isFullscreen) {
    return (
      <ImmersiveBackground storyCategory={story.category}>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* 音頻系統 */}
          <StoryAudioSystem 
            isEnabled={soundEnabled}
            storyCategory={story.category}
            isReading={true}
            currentChapter={currentChapter}
          />
          
          {/* 粒子軌跡效果 */}
          <ParticleTrail 
            isActive={particleTrailActive}
            particleType={story.emoji}
          />
          
          <FloatingParticles count={30} />
        
        {/* 頂部控制欄 */}
        <div className="sticky top-0 z-10 bg-amber-900/80 backdrop-blur-sm border-b border-amber-600/30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <MagicalButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsFullscreen(false)}
                >
                  <Minimize className="h-4 w-4 mr-2" />
                  退出全屏
                </MagicalButton>
                
                <div className="text-amber-100 font-serif">
                  <Crown className="h-4 w-4 inline mr-2" />
                  {story.title}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MagicalButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  glowing={soundEnabled}
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </MagicalButton>
                
                {/* 環形進度指示器 */}
                <CircularProgress 
                  progress={readingProgress}
                  size={40}
                  className="text-amber-300"
                />
                
                <div className="text-amber-100 text-sm">
                  第 {currentChapter + 1} / {story.chapters.length} 章
                </div>
              </div>
            </div>
            
            {/* 魔法卷軸進度條 */}
            <div className="mt-2">
              <ScrollProgress progress={readingProgress} />
            </div>
          </div>
        </div>

        {/* 故事內容 */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="parchment rounded-lg p-12 shadow-depth-3 min-h-[80vh] relative">
            {/* 古典裝飾邊框 */}
            <div className="absolute inset-4 border-2 border-amber-400/30 rounded-lg decorative-border opacity-50" />
            
            <div className="relative z-10">
              {/* 章節標題 */}
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
                {story.chapters[currentChapter].title}
              </h2>
              
              {/* 故事載入動畫 */}
              {isLoadingStory && (
                <div className="flex items-center justify-center py-12">
                  <FeatherWritingEffect isWriting={true} className="text-4xl mr-4" />
                  <div className="text-xl text-amber-700 font-serif animate-pulse">
                    故事準備中...
                  </div>
                </div>
              )}
              
              {/* 故事內容 - 打字機效果 */}
              {!isLoadingStory && (
                <div className="text-lg md:text-xl text-amber-800 leading-relaxed font-serif space-y-6">
                  {isTypewriterMode ? (
                    <TypewriterText 
                      text={story.chapters[currentChapter].content}
                      speed={30}
                      className="whitespace-pre-line"
                    />
                  ) : (
                    <div className="whitespace-pre-line">
                      {story.chapters[currentChapter].content}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* 底部章節導航 */}
          <div className="flex justify-between items-center mt-8">
            <MagicalButton
              variant="secondary"
              onClick={() => handleChapterChange(Math.max(0, currentChapter - 1))}
              disabled={currentChapter === 0}
            >
              上一章
            </MagicalButton>
            
            {/* 章節選擇 */}
            <div className="flex space-x-2">
              {story.chapters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleChapterChange(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentChapter 
                      ? 'bg-amber-400 glow-amber' 
                      : index < currentChapter 
                        ? 'bg-amber-600' 
                        : 'bg-amber-200'
                  }`}
                />
              ))}
            </div>
            
            <MagicalButton
              variant="secondary"
              onClick={() => handleChapterChange(Math.min(story.chapters.length - 1, currentChapter + 1))}
              disabled={currentChapter === story.chapters.length - 1}
            >
              下一章
            </MagicalButton>
          </div>
        </div>
        
          {/* 星星爆炸效果 */}
          <StarBurstEffect trigger={showStarBurst} />
        </div>
      </ImmersiveBackground>
    )
  }

  return (
    <div className="relative">
      {/* 背景效果 */}
      <div className="absolute inset-0 texture-paper opacity-5" />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative">
        {/* 返回按鈕 */}
        <div className="mb-8">
          <Link href="/products">
            <MagicalButton variant="secondary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回魔法商店
            </MagicalButton>
          </Link>
        </div>

        {/* 進度指示 */}
        <div className="mb-6">
          <ScrollProgress progress={readingProgress} className="max-w-md mx-auto" />
          <p className="text-center text-amber-700 mt-2 font-serif">
            故事進度 {Math.round(readingProgress)}%
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左側：商品展示 - 增強版 */}
          <div className="space-y-6">
            {/* 主要商品卡片 */}
            <Card className="overflow-hidden shadow-depth-3 border-2 border-amber-300 texture-leather">
              {/* 商品圖片 - 魔法增強 */}
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                {/* 魔法覆蓋層 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-amber-200/20" />
                
                {/* 故事分類標籤 */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-depth-1 px-4 py-2">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {story.emoji} {story.category}
                  </Badge>
                </div>
                
                {/* 全屏閱讀按鈕 */}
                <div className="absolute top-4 right-4">
                  <MagicalButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsFullscreen(true)}
                    glowing={true}
                  >
                    <Maximize className="h-4 w-4 mr-2" />
                    沉浸閱讀
                  </MagicalButton>
                </div>
              </div>

              {/* 商品信息 - 羊皮紙風格 */}
              <div className="p-8 parchment">
                <h1 className="text-3xl font-bold text-amber-900 mb-4 text-stroke">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-6 mb-6 text-amber-600">
                  <div className="flex items-center bg-amber-50 px-3 py-2 rounded-full">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="font-serif">{story.readTime}</span>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-full">
                    <Star className="h-4 w-4 mr-2 fill-current text-yellow-500" />
                    <span className="font-serif">{story.rating}</span>
                  </div>
                </div>

                {/* 價格標籤 - 古典書籤 */}
                <div className="relative mb-8">
                  <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 text-2xl font-bold shadow-depth-2 transform -rotate-2 inline-block">
                    {formatPrice(product.price_in_cents)}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-800" />
                  </div>
                </div>

                {/* 魔法操作按鈕 */}
                <div className="grid grid-cols-1 gap-4">
                  <MagicalButton
                    variant="primary"
                    size="lg"
                    glowing={!showAddToCartAnimation}
                    breathing={!showAddToCartAnimation}
                    className="w-full"
                    onClick={handleEmotionalAddToCart}
                    disabled={showAddToCartAnimation}
                  >
                  </MagicalButton>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <MagicalButton variant="secondary" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      收藏這份美好
                    </MagicalButton>
                    <MagicalButton variant="secondary" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      推薦給朋友
                    </MagicalButton>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 右側：故事閱讀區 - 魔法增強版 */}
          <div className="space-y-6">
            <Card className="shadow-depth-3 border-2 border-amber-300">
              <div className="p-8 parchment">
                {/* 故事標題 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 text-amber-600 mr-3 breathing" />
                    <h2 className="text-2xl font-bold text-amber-900 gold-foil">
                      {story.title}
                    </h2>
                  </div>
                  <MagicalButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsFullscreen(true)}
                  >
                    <Maximize className="h-4 w-4" />
                  </MagicalButton>
                </div>

                {/* 章節導航 - 魔法版 */}
                <div className="flex space-x-3 mb-8 overflow-x-auto pb-2">
                  {story.chapters.map((chapter, index) => (
                    <MagicalButton
                      key={index}
                      variant={currentChapter === index ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => handleChapterChange(index)}
                      glowing={currentChapter === index}
                      className="whitespace-nowrap"
                    >
                      第{index + 1}章
                      {index <= currentChapter && (
                        <Crown className="h-3 w-3 ml-2" />
                      )}
                    </MagicalButton>
                  ))}
                </div>

                {/* 章節內容 - 羊皮紙風格 */}
                <div className="parchment rounded-lg p-6 min-h-[400px] shadow-depth-1 relative">
                  {/* 古典裝飾 */}
                  <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-amber-400/40" />
                  <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-amber-400/40" />
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-amber-400/40" />
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-amber-400/40" />
                  
                  <h3 className="text-xl font-bold text-amber-900 mb-6 text-center text-stroke">
                    {story.chapters[currentChapter].title}
                  </h3>
                  
                  <div className="text-amber-800 leading-relaxed font-serif text-lg space-y-4">
                    {isTypewriterMode ? (
                      <TypewriterText 
                        text={story.chapters[currentChapter].content}
                        speed={50}
                        className="whitespace-pre-line"
                      />
                    ) : (
                      <div className="whitespace-pre-line">
                        {story.chapters[currentChapter].content}
                      </div>
                    )}
                  </div>
                </div>

                {/* 章節導航控制 */}
                <div className="flex justify-between items-center mt-8">
                  <MagicalButton
                    variant="secondary"
                    onClick={() => handleChapterChange(Math.max(0, currentChapter - 1))}
                    disabled={currentChapter === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    上一章
                  </MagicalButton>
                  
                  <div className="text-center">
                    <div className="text-amber-700 font-serif text-sm mb-2">
                      第 {currentChapter + 1} / {story.chapters.length} 章
                    </div>
                    <div className="flex space-x-1">
                      {story.chapters.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentChapter 
                              ? 'bg-amber-500 glow-amber' 
                              : index < currentChapter 
                                ? 'bg-amber-400' 
                                : 'bg-amber-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <MagicalButton
                    variant="secondary"
                    onClick={() => handleChapterChange(Math.min(story.chapters.length - 1, currentChapter + 1))}
                    disabled={currentChapter === story.chapters.length - 1}
                  >
                    下一章
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </MagicalButton>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 相關推薦 - 魔法版 */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-gradient">
              您可能也會喜歡的魔法故事
            </h3>
            <div className="flex justify-center space-x-4 opacity-60">
              <Star className="h-6 w-6 text-amber-500 animate-spin" />
              <Gem className="h-6 w-6 text-amber-600 animate-bounce" />
              <Crown className="h-6 w-6 text-amber-500 animate-pulse" />
              <Sparkles className="h-6 w-6 text-amber-600 animate-spin" style={{ animationDirection: 'reverse' }} />
            </div>
          </div>
          
          <Card className="parchment p-12 text-center shadow-depth-2">
            <div className="text-6xl mb-6">📚✨</div>
            <p className="text-xl text-amber-700 font-serif mb-6 leading-relaxed">
              更多令人著迷的魔法故事正在我們的魔法工坊中精心編織...
              <br />
              每一個故事都將帶您踏上全新的奇幻冒險之旅
            </p>
            <Link href="/products">
              <MagicalButton
                variant="primary"
                size="lg"
                glowing={true}
                className="px-10 py-4"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                探索更多魔法珍寶
                <Sparkles className="h-5 w-5 ml-2" />
              </MagicalButton>
            </Link>
          </Card>
        </section>
        
        {/* 星星爆炸效果 */}
        <StarBurstEffect trigger={showStarBurst} />
        
        {/* 粒子軌跡效果（用於加入購物車動畫） */}
        <ParticleTrail 
          isActive={particleTrailActive}
          particleType={story.emoji}
        />
        
        {/* 故事驅動購物車 */}
        <StoryDrivenCart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </div>
  )
}