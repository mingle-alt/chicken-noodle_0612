export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  category: 'main' | 'combo' | 'summer' | 'winter' | 'side';
  isPopular?: boolean;
  isSpecial?: boolean;
  image?: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  options: {
    kimchiType: 'spicy' | 'mild' | 'half';
    noodleOption?: 'normal' | 'soft' | 'firm';
    notes?: string;
  };
}

export interface PickupOrder {
  id: string;
  name: string;
  phone: string;
  items: CartItem[];
  totalAmount: number;
  packagingFee: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  pickupTime: string;
  createdAt: string;
}
