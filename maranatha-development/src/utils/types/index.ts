export interface Service {
  name: string;
  price: string;
}

export interface Appointment {
  id?: number;
  name: string;
  email: string;
  phone: string;
  service: Service;
  date: string;
  time: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalVisits: number;
  totalSpent: number;
}