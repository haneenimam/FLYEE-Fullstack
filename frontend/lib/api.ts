export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  flightId?: string | null;
  seatClass?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateBookingData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  flightId?: string | null;
  seatClass?: string | null;
};

export type UpdateBookingData = Partial<CreateBookingData> & {
  status?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function handleJsonResponse(res: Response) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json?.message || 'API error');
    Object.assign(err, { details: json });
    throw err;
  }
  return json;
}

export async function searchFlights(params: Record<string, string>) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/flights?${qs}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch flights');
  return json.data;
}


export async function getFlight(id: string) {
  const res = await fetch(`${API}/api/flights/${encodeURIComponent(id)}`);
  const json = await handleJsonResponse(res);
  return json.data;
}

export const bookingApi = {
  async getAvailability(date: string) {
    const res = await fetch(`${API}/api/availability/${encodeURIComponent(date)}`);
    const json = await handleJsonResponse(res);
    return json.data;
  },

  async createBooking(payload: CreateBookingData) {
    const res = await fetch(`${API}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await handleJsonResponse(res);
    return json.data;
  },

  async getBookings() {
    const res = await fetch(`${API}/api/bookings`);
    const json = await handleJsonResponse(res);
    return json.data;
  },

  async getBooking(id: string) {
    const res = await fetch(`${API}/api/bookings/${encodeURIComponent(id)}`);
    const json = await handleJsonResponse(res);
    return json.data;
  },

  async updateBooking(id: string, payload: UpdateBookingData) {
    const res = await fetch(`${API}/api/bookings/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await handleJsonResponse(res);
    return json.data;
  },

  async deleteBooking(id: string) {
    const res = await fetch(`${API}/api/bookings/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    const json = await handleJsonResponse(res);
    return json;
  },
};
