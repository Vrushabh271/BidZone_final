import { Injectable } from '@angular/core';

export interface MarketplaceProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  seller: string;
  startingPrice: number;
  currentBid: number;
  minimumIncrement: number;
  endTime: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Live' | 'Completed';
}

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private readonly storageKey = 'bidzone_products';

  private products: MarketplaceProduct[] = this.loadProducts();

  private loadProducts(): MarketplaceProduct[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  }

  getProducts(): MarketplaceProduct[] {
    return [...this.products];
  }

  addProduct(product: Omit<MarketplaceProduct, 'id'>): void {
    this.products.push({
      ...product,
      id: Date.now()
    });
    this.save();
  }

  updateProduct(id: number, changes: Partial<MarketplaceProduct>): void {
    this.products = this.products.map(product =>
      product.id === id ? { ...product, ...changes } : product
    );
    this.save();
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
    this.save();
  }

  approveProduct(id: number): void {
    this.updateProduct(id, { status: 'Approved' });
  }

  rejectProduct(id: number): void {
    this.updateProduct(id, { status: 'Rejected' });
  }

  getApprovedProducts(): MarketplaceProduct[] {
    return this.products.filter(
      product => product.status === 'Approved' || product.status === 'Live'
    );
  }
}