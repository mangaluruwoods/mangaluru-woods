"use client";

import { useState } from "react";
import {
  FileText,
  X,
  ChevronRight,
  Package,
  BookOpen,
  Hammer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productCategories } from "../data/productCategories";

const Products = () => {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const navigate = useNavigate();

  // WhatsApp Configuration
  const whatsappNumber = "917760719917";

  const openCatalogue = (url: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setCurrentPdfUrl(url);
    setShowPdfModal(true);
  };

  const closeCatalogue = () => {
    setShowPdfModal(false);
    setCurrentPdfUrl("");
  };

  const navigateToCategory = (categoryId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent card click when button is clicked
    navigate(`/products/${categoryId}`);
  };

  const handleWhatsAppContact = (type: "general" | "quote") => {
    const message =
      type === "general"
        ? encodeURIComponent(
            "Hi Mangaluru Woods! I would like to know more about your products. Please help me with the details."
          )
        : encodeURIComponent(
            "Hi Mangaluru Woods! I'm interested in getting a quote for your wood products. Please provide pricing and availability details."
          );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <div
      id="products"
      className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2033')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Our Premium Products
            </h1>
            <p className="text-lg md:text-xl text-amber-100 mb-8">
              Discover excellence in every grain. From solid teak to modern WPC
              solutions, we bring you the finest wood products crafted with
              precision and care.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Package className="w-5 h-5" />
                <span>5 Product Categories</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FileText className="w-5 h-5" />
                <span>Digital Catalogues</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Hammer className="w-5 h-5" />
                <span>Custom Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {productCategories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => navigateToCategory(category.id)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100 hover:border-amber-300 hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Category Icon Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">
                  {category.icon}
                </div>

                {/* Catalogue Badge */}
                {category.hasCatalogue && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <FileText className="w-3 h-3" />
                    Catalogue Available
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>

                {/* Subcategories */}
                {category.subcategories.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      Includes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Note for Furniture */}
                {category.customNote && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 flex items-start gap-2">
                      <Hammer className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{category.customNote}</span>
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-6">
                  {category.hasCatalogue ? (
                    <>
                      <button
                        onClick={(e) => openCatalogue(category.catalogueUrl!, e)}
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <BookOpen className="w-5 h-5" />
                        View Catalogue
                      </button>
                      <button
                        onClick={(e) => navigateToCategory(category.id, e)}
                        className="w-full bg-white text-amber-700 py-3 px-4 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Package className="w-5 h-5" />
                        Explore Products
                      </button>
                    </>
                  ) : category.hasCatalogue === false &&
                    !category.customNote ? (
                    <>
                      <div className="w-full bg-gray-100 text-gray-500 py-3 px-4 rounded-lg font-semibold border-2 border-gray-200 flex items-center justify-center gap-2 cursor-not-allowed">
                        <FileText className="w-5 h-5" />
                        Catalogue Coming Soon
                      </div>
                      <button
                        onClick={(e) => navigateToCategory(category.id, e)}
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <Package className="w-5 h-5" />
                        Explore Products
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={(e) => navigateToCategory(category.id, e)}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Hammer className="w-5 h-5" />
                      View Custom Options
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center gap-3">
                <div className="bg-amber-600 text-white p-2 rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    Product Catalogue
                  </h3>
                  <p className="text-sm text-gray-600">
                    View detailed specifications and designs
                  </p>
                </div>
              </div>
              <button
                onClick={closeCatalogue}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
              >
                <X className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-gray-100">
              <iframe
                src={currentPdfUrl}
                className="w-full h-full border-0"
                title="Product Catalogue PDF"
              />
            </div>
            <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <p className="text-sm text-gray-600">
                Having trouble viewing?{" "}
                <a
                  href={currentPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 font-semibold underline"
                >
                  Download PDF
                </a>
              </p>
              <button
                onClick={closeCatalogue}
                className="w-full sm:w-auto bg-amber-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            We specialize in custom solutions. Let us know your requirements,
            and our experts will help you find the perfect wood products for
            your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleWhatsAppContact("general")}
              className="bg-white text-amber-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
            >
              Contact Our Team
            </button>
            <button
              onClick={() => handleWhatsAppContact("quote")}
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
// "use client";

// import { useState } from "react";
// import {
//   FileText,
//   X,
//   ChevronRight,
//   Package,
//   BookOpen,
//   Hammer,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom"; // or Next.js router
// import { productCategories } from "../data/productCategories";

// const Products = () => {
//   const [showPdfModal, setShowPdfModal] = useState(false);
//   const [currentPdfUrl, setCurrentPdfUrl] = useState("");
//   const navigate = useNavigate(); // For React Router, use: const router = useRouter() for Next.js

//   const openCatalogue = (url: string) => {
//     setCurrentPdfUrl(url);
//     setShowPdfModal(true);
//   };

//   const closeCatalogue = () => {
//     setShowPdfModal(false);
//     setCurrentPdfUrl("");
//   };

//   const navigateToCategory = (categoryId: string) => {
//     navigate(`/products/${categoryId}`); // For Next.js: router.push(`/products/${categoryId}`)
//   };

//   return (
//     <div
//       id="products"
//       className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50"
//     >
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white py-16 md:py-24 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2033')] opacity-10 bg-cover bg-center"></div>
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

//         <div className="container mx-auto px-4 md:px-6 relative z-10">
//           <div className="text-center max-w-4xl mx-auto">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
//               Our Premium Products
//             </h1>
//             <p className="text-lg md:text-xl text-amber-100 mb-8">
//               Discover excellence in every grain. From solid teak to modern WPC
//               solutions, we bring you the finest wood products crafted with
//               precision and care.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
//               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
//                 <Package className="w-5 h-5" />
//                 <span>5 Product Categories</span>
//               </div>
//               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
//                 <FileText className="w-5 h-5" />
//                 <span>Digital Catalogues</span>
//               </div>
//               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
//                 <Hammer className="w-5 h-5" />
//                 <span>Custom Solutions</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Categories Grid */}
//       <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {productCategories.map((category, index) => (
//             <div
//               key={category.id}
//               className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100 hover:border-amber-300 hover:-translate-y-2"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               {/* Image Container */}
//               <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

//                 {/* Category Icon Badge */}
//                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">
//                   {category.icon}
//                 </div>

//                 {/* Catalogue Badge */}
//                 {category.hasCatalogue && (
//                   <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
//                     <FileText className="w-3 h-3" />
//                     Catalogue Available
//                   </div>
//                 )}
//               </div>

//               {/* Content */}
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
//                   {category.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   {category.description}
//                 </p>

//                 {/* Subcategories */}
//                 {category.subcategories.length > 0 && (
//                   <div className="mb-4">
//                     <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
//                       <ChevronRight className="w-3 h-3" />
//                       Includes:
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {category.subcategories.map((sub, idx) => (
//                         <span
//                           key={idx}
//                           className="text-xs bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200"
//                         >
//                           {sub}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Custom Note for Furniture */}
//                 {category.customNote && (
//                   <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                     <p className="text-sm text-blue-800 flex items-start gap-2">
//                       <Hammer className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                       <span>{category.customNote}</span>
//                     </p>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex flex-col gap-2 mt-6">
//                   {category.hasCatalogue ? (
//                     <>
//                       <button
//                         onClick={() => openCatalogue(category.catalogueUrl!)}
//                         className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
//                       >
//                         <BookOpen className="w-5 h-5" />
//                         View Catalogue
//                       </button>
//                       <button
//                         onClick={() => navigateToCategory(category.id)}
//                         className="w-full bg-white text-amber-700 py-3 px-4 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2"
//                       >
//                         <Package className="w-5 h-5" />
//                         Explore Products
//                       </button>
//                     </>
//                   ) : category.hasCatalogue === false &&
//                     !category.customNote ? (
//                     <>
//                       <div className="w-full bg-gray-100 text-gray-500 py-3 px-4 rounded-lg font-semibold border-2 border-gray-200 flex items-center justify-center gap-2 cursor-not-allowed">
//                         <FileText className="w-5 h-5" />
//                         Catalogue Coming Soon
//                       </div>
//                       <button
//                         onClick={() => navigateToCategory(category.id)}
//                         className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
//                       >
//                         <Package className="w-5 h-5" />
//                         Explore Products
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => navigateToCategory(category.id)}
//                       className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
//                     >
//                       <Hammer className="w-5 h-5" />
//                       View Custom Options
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* PDF Modal - Same as before */}
//       {showPdfModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
//               <div className="flex items-center gap-3">
//                 <div className="bg-amber-600 text-white p-2 rounded-lg">
//                   <FileText className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl md:text-2xl font-bold text-gray-900">
//                     Product Catalogue
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     View detailed specifications and designs
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={closeCatalogue}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
//               >
//                 <X className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
//               </button>
//             </div>
//             <div className="flex-1 overflow-hidden bg-gray-100">
//               <iframe
//                 src={currentPdfUrl}
//                 className="w-full h-full border-0"
//                 title="Product Catalogue PDF"
//               />
//             </div>
//             <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-between items-center">
//               <p className="text-sm text-gray-600">
//                 Having trouble viewing?{" "}
//                 <a
//                   href={currentPdfUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-amber-600 hover:text-amber-700 font-semibold underline"
//                 >
//                   Download PDF
//                 </a>
//               </p>
//               <button
//                 onClick={closeCatalogue}
//                 className="w-full sm:w-auto bg-amber-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CTA Section */}
//       <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white py-16 md:py-20">
//         <div className="container mx-auto px-4 md:px-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Can't Find What You're Looking For?
//           </h2>
//           <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
//             We specialize in custom solutions. Let us know your requirements,
//             and our experts will help you find the perfect wood products for
//             your project.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-amber-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-lg">
//               Contact Our Team
//             </button>
//             <button className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all">
//               Request a Quote
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
