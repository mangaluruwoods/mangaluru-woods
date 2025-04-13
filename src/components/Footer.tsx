
import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, ArrowUpCircle } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-wood-darkest text-white relative">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">
              <span className="text-teak-medium">Mangaluru</span> Woods
            </h3>
            <p className="text-teak-lightest/80 mb-4">
              Transforming Trees Into Masterpieces since 1990. Premium quality wooden doors, 
              door frames and timber supplies.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://facebook.com" aria-label="Facebook">
                <Facebook size={18} />
              </SocialLink>
              <SocialLink href="https://instagram.com" aria-label="Instagram">
                <Instagram size={18} />
              </SocialLink>
              <SocialLink href="https://twitter.com" aria-label="Twitter">
                <Twitter size={18} />
              </SocialLink>
              <SocialLink href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin size={18} />
              </SocialLink>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-teak-light">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#products">Products</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-teak-light">Our Products</h4>
            <ul className="space-y-2">
              <FooterLink href="#products">Doors</FooterLink>
              <FooterLink href="#products">Door Frames</FooterLink>
              <FooterLink href="#products">Timber Supplies</FooterLink>
              <FooterLink href="#products">Custom Orders</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-teak-light">Our Locations</h4>
            <ul className="space-y-3 text-teak-lightest/80">
              <li>
                <span className="block font-medium text-white">Mangalore</span>
                123 Coastal Road, Mangalore
              </li>
              <li>
                <span className="block font-medium text-white">Bangalore</span>
                456 MG Road, Bangalore
              </li>
              <li>
                <span className="block font-medium text-white">Hyderabad</span>
                789 Jubilee Hills, Hyderabad
              </li>
              <li>
                <span className="block font-medium text-white">Mumbai</span>
                101 Marine Drive, Mumbai
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-teak-medium/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-teak-lightest/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Mangaluru Woods. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-teak-lightest/70 text-sm hover:text-teak-light transition-colors">
              Privacy Policy
            </a>
            <span className="text-teak-medium/50">|</span>
            <a href="#" className="text-teak-lightest/70 text-sm hover:text-teak-light transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="ml-4 text-teak-light hover:text-teak-lightest transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUpCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <li>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(href);
        }}
        className="text-teak-lightest/80 hover:text-teak-light transition-colors duration-300"
      >
        {children}
      </a>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  "aria-label": string;
}

const SocialLink = ({ href, children, "aria-label": ariaLabel }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-wood-dark/50 hover:bg-teak-medium text-white p-2 rounded-full transition-colors duration-300"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

export default Footer;
