import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        // Always use solid background for mobile
        "md:bg-transparent md:py-4",
        // On mobile: always use solid background
        "bg-wood-dark shadow-md py-2",
        // Only change desktop background on scroll
        scrolled && "md:bg-wood-dark/95 md:backdrop-blur-md md:shadow-md md:py-2"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <a 
            href="#home" 
            className="flex items-center gap-2 font-display text-2xl md:text-3xl font-bold text-white hover:text-teak-lightest transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <img 
              src="/logo.jpeg" 
              alt="Mangaluru Woods Logo" 
              className="h-8 w-auto rounded-sm" 
            />
            <span className="text-teak-medium">Mangaluru</span> Woods
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#home" onClick={() => scrollToSection("home")}>
            Home
          </NavLink>
          <NavLink href="#about" onClick={() => scrollToSection("about")}>
            About
          </NavLink>
          <NavLink href="#products" onClick={() => scrollToSection("products")}>
            Products
          </NavLink>
          <NavLink href="#contact" onClick={() => scrollToSection("contact")}>
            Contact
          </NavLink>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="px-4 py-2 bg-teak-medium text-white rounded-md hover:bg-teak-dark transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            Get Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="p-2 text-white hover:text-teak-lightest transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/80 z-40 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-xs bg-wood-darkest shadow-lg z-50 transition-transform duration-300 ease-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col pt-16 pb-8 px-6 overflow-y-auto">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 text-white hover:text-teak-lightest"
            aria-label="Close Menu"
          >
            <X size={28} />
          </button>
          
          <div className="mb-12 flex justify-center">
            <img 
              src="/logo.jpeg" 
              alt="Mangaluru Woods Logo" 
              className="h-16 w-auto rounded" 
            />
          </div>
          
          <div className="space-y-6">
            <MobileNavLink href="#home" onClick={() => scrollToSection("home")}>
              Home
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={() => scrollToSection("about")}>
              About
            </MobileNavLink>
            <MobileNavLink href="#products" onClick={() => scrollToSection("products")}>
              Products
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => scrollToSection("contact")}>
              Contact
            </MobileNavLink>
          </div>
          
          <div className="mt-auto pt-8">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="block w-full px-6 py-3 bg-teak-medium text-white rounded-md hover:bg-teak-dark transition-colors duration-300 text-center font-medium"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
      className="relative text-white hover:text-teak-lightest font-medium transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-teak-lightest after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ href, children, onClick }: NavLinkProps) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
      className="block text-xl text-white font-medium py-3 border-b border-teak-dark/30 hover:pl-2 hover:text-teak-lightest transition-all duration-200"
    >
      {children}
    </a>
  );
};

export default Navbar;