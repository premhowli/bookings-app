import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { Booking, Property, User } from '../types';

const API_URL = 'http://192.168.68.105:3000';

// --- Strongly typed fetch helpers ---
async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} ${errorText}`);
    }
    return response.json();
}

// --- Properties ---
export function useProperties(options?: UseQueryOptions<Property[], Error>) {
    return useQuery<Property[], Error>({
        queryKey: ['properties'],
        queryFn: () => fetchJson<Property[]>(`${API_URL}/properties`),
        staleTime: 60_000,
        ...options,
    });
}

// --- Single Property ---
export function useProperty(id: string, options?: UseQueryOptions<Property, Error>) {
    return useQuery<Property, Error>({
        queryKey: ['property', id],
        queryFn: () => fetchJson<Property>(`${API_URL}/properties/${id}`),
        enabled: !!id,
        ...options,
    });
}

// --- Bookings ---
export function useBookings(userId: string, options?: UseQueryOptions<Booking[], Error>) {
    return useQuery<Booking[], Error>({
        queryKey: ['bookings', userId],
        queryFn: () => fetchJson<Booking[]>(`${API_URL}/bookings?userId=${userId}`),
        enabled: !!userId,
        staleTime: 60_000,
        ...options,
    });
}

// --- User ---
export function useUser(options?: UseQueryOptions<User, Error>) {
    return useQuery<User, Error>({
        queryKey: ['user'],
        queryFn: () => fetchJson<User>(`${API_URL}/profile`),
        ...options,
    });
}

// --- Create Booking ---
export function useCreateBooking() {
    const queryClient = useQueryClient();

    return useMutation<Booking, Error, { booking: Omit<Booking, 'id'>; user: User }>({
        mutationFn: async ({ booking, user }) => {
            // 1. Create the booking
            const newBooking = await fetchJson<Booking>(`${API_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });

            // 2. Fetch the current profile
            const profile = await fetchJson<User>(`${API_URL}/profile`);

            // 3. Merge the new booking ID
            const updatedBookings = Array.isArray(profile.bookings)
                ? [...profile.bookings, newBooking.id]
                : [newBooking.id];

            // 4. PATCH the flat profile object
            await fetchJson<User>(`${API_URL}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...profile,
                    bookings: updatedBookings,
                }),
            });

            return newBooking;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}

// --- Property Bookings ---
export function usePropertyBookings(propertyId: string, options?: UseQueryOptions<Booking[], Error>) {
    return useQuery<Booking[], Error>({
        queryKey: ['propertyBookings', propertyId],
        queryFn: () => fetchJson<Booking[]>(`${API_URL}/bookings?propertyId=${propertyId}`),
        enabled: !!propertyId,
        ...options,
    });
} 