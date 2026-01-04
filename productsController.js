import apiService from './apiService.js';

class ProductsController {
  constructor() {
    this.products = [];
    this.initialized = false;
  }

  // Initialize products by mapping employee data to product format
  async initializeProducts() {
    if (this.initialized) return this.products;

    try {
      // Get employee data from API
      const employees = await apiService.getProducts();
      
      // Map employee data to product format
      this.products = employees.map((emp, index) => ({
        id: emp.id,
        name: `${emp.firstname} ${emp.lastname}`,
        price: this.generatePrice(emp.id),
        img: this.getProductImage(emp.id),
        description: `Hand-crocheted product by ${emp.firstname} ${emp.lastname}. Unique and handmade with care.`,
        badge: this.getBadge(emp.id),
        rating: this.generateRating(emp.id)
      }));

      // Add sample products if no employees exist
      if (this.products.length === 0) {
        this.products = this.getDefaultProducts();
      }

      this.initialized = true;
      return this.products;
    } catch (error) {
      console.error('Failed to load products from API, using defaults:', error);
      this.products = this.getDefaultProducts();
      this.initialized = true;
      return this.products;
    }
  }

  // Get all products
  async getProducts() {
    return await this.initializeProducts();
  }

  // Get product by ID
  async getProduct(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === parseInt(id));
  }

  // Create new product
  async createProduct(productData) {
    try {
      // Map product data to employee format
      const employeeData = {
        firstname: productData.name.split(' ')[0] || 'Product',
        lastname: productData.name.split(' ').slice(1).join(' ') || 'Name'
      };

      const result = await apiService.createProduct(employeeData);
      
      // Refresh products list
      this.initialized = false;
      await this.initializeProducts();
      
      return result;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  }

  // Update product
  async updateProduct(productData) {
    try {
      const employeeData = {
        id: productData.id,
        firstname: productData.name.split(' ')[0] || 'Product',
        lastname: productData.name.split(' ').slice(1).join(' ') || 'Name'
      };

      const result = await apiService.updateProduct(employeeData);
      
      // Refresh products list
      this.initialized = false;
      await this.initializeProducts();
      
      return result;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  }

  // Delete product
  async deleteProduct(id) {
    try {
      const result = await apiService.deleteProduct(id);
      
      // Refresh products list
      this.initialized = false;
      await this.initializeProducts();
      
      return result;
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  }

  // Helper methods for generating product data
  generatePrice(id) {
    const basePrices = [20, 22, 27, 25, 30, 35, 40, 45, 50, 55];
    return basePrices[(id - 1) % basePrices.length];
  }

  getProductImage(id) {
    const images = [
      'img/hat-slouchy.png',
      'img/hat-beanie.png', 
      'img/hat-glen-tag.png',
      'img/hat-pom.png',
      'img/hat-plain.png',
      'img/boots-premium.png',
      'img/oxford-classic.png',
      'img/mocassins-comfort.png',
      'img/richelieus-elegants.png',
      'img/sandals-leather.png',
      'img/shoes-city.png'
    ];
    return images[(id - 1) % images.length];
  }

  getBadge(id) {
    const badges = ['New', 'Best Seller', 'Limited Edition', 'Popular', 'Premium', 'Exclusive'];
    return badges[(id - 1) % badges.length];
  }

  generateRating(id) {
    const ratings = [4.7, 4.5, 4.8, 4.4, 4.2, 4.9, 4.6, 4.3, 4.7, 4.5];
    return ratings[(id - 1) % ratings.length];
  }

  // Default products for fallback
  getDefaultProducts() {
    return [
      {
        id: 1,
        name: 'Slouchy Hat / Gorro',
        price: 20,
        img: 'img/hat-slouchy.png',
        description: 'Hand-crocheted slouchy hat — cozy and warm, perfect for winter.',
        badge: 'New',
        rating: 4.7
      },
      {
        id: 2,
        name: 'Beanie Hat / Gorro',
        price: 22,
        img: 'img/hat-beanie.png',
        description: 'Classic beanie, soft and versatile for everyday wear.',
        badge: 'Best Seller',
        rating: 4.5
      },
      {
        id: 3,
        name: 'Beanie Hat (with Glen Forest Tag)',
        price: 27,
        img: 'img/hat-glen-tag.png',
        description: 'Beanie with "Glen Forest" tag — a unique, collectible accessory.',
        badge: 'Limited Edition',
        rating: 4.8
      },
      {
        id: 4,
        name: 'Hat with Pom Pom',
        price: 22,
        img: 'img/hat-pom.png',
        description: 'Warm hat topped with a fluffy pom pom for added style.',
        badge: 'Popular',
        rating: 4.4
      },
      {
        id: 5,
        name: 'Hat without Pom Pom',
        price: 20,
        img: 'img/hat-plain.png',
        description: 'Simple and elegant hat without a pom pom, ideal for a minimal look.',
        rating: 4.2
      }
    ];
  }
}

// Create singleton instance
const productsController = new ProductsController();
export default productsController;
