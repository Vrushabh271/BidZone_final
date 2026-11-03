
import { Routes } from '@angular/router';

import { AuctionList } from './bidding/auction-list/auction-list';
import { AuctionDetails } from './bidding/auction-details/auction-details';
import { LiveBidding } from './bidding/live-bidding/live-bidding';
import { BidHistory } from './bidding/bid-history/bid-history';

import { ModulePage } from './shared/module-page';

export const routes: Routes = [

  // Default route
  {
    path: '',
    redirectTo: 'bidding',
    pathMatch: 'full'
  },

  // MEMBER 1 - SELLER MODULE
  {
    path: 'seller/auth',
    component: ModulePage,
    data: { page: 'seller-auth' }
  },
  {
    path: 'seller/profile',
    component: ModulePage,
    data: { page: 'seller-profile' }
  },
  {
    path: 'seller/products',
    component: ModulePage,
    data: { page: 'seller-products' }
  },
  {
    path: 'seller/scheduling',
    component: ModulePage,
    data: { page: 'seller-scheduling' }
  },

  // MEMBER 2 - BIDDING MODULE
  {
    path: 'bidding',
    component: AuctionList
  },
  {
    path: 'bidding/auction/:id',
    component: AuctionDetails
  },
  {
    path: 'bidding/live/:id',
    component: LiveBidding
  },
  {
    path: 'bidding/history/:id',
    component: BidHistory
  },

  // MEMBER 3 - WINNER AND PAYMENT MODULE
  {
    path: 'winner/history',
    component: ModulePage,
    data: { page: 'auction-history' }
  },
  {
    path: 'winner/selection',
    component: ModulePage,
    data: { page: 'winner-selection' }
  },
  {
    path: 'winner/details',
    component: ModulePage,
    data: { page: 'winner-details' }
  },
  {
    path: 'winner/payment',
    component: ModulePage,
    data: { page: 'payment-status' }
  },

  // MEMBER 4 - ADMIN MODULE
  {
    path: 'admin',
    component: ModulePage,
    data: { page: 'admin-dashboard' }
  },
  {
    path: 'admin/users',
    component: ModulePage,
    data: { page: 'user-management' }
  },
  {
    path: 'admin/products',
    component: ModulePage,
    data: { page: 'product-approval' }
  },
  {
    path: 'admin/auctions',
    component: ModulePage,
    data: { page: 'auction-monitoring' }
  },
  {
    path: 'admin/analytics',
    component: ModulePage,
    data: { page: 'analytics' }
  },

  // Unknown route
  {
    path: '**',
    redirectTo: 'bidding'
  }

];
