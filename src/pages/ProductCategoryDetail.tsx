"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // or Next.js router
import {
  ArrowLeft,
  FileText,
  X,
  Check,
  ChevronRight,
  Package,
  BookOpen,
  Phone,
  Mail,
  ZoomIn,
} from "lucide-react";
import { productCategories } from "../data/productCategories";
import { productImages } from "../data/productImages";

const ProductCategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");

  const category = productCategories.find((cat) => cat.id === categoryId);
  const images = productImages[categoryId || ""] || [];

  useEffect(() => {
    if (!category) {
      navigate("/");
    }
  }, [category, navigate]);

  if (!category) return null;

  const filteredImages =
    selectedSubcategory === "all"
      ? images
      : images.filter((img) => img.subcategory === selectedSubcategory);

  const handleBackNavigation = () => {
    navigate("/");
    // Scroll to products section after navigation
    setTimeout(() => {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

   // Contact Actions
  const phoneNumber = "+917760719917";
  const whatsappNumber = "917760719917"; // Without + for WhatsApp

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppInquiry = (context: string) => {
    const message = encodeURIComponent(
      `Hi Mangaluru Woods! I'm interested in ${category.name} - ${context}. Please provide more details and pricing information.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Breadcrumb & Back Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackNavigation}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to All Products</span>
              <span className="sm:hidden">Back</span>
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Products</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-amber-700 font-semibold">
                {category.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{category.icon}</span>
              {category.hasCatalogue && (
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Catalogue Available
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-6">
              {category.description}
            </p>
            <p className="text-base md:text-lg text-amber-50 leading-relaxed mb-8">
              {category.detailedDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {category.hasCatalogue && (
                <button
                  onClick={() => setShowPdfModal(true)}
                  className="bg-white text-amber-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  View Complete Catalogue
                </button>
              )}
            <button 
                onClick={() => handleWhatsAppInquiry("Request for Quote")}
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* Subcategory Filter */}
      {category.subcategories.length > 0 && (
        <div className="container mx-auto px-4 md:px-6 pb-8 mt-4">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Browse Collection
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-amber-600 to-transparent rounded-full"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSubcategory("all")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedSubcategory === "all"
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600"
              }`}
            >
              All Products
            </button>
            {category.subcategories.map((sub, index) => (
              <button
                key={index}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedSubcategory === sub
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Gallery */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="relative h-64 overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => openImageModal(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3">
                      <ZoomIn className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                  {image.subcategory && (
                    <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {image.subcategory}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                    {image.title}
                  </h3>
                  {image.description && (
                    <p className="text-sm text-gray-600">{image.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Please Contact us to know more about this Product
            </h3>
            {/* <p className="text-gray-600">More products coming soon in this category.</p> */}
          </div>
        )}
      </div>

      {/* Features Section */}
      {category.features && category.features.length > 0 && (
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Key Features & Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200 hover:shadow-md transition-shadow"
                >
                  <div className="bg-amber-600 text-white p-1.5 rounded-full flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Specifications Section */}
      {category.specifications &&
        Object.keys(category.specifications).length > 0 && (
          <div className="container mx-auto px-4 md:px-6 pb-12">
            <div className="bg-gradient-to-br from-amber-900 to-orange-900 text-white rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                <Package className="w-8 h-8" />
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(category.specifications).map(
                  ([key, value], index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                    >
                      <dt className="text-amber-200 text-sm font-semibold mb-1 uppercase tracking-wide">
                        {key}
                      </dt>
                      <dd className="text-white text-lg font-medium">
                        {value}
                      </dd>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

     

      {/* Contact CTA */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 md:p-12 text-center border-2 border-amber-200">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Our wood experts are here to help you select the perfect{" "}
            {category.name.toLowerCase()} for your project. Get personalized
            recommendations and pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleCall}
              className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </button>
            <button 
              onClick={() => handleWhatsAppInquiry("Need help choosing the right product")}
              className="bg-white text-amber-700 border-2 border-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send Inquiry
            </button>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      {showPdfModal && category.catalogueUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 md:p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center gap-3">
                <div className="bg-amber-600 text-white p-2 rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {category.name} Catalogue
                  </h3>
                  <p className="text-sm text-gray-600">
                    Complete product specifications
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPdfModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={category.catalogueUrl}
                className="w-full h-full"
                title="Catalogue"
              />
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
              <a
                href={category.catalogueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 font-semibold underline text-sm"
              >
                Download PDF
              </a>
              <button
                onClick={() => setShowPdfModal(false)}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setShowImageModal(false)}
        >
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Product"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductCategoryDetail;
