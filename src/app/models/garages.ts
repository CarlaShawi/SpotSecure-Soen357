export interface Garage {
  GarageID: string;
  GarageName: string;
  Address: string;
}

export interface GarageDTO extends Garage {
  Capacity: number;
  Occupancy: number;
  OpeningHours: string[];
  Images: string[];
  RealTimeAvailability: boolean;
  Policy: string;
  Rates: Rates;
  Facilities: Facilities;
  VehicleTypes: VehicleType[];
  PaymentOptions: PaymentOption[];
  ReservationAvailable: boolean;
  DistanceToCustomer: string;
  SpotId: string;
}

export interface Rates {
  HourlyRate: number;
  DailyRate: number;
  MonthlyRate: number;
}

export interface Facilities {
  HandicapAccessible: boolean;
  EVChargingStations: number;
}

export enum VehicleType {
  Car = 'Car',
  Motorcycle = 'Motorcycle',
  Bicycle = 'Bicycle',
  LargeTruck = 'LargeTruck',
}

export enum PaymentOption {
  Cash = 'Cash',
  CreditCard = 'CreditCard',
  DebitCard ='DebitCard'

}
