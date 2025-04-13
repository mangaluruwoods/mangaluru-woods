"use client"

import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Product {
  id: number
  name: string
  description: string
  image: string
  category: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Premier Teak Door",
    description: "Handcrafted solid teak wood door with intricate carvings and premium finish.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=3387&auto=format&fit=crop",
    category: "Doors",
  },
  {
    id: 2,
    name: "Classic Door Frame",
    description: "Sturdy door frames made from seasoned teak wood for long-lasting durability.",
    image: "https://images.unsplash.com/photo-1580350183266-4314b06faff0?q=80&w=3087&auto=format&fit=crop",
    category: "Door Frames",
  },
  {
    id: 3,
    name: "Carved Entrance Door",
    description: "Make a statement with our exquisite hand-carved entrance doors.",
    image: "https://images.unsplash.com/photo-1628893881779-0a64975e0589?q=80&w=2070&auto=format&fit=crop",
    category: "Doors",
  },
  {
    id: 4,
    name: "Premium Timber",
    description: "High-quality timber supplies for all your construction and carpentry needs.",
    image: "https://images.unsplash.com/photo-1595515106864-077d30192c56?q=80&w=2073&auto=format&fit=crop",
    category: "Timber",
  },
  {
    id: 5,
    name: "Contemporary Sliding Door",
    description: "Modern sliding doors that combine style with functionality.",
    image: "https://images.unsplash.com/photo-1608666052881-a2257bd73dd8?q=80&w=2070&auto=format&fit=crop",
    category: "Doors",
  },
  {
    id: 6,
    name: "Custom Door Solutions",
    description: "Bespoke door designs tailored to your specific requirements and space.",
    image: "https://images.unsplash.com/photo-1510928486644-f1b75b578f20?q=80&w=2071&auto=format&fit=crop",
    category: "Doors",
  },
]

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<(HTMLDivElement | null)[]>([])

  const categories = ["All", ...new Set(products.map((product) => product.category))]

  useEffect(() => {
    if (activeCategory === "All") {
      setVisibleProducts(products)
    } else {
      setVisibleProducts(products.filter((product) => product.category === activeCategory))
    }
  }, [activeCategory])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
            if (entry.target instanceof HTMLElement) {
              entry.target.style.opacity = "1"
            }
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    const sectionNode = sectionRef.current
    const productNodes = [...productsRef.current]

    if (sectionNode) {
      sectionNode.style.opacity = "1"
      observer.observe(sectionNode)
    }

    productNodes.forEach((ref) => {
      if (ref) {
        ref.style.opacity = "1"
        observer.observe(ref)
      }
    })

    return () => {
      if (sectionNode) {
        observer.unobserve(sectionNode)
      }
      productNodes.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [visibleProducts])

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !productsRef.current.includes(el)) {
      productsRef.current[index] = el
    }
  }

  const handleProductClick = (id: number) => {
    setSelectedProduct(selectedProduct === id ? null : id)
  }

  return (
    <div id="products" className="py-24 relative">
      {/* Wood texture background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2033&auto=format&fit=crop')",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>

      <div ref={sectionRef} className="container mx-auto px-4 md:px-6 opacity-0 animate-fade-in relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-wood-dark mb-4">Our Premium Products</h2>
          <div className="h-0.5 w-24 bg-teak-medium mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-wood-medium max-w-2xl mx-auto">
            Explore our collection of handcrafted wooden masterpieces, built with precision and care.
          </p>
        </div>

        {/* Category filters - scrollable on mobile */}
        <div className="mb-12 overflow-x-auto pb-4 -mx-4 px-4 flex justify-start md:justify-center">
          <div className="flex gap-2 md:gap-4 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 md:px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap",
                  activeCategory === category
                    ? "bg-teak-medium text-white shadow-md scale-105"
                    : "bg-white/20 backdrop-blur-sm text-wood-medium hover:bg-teak-light/20 border border-teak-light/30",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => addToRefs(el, index)}
              onClick={() => handleProductClick(product.id)}
              className={cn(
                "bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden opacity-0 group transition-all duration-500 cursor-pointer",
                selectedProduct === product.id
                  ? "ring-4 ring-teak-light shadow-[0_0_15px_rgba(194,157,102,0.5)] scale-[1.02] z-10"
                  : "shadow-lg hover:shadow-xl hover:-translate-y-1",
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-700",
                    selectedProduct === product.id ? "scale-110" : "group-hover:scale-105",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-opacity duration-300",
                    selectedProduct === product.id ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                >
                  <span className="text-white text-sm font-medium px-3 py-1 bg-teak-dark/80 backdrop-blur-sm rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-wood-dark mb-2 group-hover:text-teak-dark transition-colors">
                  {product.name}
                </h3>
                <p className="text-wood-medium">{product.description}</p>
                <div
                  className={cn(
                    "mt-4 flex justify-between items-center",
                    selectedProduct === product.id ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-300",
                  )}
                >
                  <div className="flex space-x-2">
                    <span className="inline-block w-4 h-4 rounded-full bg-teak-dark"></span>
                    <span className="inline-block w-4 h-4 rounded-full bg-teak-medium"></span>
                    <span className="inline-block w-4 h-4 rounded-full bg-teak-light"></span>
                  </div>
                  <button
                    className="flex items-center gap-2 text-teak-medium hover:text-teak-dark transition-colors duration-300"
                    aria-label={`Learn more about ${product.name}`}
                  >
                    <span>View Details</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>

              {/* Shine effect overlay */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 pointer-events-none",
                  selectedProduct === product.id ? "animate-shine" : "group-hover:animate-shine",
                )}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
