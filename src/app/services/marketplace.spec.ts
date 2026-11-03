
import { Injectable } from '@angular/core';

export interface MarketplaceProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  seller: string;
  startingPrice: number;
  currentBid: number;
  image: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Live' | 'Completed';
}

export interface MarketplaceUser {
  id: number;
  name: string;
  email: string;
  role: 'Seller' | 'Bidder' | 'Admin';
  status: 'Active' | 'Blocked';
}

export interface MarketplaceTransaction {
  id: number;
  auctionId: number;
  productName: string;
  winnerName: string;
  amount: number;
  status: 'Pending' | 'Paid';
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private readonly productKey = 'bidzone_products';
  private readonly userKey = 'bidzone_users';
  private readonly transactionKey = 'bidzone_transactions';

  constructor() {
    this.initializeData();
  }

  // Initialize sample data for the frontend demo
  private initializeData(): void {
    if (!localStorage.getItem(this.productKey)) {
      const products: MarketplaceProduct[] = [
        {
          id: 1,
          title: 'MacBook Pro M3',
          description: 'Apple laptop in excellent condition',
          category: 'Electronics',
          seller: 'Demo Seller',
          startingPrice: 80000,
          currentBid: 85000,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 3600000).toISOString(),
          status: 'Live'
        },
        {
          id: 2,
          title: 'Canon DSLR Camera',
          description: 'Professional photography camera',
          category: 'Photography',
          seller: 'Demo Seller',
          startingPrice: 35000,
          currentBid: 38000,
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7200000).toISOString(),
          status: 'Live'
        }
      ];

      this.save(this.productKey, products);
    }

    if (!localStorage.getItem(this.userKey)) {
      const users: MarketplaceUser[] = [
        {
          id: 1,
          name: 'Demo Seller',
          email: 'seller@bidzone.com',
          role: 'Seller',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Demo Bidder',
          email: 'bidder@bidzone.com',
          role: 'Bidder',
          status: 'Active'
        },
        {
          id: 3,
          name: 'Admin',
          email: 'admin@bidzone.com',
          role: 'Admin',
          status: 'Active'
        }
      ];

      this.save(this.userKey, users);
    }

    if (!localStorage.getItem(this.transactionKey)) {
      this.save(this.transactionKey, []);
    }
  }

  private read<T>(key: string): T[] {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]') as T[];
    } catch {
      return [];
    }
  }

  private save<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // ---------------- PRODUCTS ----------------

  getProducts(): MarketplaceProduct[] {
    return this.read<MarketplaceProduct>(this.productKey);
  }

  getProductById(id: number): MarketplaceProduct | undefined {
    return this.getProducts().find(product => product.id === id);
  }

  addProduct(product: Omit<MarketplaceProduct, 'id'>): void {
    const products = this.getProducts();

    const newProduct: MarketplaceProduct = {
      ...product,
      id: Math.max(0, ...products.map(p => p.id)) + 1
    };

    products.push(newProduct);
    this.save(this.productKey, products);
  }

  updateProduct(updatedProduct: MarketplaceProduct): void {
    const products = this.getProducts().map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );

    this.save(this.productKey, products);
  }

  deleteProduct(id: number): void {
    const products = this.getProducts().filter(product => product.id !== id);
    this.save(this.productKey, products);
  }

  approveProduct(id: number): void {
    const product = this.getProductById(id);

    if (product) {
      product.status = 'Approved';
      this.updateProduct(product);
    }
  }

  rejectProduct(id: number): void {
    const product = this.getProductById(id);

    if (product) {
      product.status = 'Rejected';
      this.updateProduct(product);
    }
  }

  // ---------------- AUCTIONS ----------------

  getLiveAuctions(): MarketplaceProduct[] {
    return this.getProducts().filter(product =>
      product.status === 'Live' &&
      new Date(product.endDate).getTime() > Date.now()
    );
  }

  scheduleAuction(id: number, startDate: string, endDate: string): boolean {
    const product = this.getProductById(id);

    if (!product || new Date(endDate) <= new Date(startDate)) {
      return false;
    }

    product.startDate = startDate;
    product.endDate = endDate;
    product.status = 'Pending';

    this.updateProduct(product);
    return true;
  }

  completeAuction(id: number): void {
    const product = this.getProductById(id);

    if (product) {
      product.status = 'Completed';
      this.updateProduct(product);
    }
  }

  // ---------------- USERS ----------------

  getUsers(): MarketplaceUser[] {
    return this.read<MarketplaceUser>(this.userKey);
  }

  addUser(user: Omit<MarketplaceUser, 'id'>): void {
    const users = this.getUsers();

    users.push({
      ...user,
      id: Math.max(0, ...users.map(u => u.id)) + 1
    });

    this.save(this.userKey, users);
  }

  updateUser(updatedUser: MarketplaceUser): void {
    const users = this.getUsers().map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );

    this.save(this.userKey, users);
  }

  // ---------------- PAYMENTS ----------------

  getTransactions(): MarketplaceTransaction[] {
    return this.read<MarketplaceTransaction>(this.transactionKey);
  }

  addTransaction(transaction: Omit<MarketplaceTransaction, 'id'>): void {
    const transactions = this.getTransactions();

    transactions.push({
      ...transaction,
      id: Math.max(0, ...transactions.map(t => t.id)) + 1
    });

    this.save(this.transactionKey, transactions);
  }

  markTransactionPaid(id: number): void {
    const transactions = this.getTransactions().map(transaction =>
      transaction.id === id
        ? { ...transaction, status: 'Paid' as const }
        : transaction
    );

    this.save(this.transactionKey, transactions);
  }

  // ---------------- ADMIN DASHBOARD ----------------

  getDashboardStats() {
    const products = this.getProducts();
    const users = this.getUsers();
    const transactions = this.getTransactions();

    return {
      totalProducts: products.length,
      pendingProducts: products.filter(p => p.status === 'Pending').length,
      approvedProducts: products.filter(p => p.status === 'Approved').length,
      liveAuctions: this.getLiveAuctions().length,
      completedAuctions: products.filter(p => p.status === 'Completed').length,
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'Active').length,
      totalTransactions: transactions.length,
      paidTransactions: transactions.filter(t => t.status === 'Paid').length
    };
  }
}
