export interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  shopkeeperName: string;
  products: OrderItem[];
  timestamp: number;
}

class Storage {
  private getProducts(): Product[] {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }

  private getOrders(): Order[] {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  }

  private saveProducts(products: Product[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  private saveOrders(orders: Order[]) {
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  addProduct(name: string, price: number): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      price,
      createdAt: Date.now(),
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  getAllProducts(): Product[] {
    return this.getProducts();
  }

  createOrder(shopkeeperName: string, items: OrderItem[]): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      id: crypto.randomUUID(),
      shopkeeperName,
      products: items,
      timestamp: Date.now(),
    };
    orders.unshift(newOrder);
    this.saveOrders(orders);
    return newOrder;
  }

  getAllOrders(): Order[] {
    return this.getOrders();
  }
}

export const storage = new Storage();