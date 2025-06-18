export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
  rating: number;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  bookings: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bookings?: string[];
} 