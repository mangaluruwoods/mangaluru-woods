
import React, { useRef, useEffect, useState } from "react";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
      sectionRef.current.style.opacity = "0";
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you soon!",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <div id="contact" className="py-24 bg-wood-darkest text-white relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1426604966848-d7adac402bff')] bg-cover bg-center bg-fixed opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-wood-darkest/90 to-wood-darkest/95"></div>
      
      <div ref={sectionRef} className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-teak-light mb-4">
            Get In Touch
          </h2>
          <div className="h-0.5 w-24 bg-teak-medium mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-teak-lightest/80 max-w-2xl mx-auto">
            Have questions or need a custom quote? Reach out to us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-wood-dark/40 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-teak-light">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-teak-medium rounded-full p-3 shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Phone</h4>
                  <p className="text-teak-lightest/80">+91 98765 43210</p>
                  <p className="text-teak-lightest/80">+91 91234 56789</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-teak-medium rounded-full p-3 shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Email</h4>
                  <p className="text-teak-lightest/80">info@mangaluruwoods.com</p>
                  <p className="text-teak-lightest/80">sales@mangaluruwoods.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-teak-medium rounded-full p-3 shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Locations</h4>
                  <p className="text-teak-lightest/80">
                    <span className="block font-medium">Mangalore (Head Office):</span>
                    123 Coastal Road, Mangalore, Karnataka - 575001
                  </p>
                  <p className="text-teak-lightest/80 mt-2">
                    <span className="block font-medium">Other Branches:</span>
                    Bangalore | Hyderabad | Mumbai
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-bold text-white mb-4">Business Hours</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-teak-lightest/80">Monday - Friday</div>
                <div className="text-white">9:00 AM - 6:00 PM</div>
                <div className="text-teak-lightest/80">Saturday</div>
                <div className="text-white">10:00 AM - 4:00 PM</div>
                <div className="text-teak-lightest/80">Sunday</div>
                <div className="text-white">Closed</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-teak-light">Send us a Message</h3>
            
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-10">
                <div className="bg-teak-medium/20 rounded-full p-4 mb-4">
                  <Check className="h-10 w-10 text-teak-light" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                <p className="text-teak-lightest/80 text-center">
                  Your message has been sent successfully. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-teak-medium text-white rounded hover:bg-teak-dark transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-teak-lightest mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-teak-medium/30 rounded focus:outline-none focus:ring-2 focus:ring-teak-light/50 text-white"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-teak-lightest mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-teak-medium/30 rounded focus:outline-none focus:ring-2 focus:ring-teak-light/50 text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-teak-lightest mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-teak-medium/30 rounded focus:outline-none focus:ring-2 focus:ring-teak-light/50 text-white"
                    placeholder="Your phone number (optional)"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-teak-lightest mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-white/10 border border-teak-medium/30 rounded focus:outline-none focus:ring-2 focus:ring-teak-light/50 text-white resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-teak-medium text-white rounded hover:bg-teak-dark transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
