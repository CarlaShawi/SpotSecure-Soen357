import { Component } from '@angular/core';
import {
  GarageDTO,
  Rates,
  Facilities,
  VehicleType,
  PaymentOption,
} from '../../models/garages'

@Component({
  selector: 'app-individual-garage-page',
  templateUrl: './individual-garage-page.component.html',
  styleUrls: ['./individual-garage-page.component.scss'],
})
export class IndividualGaragePageComponent {
  garage: GarageDTO = {
    GarageID: 'G001',
    GarageName: 'Laurent-Garage',
    Address: '3131 Bouelvard de la Cote Vertu, Saint-Laurent, QC, H4R 1Y8',
    Capacity: 150,
    Occupancy: 75,
    OpeningHours: [
      'Monday - Friday: 7 AM - 10 PM',
      'Saturday - Sunday: 9 AM - 6 PM',
    ],
    Images: [
      'https://crescentparking.com/wp-content/uploads/2017/08/450_Mayor_4.jpg',
    ],
    RealTimeAvailability: true,
    Policy: 'Vehicles are not permitted to remain parked on the premises for more than 24 hours. Any vehicle exceeding this limit may be subject to towing at the owner expense',
    LastUpdated: new Date().toISOString(),
    Rates: {
      HourlyRate: 5,
      DailyRate: 20,
      MonthlyRate: 150,
    },
    Facilities: {
      HandicapAccessible: true,
      EVChargingStations: 4,
    },
    VehicleTypes: [
      VehicleType.Car,
      VehicleType.Motorcycle,
      VehicleType.LargeTruck,
    ],
    PaymentOptions: [PaymentOption.CreditCard, PaymentOption.DebitCard],
    ReservationAvailable: true,
  };

  constructor() {}
}
