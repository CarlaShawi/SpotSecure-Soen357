export interface Reservation {
  id?: string; // Unique identifier for the reservation
  garageId: string; // ID of the garage where the spot is located
  spotId: string; // ID of the specific parking spot
  userId: string; // ID of the user making the reservation
  timeSlot: string; // Reserved time slot
  isActive: boolean; // Is the reservation currently active
  paid: string; 
}
