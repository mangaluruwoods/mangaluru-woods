"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDownCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Typewriter from "typewriter-effect"

// Image data for the carousel
const luxuryDoorImages = [
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    alt: "Luxury wooden door in modern interior",
    title: "transforming trees into masterpieces",
    subtitle: "Elegance in Every Detail",
  },
  {
    url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    alt: "Wooden interior with custom doors",
    title: "Custom Craftsmanship",
    subtitle: "Tailored to Your Vision",
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    alt: "Luxury wooden frame and door",
    title: "Premium Wooden Doors",
    subtitle: "Perfect Finishing Touches",
  },
  {
    url: "https://images.unsplash.com/photo-1600566752229-250ed79470f8",
    alt: "Modern wooden door design",
    title: "Modern Designs",
    subtitle: "Contemporary Elegance",
  },
]

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroElement = heroRef.current

      if (heroElement) {
        // Limit the opacity to not go below 0.3 to keep content somewhat visible
        const opacity = Math.max(1 - scrollY / (heroElement.offsetHeight * 1.2), 0.3)
        heroElement.style.opacity = opacity.toString()

        // Limit the transform to a reasonable maximum to prevent excessive movement
        const translateY = Math.min(scrollY * 0.2, 40)
        heroElement.style.transform = `translateY(${translateY}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const startSlideshow = () => {
      slideInterval.current = setInterval(() => {
        if (!isAnimating) {
          setCurrentSlide((prev) => (prev + 1) % luxuryDoorImages.length)
        }
      }, 5000)
    }

    startSlideshow()

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current)
      }
    }
  }, [isAnimating])

  const goToSlide = (index: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentSlide(index)

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 750)
  }

  const nextSlide = () => {
    if (isAnimating) return
    goToSlide((currentSlide + 1) % luxuryDoorImages.length)
  }

  const prevSlide = () => {
    if (isAnimating) return
    goToSlide((currentSlide - 1 + luxuryDoorImages.length) % luxuryDoorImages.length)
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {luxuryDoorImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0",
            )}
            style={{ backgroundImage: `url('${image.url}')` }}
            aria-hidden={index !== currentSlide}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-wood-darkest/70 via-wood-dark/50 to-background/90"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Carousel Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 z-20 text-white hover:text-teak-light transition-colors duration-300 bg-black/30 hover:bg-black/50 p-2 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 z-20 text-white hover:text-teak-light transition-colors duration-300 bg-black/30 hover:bg-black/50 p-2 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight size={30} />
      </button>

      {/* Content */}
      <div
        ref={heroRef}
        className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow mb-6 animate-fade-in">
          <span className="block mb-2">
            Mangaluru <span className="text-teak-light">Woods</span>
          </span>
          <div className="text-2xl md:text-3xl lg:text-4xl mt-4 h-16 flex justify-center items-center">
            <Typewriter
              options={{
                strings: [
                  "TRANSFORMING TREES INTO MASTERPIECES",
                  "PREMIUM CRAFTSMANSHIP",
                  "LUXURY WOODEN PRODUCTS",
                  "CUSTOM DESIGNS & FINISHES",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>
        </h1>

        <div
          className="h-0.5 w-24 bg-teak-light mx-auto mb-6 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        ></div>

        <p
          className="text-xl md:text-2xl text-white/90 text-shadow max-w-2xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          {luxuryDoorImages[currentSlide].subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-8 py-3 bg-teak-dark text-white rounded hover:bg-teak-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]"
          >
            Our Products
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-8 py-3 bg-transparent text-white border border-teak-light rounded hover:bg-teak-light/20 transition-all duration-300"
          >
            Contact Us
          </a>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-10 gap-2">
          {luxuryDoorImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentSlide ? "bg-teak-light w-8" : "bg-white/50 hover:bg-white/80",
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={scrollToAbout}
          className="text-white hover:text-teak-light transition-colors duration-300"
          aria-label="Scroll to About Section"
        >
          <ArrowDownCircle size={36} />
        </button>
      </div>
    </div>
  )
}

export default Hero

// import React, { useEffect, useRef } from "react";
// import { ArrowDownCircle } from "lucide-react";
// import { cn } from "@/lib/utils";

// const Hero = () => {
//   const heroRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const heroElement = heroRef.current;
      
//       if (heroElement) {
//         // Limit the opacity to not go below 0.3 to keep content somewhat visible
//         const opacity = Math.max(1 - (scrollY / (heroElement.offsetHeight * 1.2)), 0.3);
//         heroElement.style.opacity = opacity.toString();
        
//         // Limit the transform to a reasonable maximum to prevent excessive movement
//         const translateY = Math.min(scrollY * 0.2, 40);
//         heroElement.style.transform = `translateY(${translateY}px)`;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const scrollToAbout = () => {
//     const aboutSection = document.getElementById("about");
//     if (aboutSection) {
//       aboutSection.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   return (
//     <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background with gradient and pattern overlay */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86')] bg-cover bg-center bg-no-repeat"></div>
//         <div className="absolute inset-0 bg-gradient-to-b from-wood-darkest/60 via-wood-dark/40 to-background/90 wood-pattern"></div>
//       </div>

//       {/* Content */}
//       <div ref={heroRef} className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-center">
//         <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow mb-6 animate-fade-in">
//           Mangaluru <span className="text-teak-light">Woods</span>
//         </h1>
        
//         <div className="h-0.5 w-24 bg-teak-light mx-auto mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}></div>
        
//         <p className="text-xl md:text-2xl text-white/90 text-shadow max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '400ms' }}>
//           Transforming Trees Into Masterpieces
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
//           <a 
//             href="#products"
//             onClick={(e) => {
//               e.preventDefault();
//               document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
//             }}
//             className="px-8 py-3 bg-teak-dark text-white rounded hover:bg-teak-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]"
//           >
//             Our Products
//           </a>
//           <a 
//             href="#contact"
//             onClick={(e) => {
//               e.preventDefault();
//               document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
//             }}
//             className="px-8 py-3 bg-transparent text-white border border-teak-light rounded hover:bg-teak-light/20 transition-all duration-300"
//           >
//             Contact Us
//           </a>
//         </div>
//       </div>
      
//       {/* Scroll Indicator */}
//       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
//         <button 
//           onClick={scrollToAbout}
//           className="text-white hover:text-teak-light transition-colors duration-300"
//           aria-label="Scroll to About Section"
//         >
//           <ArrowDownCircle size={36} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Hero;
