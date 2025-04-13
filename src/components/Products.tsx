
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
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
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  useEffect(() => {
    if (activeCategory === "All") {
      setVisibleProducts(products);
    } else {
      setVisibleProducts(products.filter((product) => product.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only add the fade-in class to make visible, don't remove it
            entry.target.classList.add("animate-fade-in");
            entry.target.style.opacity = "1"; // Ensure opacity stays at 1
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      // Set initial opacity to 1 to ensure it's visible
      sectionRef.current.style.opacity = "1";
      observer.observe(sectionRef.current);
    }

    productsRef.current.forEach((ref) => {
      if (ref) {
        // Set initial opacity to 1 to ensure visibility
        ref.style.opacity = "1";
        observer.observe(ref);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      productsRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleProducts]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !productsRef.current.includes(el)) {
      productsRef.current[index] = el;
    }
  };

  return (
    <div id="products" className="py-24 bg-background relative">
      <div className="absolute inset-0 wood-pattern opacity-5"></div>
      <div ref={sectionRef} className="container mx-auto px-4 md:px-6 opacity-0 animate-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-wood-dark mb-4">
            Our Premium Products
          </h2>
          <div className="h-0.5 w-24 bg-teak-medium mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-wood-medium max-w-2xl mx-auto">
            Explore our collection of handcrafted wooden masterpieces, built with precision and care.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full transition-all duration-300",
                activeCategory === category
                  ? "bg-teak-medium text-white shadow-md"
                  : "bg-secondary text-wood-medium hover:bg-teak-light/20"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => addToRefs(el, index)}
              className="bg-white rounded-lg shadow-lg overflow-hidden opacity-0 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium px-3 py-1 bg-teak-dark/80 backdrop-blur-sm rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-wood-dark mb-2">{product.name}</h3>
                <p className="text-wood-medium">{product.description}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="flex items-center gap-2 text-teak-medium hover:text-teak-dark transition-colors duration-300"
                    aria-label={`Learn more about ${product.name}`}
                  >
                    <span>Learn More</span>
                    <Info size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
