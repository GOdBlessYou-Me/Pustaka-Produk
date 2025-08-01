"use client"

import { useState, useEffect } from "react"
import { ChevronUp, Zap, Gift, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Function to generate random discount between 20-59%
const generateRandomDiscount = () => {
  return Math.floor(Math.random() * 40) + 20 // 20-59%
}

// Function to calculate discounted price based on original price and discount percentage
const calculateDiscountedPrice = (originalPrice: number, discountPercent: number) => {
  return Math.floor(originalPrice * (1 - discountPercent / 100))
}

// Function to shuffle array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Dummy product data dengan produk viral Indonesia
const baseProducts = [
  {
    id: 1,
    name: "Boardshort Cargo Pendek | Celana Pendek Pria Casual Pantai Surfing",
    image: "/images/1_produk.webp",
    platform: "Shopee",
    link: "https://s.shopee.co.id/4L8qaVdkwB",
  },
  {
    id: 2,
    name: "SPEEDS Meja Kurs Lipat Set Free Meja Lipat Kursi Lipat Outdoor Indoor Tas Folding Table Chair Portable Meja Camping Piknik",
    image: "/images/2_produk.webp",
    platform: "Shopee",
    link: "https://s.shopee.co.id/8zug9ZUDkB",
  },
  {
    id: 3,
    name: "Disai - Kaos Polo Shirt Pria Kaos Polos Kerah Pria Lengan Pendek Penyambungan Dan Kontras Formal Casual Polo",
    image: "/images/3_produk.webp",
    platform: "Shopee",
    link: "https://s.shopee.co.id/9pTn9AikYp",
  },
  {
    id: 4,
    name: "AKULA Jas Hujan Raincoat Pria Wanita Dewasa Terbaik Bahan PVC By AKULA Anti Rembes",
    image: "/images/4_produk.webp",
    platform: "Shopee",
    link: "https://s.shopee.co.id/5VKnzLKtvD",
  },
  {
    id: 5,
    name: "SHOULDER BAG bisa juga SLING BAG bahan kanvas pria/wanita by ERTIGA original",
    image: "/images/5_produk.webp",
    originalPrice: 159000,
    platform: "Shopee",
    link: "https://s.shopee.co.id/9pTn9P1hoI",
  },
  {
    id: 6,
    name: "kaos kaki pria dewasa pendek motif kaos kaki kerja kantoran murah GRATIS Ongkir",
    image: "/images/6_produk.webp",
    platform: "Shopee",
    link: "https://s.shopee.co.id/LchqAbvE7",
  },
  {
    id: 7,
    name: "[ PAKET 10 TISSUE ] FACIAL TISSUE NANO 2ply 180 sheets LEMBUT HALUS",
    image: "/images/7_produk.webp",
    platform: "Shopee",
    link: "https://s.shopee.co.id/2B4M1e2Gaw",
  },
  {
    id: 8,
    name: "100% Original Crocs Unisex Classic Clog Original Sandals GRATIS Ongkir",
    image: "/images/8_produk.webp",
    platform: "Shopee",
    link: "https://s.shopee.co.id/4ApQPRi4W0",
  },
]

// Apply random discount and shuffle the products
const products = shuffleArray(
  baseProducts.map((product) => {
    const discount = generateRandomDiscount()
    return {
      ...product,
      discount,
     
    }
  }),
)

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const newRotation = rotation + 1440 + Math.random() * 360
    setRotation(newRotation)

    setTimeout(() => {
      setIsSpinning(false)
    }, 3000)
  }

  // Percentage numbers around the wheel
  const percentages = ["10%", "25%", "35%", "50%", "15%", "40%", "30%", "45%"]

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-800">🎯 Roda Kejutan Diskon!</h3>
      <div className="relative">
        {/* Percentage numbers around the wheel */}
        {percentages.map((percentage, index) => {
          const angle = index * 45 - 90 // 8 positions around the circle
          const radius = 80 // Distance from center
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius

          return (
            <div
              key={index}
              className="absolute text-sm font-bold text-orange-600 bg-white px-2 py-1 rounded-full shadow-sm border border-orange-200"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {percentage}
            </div>
          )
        })}

        <div
          className={`w-32 h-32 rounded-full border-8 border-orange-400 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center cursor-pointer transition-transform duration-3000 ease-out ${isSpinning ? "animate-spin" : ""}`}
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={handleSpin}
        >
          <div className="text-white font-bold text-center">
            <Gift className="w-8 h-8 mx-auto mb-1" />
            <span className="text-xs">SPIN!</span>
          </div>
        </div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-orange-600"></div>
        </div>
      </div>
      <p className="text-sm text-gray-600 text-center">Putar untuk dapat diskon tambahan!</p>
    </div>
  )
}

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Shopee":
        return "bg-orange-500"
      case "Tokopedia":
        return "bg-green-500"
      case "TikTok Shop":
        return "bg-black"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md h-full">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className={`absolute top-2 left-2 ${getPlatformColor(product.platform)} text-white text-xs`}>
            {product.platform}
          </Badge>
          <Badge className="absolute top-2 right-2 bg-red-500 text-white font-bold">-{product.discount}%</Badge>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-tight mb-3">{product.name}</h3>

        

          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 mt-3"
            onClick={() => window.open(product.link, "_blank")}
          >
            Cek Sekarang 🔥
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-50"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  )
}

const AnimatedText = () => {
  const [currentText, setCurrentText] = useState(0)
  const texts = [
    "Diskon berubah setiap hari! ⚡",
    "Klik sekarang sebelum hilang! ⏰",
    "Stok terbatas, buruan! 🔥",
    "Harga spesial hari ini! 💎",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center py-4">
      <p className="text-orange-600 font-medium animate-pulse text-sm md:text-base">{texts[currentText]}</p>
    </div>
  )
}

export default function AffiliateLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">Promo Gado-Gado</span>
            </div>
            <div className="flex items-center space-x-1 text-orange-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Update Harian</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Dapatkan Diskonmu
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Hari Ini!</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Kamu nggak akan tahu diskon apa yang sedang menunggumu.
            <br className="hidden md:block" />
            Scroll dan temukan kejutanmu hari ini! 🎁
          </p>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Produk Terpilih</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Gift className="w-4 h-4 text-green-500" />
              <span>Diskon Hingga 50%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Text */}
      <AnimatedText />

      {/* Spin Wheel Gimmick */}
      <section className="container mx-auto px-4 py-8">
        <SpinWheel />
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">🔥 Produk Viral Hari Ini</h2>
          <p className="text-gray-600">Pilihan terbaik dengan harga termurah!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-500 to-red-500 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Masih belum dapat yang cocok?</h2>
            <p className="text-orange-100 text-lg">
              Klik tombol di bawah untuk lihat semua diskon terbaru dan temukan produk impianmu!
            </p>
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
              onClick={() => window.open("#all-discounts-link", "_blank")}
            >
              Lihat Semua Diskon 🔥
            </Button>
            <p className="text-orange-200 text-sm">*Update setiap hari dengan produk dan diskon terbaru</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">Promo Gado-Gado</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Promo Gado-Gado. Semua hak dilindungi.
            <br className="md:hidden" />
            Dapatkan diskon terbaik setiap hari!
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}
