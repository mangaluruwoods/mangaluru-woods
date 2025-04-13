
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Locations from "@/components/Locations";
const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Section Divider */}
      <div className="h-1 bg-gradient-to-r from-teak-dark via-wood-medium to-teak-dark"></div>
      
      <About />

      <div className="h-1 bg-gradient-to-r from-teak-dark via-wood-medium to-teak-dark"></div>

      <Locations/>
      {/* Section Divider */}
      <div className="h-1 bg-gradient-to-r from-teak-dark via-wood-medium to-teak-dark"></div>
      
      <Products />
      
      {/* Section Divider */}
      <div className="h-1 bg-gradient-to-r from-teak-dark via-wood-medium to-teak-dark"></div>
      
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
