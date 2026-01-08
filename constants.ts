
import { ItineraryData } from './types';

export const INITIAL_DATA: ItineraryData = {
  destination: "Georgia",
  startDate: "2025-02-13",
  endDate: "2025-02-18",
  summary: {
    highlights: ["Kazbegi Mountains", "Old Tbilisi Walk", "Wine Tasting in Kakheti", "Mtskheta Ancient Capital"],
    emergencyContact: "+995 555 123 456 (Local Guide - Gogi)",
    arrivalCities: ["Doha", "Kochi"],
    departureCity: "Tbilisi"
  },
  travelers: [
    { id: '1', name: "Ahmad (Group A)", group: "A", visaStatus: "Completed", visaRequired: false },
    { id: '2', name: "Sara (Group A)", group: "A", visaStatus: "Completed", visaRequired: false },
    { id: '3', name: "Zayd (Group A - Child)", group: "A", visaStatus: "Completed", visaRequired: false },
    { id: '4', name: "Rahul (Group B)", group: "B", visaStatus: "Pending", visaRequired: true },
    { id: '5', name: "Priya (Group B)", group: "B", visaStatus: "Pending", visaRequired: true },
    { id: '6', name: "Levan (Local Friend)", group: "Local", visaStatus: "Not Required", visaRequired: false }
  ],
  days: [
    {
      id: 'd1',
      date: '2025-02-13',
      activities: [
        { id: 'a1', time: '10:00', title: 'Group A Departure', location: 'Doha Airport (DOH)', lat: 25.273, lng: 51.608, tag: 'Travel', notes: 'Daytime flight' },
        { id: 'a2', time: '11:00', title: 'Group B Departure', location: 'Kochi Airport (COK)', lat: 10.155, lng: 76.391, tag: 'Travel', notes: 'Direct/Connecting flight' },
        { id: 'a3', time: '19:00', title: 'Arrival in Tbilisi', location: 'Tbilisi Intl Airport (TBS)', lat: 41.669, lng: 44.954, tag: 'Travel', notes: 'Collect SIM cards and exchange currency' },
        { id: 'a4', time: '20:30', title: 'Hotel Check-in', location: 'Radisson Blu Iveria', lat: 41.704, lng: 44.792, tag: 'Hotel', notes: 'Rest for the night' }
      ]
    },
    {
      id: 'd2',
      date: '2025-02-14',
      activities: [
        { id: 'a5', time: '09:00', title: 'Breakfast at Hotel', location: 'Tbilisi', lat: 41.704, lng: 44.792, tag: 'Food', notes: 'Traditional Georgian breakfast' },
        { id: 'a6', time: '10:30', title: 'Old Tbilisi Walking Tour', location: 'Shardeni Street', lat: 41.691, lng: 44.808, tag: 'Sightseeing', notes: 'Visit Narikala Fortress and Bridge of Peace' },
        { id: 'a7', time: '13:00', title: 'Lunch at Shavi Lomi', location: 'Tbilisi', lat: 41.710, lng: 44.802, tag: 'Food', notes: 'Famous hidden gem' },
        { id: 'a8', time: '15:30', title: 'Mtskheta Visit', location: 'Jvari Monastery', lat: 41.837, lng: 44.733, tag: 'Sightseeing', notes: 'UNESCO World Heritage site' }
      ]
    },
    {
      id: 'd3',
      date: '2025-02-15',
      activities: [
        { id: 'a9', time: '08:00', title: 'Drive to Kazbegi', location: 'Georgian Military Highway', lat: 42.164, lng: 44.712, tag: 'Travel', notes: 'Stop at Ananuri Fortress' },
        { id: 'a10', time: '12:00', title: 'Gergeti Trinity Church', location: 'Kazbegi', lat: 42.662, lng: 44.620, tag: 'Sightseeing', notes: '4x4 vehicle required for the climb' }
      ]
    }
  ],
  stays: [
    { id: 's1', city: 'Tbilisi', hotelName: 'Radisson Blu Iveria', checkIn: '2025-02-13', checkOut: '2025-02-18', roomType: '2x Double, 1x Single', occupants: ['Ahmad', 'Sara', 'Zayd', 'Rahul', 'Priya'], cost: 1200, notes: 'Central location' }
  ],
  expenses: [
    { id: 'e1', category: 'Flight', description: 'Group A Tickets', paidBy: 'Ahmad', amount: 800, currency: 'USD', splitBetween: ['Ahmad', 'Sara', 'Zayd'] },
    { id: 'e2', category: 'Hotel', description: 'Accommodation Deposit', paidBy: 'Rahul', amount: 400, currency: 'USD', splitBetween: ['Ahmad', 'Sara', 'Rahul', 'Priya'] }
  ],
  checklist: [
    { id: 'c1', task: 'Check Passport Validity (>6 months)', isCompleted: true, category: 'Docs' },
    { id: 'c2', task: 'Apply for E-Visa (Group B)', isCompleted: false, category: 'Visa' },
    { id: 'c3', task: 'Pack heavy winter gear', isCompleted: false, category: 'Packing' },
    { id: 'c4', task: 'Buy Travel Insurance', isCompleted: true, category: 'Health' }
  ]
};
