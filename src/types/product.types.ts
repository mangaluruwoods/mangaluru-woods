export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: string[];
  hasCatalogue: boolean;
  catalogueUrl?: string;
  icon: string;
  customNote?: string;
  detailedDescription?: string;
  features?: string[];
  specifications?: Record<string, string>;
}

export interface ProductImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
}