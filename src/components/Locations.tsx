"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Location {
  id: number
  city: string
  address: string
  phone: string
  hours: string
  image: string
  mapUrl: string
}

const locations: Location[] = [
  {
    id: 1,
    city: "Mangalore",
    address: "123 Coastal Road, Mangalore, Karnataka 575001",
    phone: "+91 9876543210",
    hours: "Mon-Sat: 9:00 AM - 7:00 PM",
    image: "/images/mangalore.jpeg",
    mapUrl: "https://maps.google.com",
  },
  {
    id: 2,
    city: "Bangalore",
    address: "456 MG Road, Bangalore, Karnataka 560001",
    phone: "+91 9876543211",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2071&auto=format&fit=crop",
    mapUrl: "https://maps.google.com",
  },
  {
    id: 3,
    city: "Hyderabad",
    address: "789 Jubilee Hills, Hyderabad, Telangana 500033",
    phone: "+91 9876543212",
    hours: "Mon-Sat: 9:30 AM - 7:30 PM",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
    mapUrl: "https://maps.google.com",
  },
  {
    id: 4,
    city: "Mumbai",
    address: "101 Marine Drive, Mumbai, Maharashtra 400020",
    phone: "+91 9876543213",
    hours: "Mon-Sat: 10:00 AM - 8:00 PM",
    image: "/images/mumbai.jpeg",
    mapUrl: "https://maps.google.com",
  },
]

const Locations = () => {
  const [activeLocation, setActiveLocation] = useState<number>(1)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

    // Store refs in variables to fix the React hooks dependency warning
    const currentSectionRef = sectionRef.current
    const currentCardsRef = [...cardsRef.current]

    if (currentSectionRef) {
      currentSectionRef.style.opacity = "1"
      observer.observe(currentSectionRef)
    }

    currentCardsRef.forEach((ref) => {
      if (ref) {
        ref.style.opacity = "1"
        observer.observe(ref)
      }
    })

    return () => {
      // Use the stored variables in the cleanup function
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef)
      }
      currentCardsRef.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el
    }
  }

  // Auto-rotate locations every 5 seconds if not hovering
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev % locations.length) + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <div id="locations" className="py-24 relative">
      {/* Wood texture background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1635361803815-9b05e335ae1b?q=80&w=2070&auto=format&fit=crop')",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Dark overlay with wood grain pattern */}
      <div className="absolute inset-0 bg-wood-darkest/90"></div>

      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="light-beam light-beam-1"></div>
        <div className="light-beam light-beam-2"></div>
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 md:px-6 relative z-10 opacity-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Available <span className="text-teak-light">Locations</span>
          </h2>
          <div className="h-0.5 w-24 bg-teak-light mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Experience our craftsmanship in person at any of our premium locations across India
          </p>
        </div>

        {/* Location tabs - improved mobile layout */}
        <div className="flex justify-center mb-8 md:mb-12">
          {/* Use a scrollable container with proper padding and width */}
          <div className="w-full max-w-full overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-2 md:gap-4 min-w-max mx-auto px-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setActiveLocation(location.id)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={cn(
                    "px-3 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-500 whitespace-nowrap relative overflow-hidden",
                    activeLocation === location.id
                      ? "bg-teak-medium text-white shadow-[0_0_15px_rgba(194,157,102,0.5)]"
                      : "bg-wood-dark/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-wood-dark/80",
                  )}
                >
                  <span className="relative z-10 text-sm md:text-base">{location.city}</span>
                  {activeLocation === location.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-teak-dark via-teak-medium to-teak-dark bg-[length:200%_100%] animate-shimmer"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {locations.map((location, index) => (
            <div
              key={location.id}
              ref={(el) => addToRefs(el, index)}
              className={cn(
                "transition-all duration-700 opacity-0",
                activeLocation === location.id ? "block" : "hidden",
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className="relative h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img
                  src={location.image || "/placeholder.svg"}
                  alt={`${location.city} showroom`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* City name overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white text-shadow-lg opacity-30">
                    {location.city}
                  </h3>
                </div>

                {/* Location details - Added back */}
                {/* <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-black/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-teak-light mb-2">
                    <MapPin size={16} className="flex-shrink-0" />
                    <span className="font-medium text-sm md:text-base truncate">{location.city} Showroom</span>
                  </div>
                  <p className="text-white/90 mb-2 text-xs md:text-sm truncate">{location.address}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <Phone size={14} className="flex-shrink-0" />
                      <span className="text-xs md:text-sm truncate">{location.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock size={14} className="flex-shrink-0" />
                      <span className="text-xs md:text-sm truncate">{location.hours}</span>
                    </div>
                  </div>
                </div> */}

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 animate-shine pointer-events-none"></div>
              </div>
            </div>
          ))}

          <div
            className="bg-wood-dark/60 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl h-72 sm:h-80 md:h-96 flex flex-col justify-between overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-white mb-4">
                Experience the <span className="text-teak-light">Difference</span>
              </h3>
              <p className="text-white/80 mb-4 md:mb-6 text-sm md:text-base">
                We're now available in 4 major cities across India! Experience the quality of our wooden doors and
                products in person.
              </p>

              {/* Improved city list for mobile */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={cn(
                      "flex items-center gap-2 transition-all duration-300",
                      activeLocation === location.id ? "text-teak-light font-medium" : "text-white/70",
                    )}
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full flex-shrink-0",
                        activeLocation === location.id ? "bg-teak-light" : "bg-white/50",
                      )}
                    ></div>
                    <span className="text-sm md:text-base truncate">{location.city}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group flex items-center gap-2 text-teak-light hover:text-teak-lightest transition-colors duration-300 mt-4 text-sm md:text-base"
            >
              <span>Schedule a Visit</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* Wood grain overlay */}
            <div
              className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1620236104164-d2e71398f8b8?q=80&w=2069&auto=format&fit=crop')",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Locations
