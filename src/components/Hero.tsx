import React, { useEffect, useRef } from "react";
import { ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroElement = heroRef.current;
      
      if (heroElement) {
        // Limit the opacity to not go below 0.3 to keep content somewhat visible
        const opacity = Math.max(1 - (scrollY / (heroElement.offsetHeight * 1.2)), 0.3);
        heroElement.style.opacity = opacity.toString();
        
        // Limit the transform to a reasonable maximum to prevent excessive movement
        const translateY = Math.min(scrollY * 0.2, 40);
        heroElement.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient and pattern overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-wood-darkest/60 via-wood-dark/40 to-background/90 wood-pattern"></div>
      </div>

      {/* Content */}
      <div ref={heroRef} className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow mb-6 animate-fade-in">
          Mangaluru <span className="text-teak-light">Woods</span>
        </h1>
        
        <div className="h-0.5 w-24 bg-teak-light mx-auto mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}></div>
        
        <p className="text-xl md:text-2xl text-white/90 text-shadow max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '400ms' }}>
          Transforming Trees Into Masterpieces
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <a 
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-teak-dark text-white rounded hover:bg-teak-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]"
          >
            Our Products
          </a>
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-transparent text-white border border-teak-light rounded hover:bg-teak-light/20 transition-all duration-300"
          >
            Contact Us
          </a>
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
  );
};

export default Hero;
