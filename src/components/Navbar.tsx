
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <a 
            href="#home" 
            className="font-display text-2xl md:text-3xl font-bold text-wood-dark hover:text-wood-medium transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
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
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="p-2 text-wood-dark hover:text-wood-medium transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-wood-dark/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="flex flex-col items-center justify-center space-y-8">
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
        onClick && onClick();
      }}
      className="relative text-wood-medium hover:text-wood-dark font-medium transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-wood-medium after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
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
        onClick && onClick();
      }}
      className="text-xl text-white hover:text-teak-lightest font-medium transition-colors duration-300"
    >
      {children}
    </a>
  );
};

export default Navbar;
