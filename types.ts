
export type TagType = 'Travel' | 'Hotel' | 'Sightseeing' | 'Food';

export interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  lat?: number;
  lng?: number;
  notes: string;
  tag: TagType;
}

export interface DayItinerary {
  id: string;
  date: string;
  activities: Activity[];
}

export interface Traveler {
  id: string;
  name: string;
  group: string;
  visaStatus: 'Pending' | 'In Progress' | 'Completed' | 'Not Required';
  visaRequired: boolean;
}

export interface Stay {
  id: string;
  city: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  occupants: string[];
  cost: number;
  notes: string;
}

export interface Expense {
  id: string;
  category: 'Flight' | 'Hotel' | 'Transport' | 'Food' | 'Sightseeing';
  description: string;
  paidBy: string;
  amount: number;
  currency: string;
  splitBetween: string[];
}

export interface ChecklistItem {
  id: string;
  task: string;
  isCompleted: boolean;
  category: string;
}

export interface ItineraryData {
  destination: string;
  startDate: string;
  endDate: string;
  summary: {
    highlights: string[];
    emergencyContact: string;
    arrivalCities: string[];
    departureCity: string;
  };
  travelers: Traveler[];
  days: DayItinerary[];
  stays: Stay[];
  expenses: Expense[];
  checklist: ChecklistItem[];
}
