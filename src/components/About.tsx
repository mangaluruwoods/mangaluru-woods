
import React, { useEffect, useRef } from "react";
import { Clock, Award, Users, MapPin } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const staggeredRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
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
      observer.observe(sectionRef.current);
    }

    staggeredRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.opacity = "0";
        ref.style.animationDelay = `${index * 200}ms`;
        observer.observe(ref);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      staggeredRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !staggeredRefs.current.includes(el)) {
      staggeredRefs.current[index] = el;
    }
  };

  return (
    <div id="about" className="py-24 bg-secondary relative">
      <div className="absolute inset-0 wood-pattern opacity-10"></div>
      <div ref={sectionRef} className="container mx-auto px-4 md:px-6 opacity-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-wood-dark mb-4">
            Our Legacy of Craftsmanship
          </h2>
          <div className="h-0.5 w-24 bg-teak-medium mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-wood-medium max-w-2xl mx-auto">
            For generations, we've been dedicated to transforming the finest wood into elegant masterpieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-wood-dark rounded-lg z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-teak-medium rounded-lg z-0"></div>
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
                alt="Wood craftsman at work"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div ref={(el) => addToRefs(el, 0)} className="opacity-0">
              <h3 className="text-2xl font-bold text-wood-dark mb-2">A Story of Excellence</h3>
              <p className="text-wood-medium">
                Mangaluru Woods began as a small family workshop in the coastal town of Mangaluru. 
                Today, we stand as one of the region's premier suppliers of high-quality doors, 
                door frames, and premium timber.
              </p>
            </div>

            <div ref={(el) => addToRefs(el, 1)} className="opacity-0">
              <h3 className="text-2xl font-bold text-wood-dark mb-2">Our Commitment</h3>
              <p className="text-wood-medium">
                Every piece of wood that passes through our hands is treated with respect and 
                transformed with expert craftsmanship. We believe in creating products that 
                not only look beautiful but stand the test of time.
              </p>
            </div>

            <div ref={(el) => addToRefs(el, 2)} className="opacity-0">
              <h3 className="text-2xl font-bold text-wood-dark mb-2">Sustainable Practices</h3>
              <p className="text-wood-medium">
                We're committed to responsible sourcing and sustainable practices. For every 
                tree used in our products, we ensure new ones are planted to preserve our 
                precious forests for future generations.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            ref={(el) => addToRefs(el, 3)} 
            className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-lg opacity-0 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-wood-dark rounded-full">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-wood-dark text-center mb-2">30+ Years</h4>
            <p className="text-wood-medium text-center">
              Three decades of experience crafting the finest wood products
            </p>
          </div>

          <div 
            ref={(el) => addToRefs(el, 4)} 
            className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-lg opacity-0 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-teak-medium rounded-full">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-wood-dark text-center mb-2">1000+ Clients</h4>
            <p className="text-wood-medium text-center">
              Satisfied customers across homes and businesses
            </p>
          </div>

          <div 
            ref={(el) => addToRefs(el, 5)} 
            className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-lg opacity-0 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-wood-dark rounded-full">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-wood-dark text-center mb-2">Premium Quality</h4>
            <p className="text-wood-medium text-center">
              Committed to excellence in every product
            </p>
          </div>

          <div 
            ref={(el) => addToRefs(el, 6)} 
            className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-lg opacity-0 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-teak-medium rounded-full">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-wood-dark text-center mb-2">Multiple Locations</h4>
            <p className="text-wood-medium text-center">
              Serving Mangalore, Bangalore, Hyderabad, and Mumbai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
