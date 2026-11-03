
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface RecordItem {
  id: number;
  name: string;
  detail: string;
  status: string;
  amount?: number;
}

@Component({
  selector: 'app-module-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './module-page.html',
  styleUrl: './module-page.css'
})
export class ModulePage {
  section = '';
  title = '';
  description = '';
  actionLabel = 'Add Record';
  actionForRow = 'Update';
  showAmount = false;
  showForm = false;

  newName = '';
  newDetail = '';
  newAmount: number | null = null;

  records: RecordItem[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.configurePage(data['page'] as string);
    });
  }

  get activeCount(): number {
    return this.records.filter(r =>
      ['Live', 'Pending', 'Under Review', 'Scheduled'].includes(r.status)
    ).length;
  }

  get completedCount(): number {
    return this.records.filter(r =>
      ['Approved', 'Paid', 'Completed', 'Winner Selected'].includes(r.status)
    ).length;
  }

  configurePage(page: string): void {
    const configs: Record<string, {
      section: string;
      title: string;
      description: string;
      action: string;
      rowAction: string;
      amount?: boolean;
      records: RecordItem[];
    }> = {

      'seller-auth': {
        section: 'Seller',
        title: 'Seller Registration & Login',
        description: 'Seller access workspace.',
        action: 'Add Seller',
        rowAction: 'Verify',
        records: [
          { id: 1, name: 'Demo Seller', detail: 'seller@bidzone.com', status: 'Approved' }
        ]
      },

      'seller-profile': {
        section: 'Seller',
        title: 'Seller Profile Management',
        description: 'Manage seller profiles and contact information.',
        action: 'Add Profile',
        rowAction: 'Update',
        records: [
          { id: 1, name: 'Demo Seller', detail: 'Verified seller account', status: 'Approved' }
        ]
      },

      'seller-products': {
        section: 'Seller',
        title: 'Product Management',
        description: 'Add and manage products for auction.',
        action: 'Add Product',
        rowAction: 'Edit',
        amount: true,
        records: [
          { id: 1, name: 'MacBook Pro M3', detail: 'Laptop - Electronics', status: 'Approved', amount: 85000 },
          { id: 2, name: 'Canon DSLR Camera', detail: 'Camera - Photography', status: 'Pending', amount: 38000 }
        ]
      },

      'seller-scheduling': {
        section: 'Seller',
        title: 'Auction Scheduling',
        description: 'Manage auction schedules and timings.',
        action: 'Schedule Auction',
        rowAction: 'Update',
        records: [
          { id: 1, name: 'MacBook Pro M3', detail: 'Auction schedule', status: 'Scheduled' }
        ]
      },

      'auction-history': {
        section: 'Winner & Payment',
        title: 'Auction History',
        description: 'Review completed and previous auctions.',
        action: 'Add History',
        rowAction: 'View',
        amount: true,
        records: [
          { id: 1, name: 'MacBook Pro M3', detail: 'Auction #1', status: 'Completed', amount: 86000 }
        ]
      },

      'winner-selection': {
        section: 'Winner & Payment',
        title: 'Winner Selection',
        description: 'Review the highest bidder and select the winner.',
        action: 'Add Result',
        rowAction: 'Select Winner',
        amount: true,
        records: [
          { id: 1, name: 'MacBook Pro M3', detail: 'Highest bidder: Demo User', status: 'Winner Selected', amount: 86000 }
        ]
      },

      'winner-details': {
        section: 'Winner & Payment',
        title: 'Winner Details',
        description: 'Review winner information.',
        action: 'Add Winner',
        rowAction: 'View',
        records: [
          { id: 1, name: 'Demo User', detail: 'Winner of MacBook Pro M3', status: 'Winner Selected' }
        ]
      },

      'payment-status': {
        section: 'Winner & Payment',
        title: 'Payment Status',
        description: 'Track payment and transaction records.',
        action: 'Add Transaction',
        rowAction: 'Mark Paid',
        amount: true,
        records: [
          { id: 1, name: 'MacBook Pro M3', detail: 'Transaction #TXN001', status: 'Pending', amount: 86000 }
        ]
      },

      'admin-dashboard': {
        section: 'Admin',
        title: 'Admin Dashboard',
        description: 'Overview of marketplace activity.',
        action: 'Add Notice',
        rowAction: 'Resolve',
        records: [
          { id: 1, name: 'Marketplace monitoring', detail: 'Review active auctions', status: 'Live' },
          { id: 2, name: 'Product moderation', detail: 'Review submitted products', status: 'Pending' }
        ]
      },

      'user-management': {
        section: 'Admin',
        title: 'User Management',
        description: 'Monitor and manage marketplace users.',
        action: 'Add User',
        rowAction: 'Approve',
        records: [
          { id: 1, name: 'Demo Seller', detail: 'Seller account', status: 'Approved' },
          { id: 2, name: 'Demo Bidder', detail: 'Bidder account', status: 'Pending' }
        ]
      },

      'product-approval': {
        section: 'Admin',
        title: 'Product Approval',
        description: 'Approve or reject submitted products.',
        action: 'Add Product',
        rowAction: 'Approve',
        records: [
          { id: 1, name: 'Canon DSLR Camera', detail: 'Submitted by Demo Seller', status: 'Pending' }
        ]
      },

      'auction-monitoring': {
        section: 'Admin',
        title: 'Auction Monitoring',
        description: 'Monitor live and completed auctions.',
        action: 'Add Auction',
        rowAction: 'Review',
        amount: true,
        records: [
          { id: 1, name: 'MacBook Pro M3', detail: 'Auction #1', status: 'Live', amount: 85000 }
        ]
      },

      'analytics': {
        section: 'Admin',
        title: 'Analytics & Reports',
        description: 'Review sample marketplace activity records.',
        action: 'Add Report',
        rowAction: 'View',
        amount: true,
        records: [
          { id: 1, name: 'Auction activity', detail: 'Sample report', status: 'Completed', amount: 86000 }
        ]
      }
    };

    const config = configs[page] ?? configs['admin-dashboard'];

    this.section = config.section;
    this.title = config.title;
    this.description = config.description;
    this.actionLabel = config.action;
    this.actionForRow = config.rowAction;
    this.showAmount = !!config.amount;
    this.records = config.records.map(r => ({ ...r }));
  }

  addRecord(): void {
    if (!this.newName.trim() || !this.newDetail.trim()) return;

    this.records.unshift({
      id: Math.max(0, ...this.records.map(r => r.id)) + 1,
      name: this.newName.trim(),
      detail: this.newDetail.trim(),
      status: 'Pending',
      amount: this.newAmount ?? undefined
    });

    this.newName = '';
    this.newDetail = '';
    this.newAmount = null;
    this.showForm = false;
  }

  changeStatus(item: RecordItem): void {
    if (item.status === 'Pending' || item.status === 'Under Review') {
      item.status = 'Approved';
    } else if (item.status === 'Approved') {
      item.status = 'Completed';
    } else if (item.status === 'Winner Selected') {
      item.status = 'Paid';
    } else if (item.status === 'Live' || item.status === 'Scheduled') {
      item.status = 'Completed';
    } else {
      item.status = 'Under Review';
    }
  }

  deleteRecord(id: number): void {
    this.records = this.records.filter(r => r.id !== id);
  }
}
