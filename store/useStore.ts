import { create } from 'zustand';
import { Booking, User } from '../types';

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (bookingId: number) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  bookings: [],
  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
  removeBooking: (bookingId) =>
    set((state) => ({
      bookings: state.bookings.filter((booking) => booking.id !== bookingId),
    })),
})); 