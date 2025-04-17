"use client"

import { cn } from "@/lib/utils"
import { Award, Clock, MapPin, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const staggeredRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const milestones = [
    {
      year: "2023",
      title: "A Story of Excellence",
      description: "Started as a small family workshop in Mangaluru",
    },
    {
      year: "2024",
      title: "Trade in Mangaluru",
      description: "Established strong local trade, gaining trust across coastal Karnataka",
    },
    {
      year: "2025",
      title: "Workshop Mumbai",
      description: "Expanded operations with a new workshop set up in Mumbai",
    },
  ];
  

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

    const sectionNode = sectionRef.current // Copy sectionRef.current to a local variable
    const staggeredNodes = [...staggeredRefs.current] // Copy staggeredRefs.current to a local variable

    if (sectionNode) {
      sectionNode.style.opacity = "1"
      observer.observe(sectionNode)
    }

    staggeredNodes.forEach((ref, index) => {
      if (ref) {
        ref.style.opacity = "1"
        ref.style.animationDelay = `${index * 200}ms`
        observer.observe(ref)
      }
    })

    return () => {
      if (sectionNode) {
        observer.unobserve(sectionNode)
      }
      staggeredNodes.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  useEffect(() => {
    // Auto-advance milestones every 3 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % milestones.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [milestones.length])

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !staggeredRefs.current.includes(el)) {
      staggeredRefs.current[index] = el
    }
  }

  return (
    <div id="about" className="py-24 relative">
      {/* Wood texture background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/aboutustree.webp')",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Overlay with wood grain pattern */}
      <div className="absolute inset-0 bg-secondary/90"></div>

      <div ref={sectionRef} className="container mx-auto px-4 md:px-6 opacity-1 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-wood-dark mb-4">
            Our Legacy of <span className="text-teak-medium">Craftsmanship</span>
          </h2>
          <div className="h-0.5 w-24 bg-teak-medium mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-wood-medium max-w-2xl mx-auto">
            For generations, we've been dedicated to transforming the finest wood into elegant masterpieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-wood-dark/30 rounded-lg z-0 animate-pulse-slow"></div>
            <div
              className="absolute -bottom-4 -right-4 w-64 h-64 bg-teak-medium/30 rounded-lg z-0 animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Main image with wooden frame effect */}
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 border-[12px] border-wood-dark/80 rounded-lg z-20 pointer-events-none"></div>
              <img
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
                alt="Wood craftsman at work"
                className="w-full h-auto object-cover relative z-10"
              />

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 animate-shine-slow z-30 pointer-events-none"></div>
            </div>
          </div>

          <div className="space-y-8">
            <div
              ref={(el) => addToRefs(el, 0)}
              className="opacity-0 bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg border-l-4 border-teak-medium transform transition-all duration-500 hover:translate-x-2"
            >
              <h3 className="text-2xl font-bold text-wood-dark mb-2">A Story of Excellence</h3>
              <p className="text-wood-medium">
                Mangaluru Woods began as a small family workshop in the coastal town of Mangaluru. Today, we stand as
                one of the region's premier suppliers of high-quality doors, door frames, and premium timber.
              </p>
            </div>

            <div
              ref={(el) => addToRefs(el, 1)}
              className="opacity-0 bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg border-l-4 border-teak-dark transform transition-all duration-500 hover:translate-x-2"
            >
              <h3 className="text-2xl font-bold text-wood-dark mb-2">Our Commitment</h3>
              <p className="text-wood-medium">
                Every piece of wood that passes through our hands is treated with respect and transformed with expert
                craftsmanship. We believe in creating products that not only look beautiful but stand the test of time.
              </p>
            </div>

            <div
              ref={(el) => addToRefs(el, 2)}
              className="opacity-0 bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg border-l-4 border-teak-light transform transition-all duration-500 hover:translate-x-2"
            >
              <h3 className="text-2xl font-bold text-wood-dark mb-2">Sustainable Practices</h3>
              <p className="text-wood-medium">
                We're committed to responsible sourcing and sustainable practices. For every tree used in our products,
                we ensure new ones are planted to preserve our precious forests for future generations.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-8">
              <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                {milestones.map((milestone, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "px-4 py-2 rounded whitespace-nowrap transition-all duration-300",
                      activeIndex === index
                        ? "bg-teak-medium text-white"
                        : "bg-white/10 text-wood-medium hover:bg-white/20",
                    )}
                  >
                    {milestone.year}
                  </button>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg border-l-4 border-teak-medium">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-teak-light font-bold">{milestones[activeIndex].year}</span>
                  <div className="h-0.5 w-12 bg-teak-light"></div>
                  <h4 className="text-xl font-bold text-wood-dark">{milestones[activeIndex].title}</h4>
                </div>
                <p className="text-wood-medium">{milestones[activeIndex].description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            ref={(el) => addToRefs(el, 3)}
            className="relative bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-lg opacity-0 group overflow-hidden"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-wood-dark rounded-full group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-wood-dark text-center mb-2">3+ Years</h4>
            <p className="text-wood-medium text-center">
              Three years of experience crafting the finest wood products
            </p>

            {/* Wood grain overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1620236104164-d2e71398f8b8?q=80&w=2069&auto=format&fit=crop')",
                backgroundSize: "cover",
              }}
            ></div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teak-light/0 via-teak-light/30 to-teak-light/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
          </div>

          <div
            ref={(el) => addToRefs(el, 4)}
            className="relative bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-lg opacity-0 group overflow-hidden"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-teak-medium rounded-full group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-wood-dark text-center mb-2">1000+ Clients</h4>
            <p className="text-wood-medium text-center">Satisfied customers across homes and businesses</p>

            {/* Wood grain overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1620236104164-d2e71398f8b8?q=80&w=2069&auto=format&fit=crop')",
                backgroundSize: "cover",
              }}
            ></div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teak-light/0 via-teak-light/30 to-teak-light/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
          </div>

          <div
            ref={(el) => addToRefs(el, 5)}
            className="relative bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-lg opacity-0 group overflow-hidden"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-wood-dark rounded-full group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-wood-dark text-center mb-2">Premium Quality</h4>
            <p className="text-wood-medium text-center">Committed to excellence in every product</p>

            {/* Wood grain overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1620236104164-d2e71398f8b8?q=80&w=2069&auto=format&fit=crop')",
                backgroundSize: "cover",
              }}
            ></div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teak-light/0 via-teak-light/30 to-teak-light/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
          </div>

          <div
            ref={(el) => addToRefs(el, 6)}
            className="relative bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-lg opacity-0 group overflow-hidden"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-teak-medium rounded-full group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-wood-dark text-center mb-2">Multiple Locations</h4>
            <p className="text-wood-medium text-center">Serving Mangalore, Bangalore, Hyderabad, and Mumbai</p>

            {/* Wood grain overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1620236104164-d2e71398f8b8?q=80&w=2069&auto=format&fit=crop')",
                backgroundSize: "cover",
              }}
            ></div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teak-light/0 via-teak-light/30 to-teak-light/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
