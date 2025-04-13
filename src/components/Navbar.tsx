import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Effect to handle scrolling and body lock when mobile menu is open
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add body lock when menu is open to prevent scrolling
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("scroll", handleScroll);
    // Initial check for scroll position when component mounts
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
        scrolled || isOpen
          ? "bg-wood-dark/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-2 font-display text-2xl md:text-3xl font-bold text-white hover:text-teak-lightest transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <img 
              src="/logo.jpg" 
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

      {/* Mobile Menu - Now with FULLY OPAQUE background */}
      <div
        className={cn(
          "fixed inset-0 bg-wood-dark z-40 flex flex-col justify-center items-center transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center space-y-8 w-full px-6">
          {/* Logo in mobile menu */}
          <div className="mb-8">
            <img 
              src="/logo.jpg" 
              alt="Mangaluru Woods Logo" 
              className="h-16 w-auto mx-auto rounded" 
            />
          </div>
          
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
          
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="mt-6 px-8 py-3 bg-teak-medium text-white rounded-md hover:bg-teak-dark transition-colors duration-300 text-center w-full max-w-xs"
          >
            Get Quote
          </a>
        </div>
        
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 p-2 text-white hover:text-teak-lightest"
          aria-label="Close Menu"
        >
          <X size={28} />
        </button>
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
      className="text-2xl text-white hover:text-teak-lightest font-medium transition-colors duration-300 w-full text-center py-2 border-b border-teak-dark/30"
    >
      {children}
    </a>
  );
};

export default Navbar;