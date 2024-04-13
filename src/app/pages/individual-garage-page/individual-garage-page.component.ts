import { Component, OnInit } from '@angular/core';
import { GarageDTO } from '../../models/garages';
import { GarageService } from 'src/app/services/garage.service';
import { ParkingMapComponent } from '../parking-map/parking-map.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individual-garage-page',
  templateUrl: './individual-garage-page.component.html',
  styleUrls: ['./individual-garage-page.component.scss'],
})
export class IndividualGaragePageComponent implements OnInit {
  garage: GarageDTO | null = null;
  isLoading: boolean = true;

  constructor(
    private garageService: GarageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Use the ActivatedRoute to get the garage ID from the route parameters
    const garageId = this.route.snapshot.paramMap.get('id');
    if (garageId) {
      this.loadGarage(garageId);
    } else {
      console.error('No garage ID provided in route.');
      // Handle the case where no ID is provided or redirect
      this.isLoading = false;
    }
  }

  loadGarage(garageId: string): void {
    this.isLoading = true;
    this.garageService
      .getGarage(garageId)
      .then((garageData) => {
        this.garage = garageData;
        console.log('Garage:', this.garage);
        garageData.VehicleTypes = Object.values(garageData.VehicleTypes);
        if (typeof garageData.OpeningHours === 'string') {
          garageData.OpeningHours = (garageData.OpeningHours as string).split(
            ', '
          );
        }
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error loading the garage data:', error);
        this.isLoading = false;
      });
  }

  redirectToReservationPage(): void {
    console.log("Not implemented yet");
  
  }
}

/*
  garage: GarageDTO = {
    GarageID: 'G001',
    GarageName: 'Laurent-Garage',
    Address: '3131 blvd Cote Vertu , Saint-laurent, QC H4R 1Y8',
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
    Policy:
      'Vehicles are not permitted to remain parked on the premises for more than 24 hours. Any vehicle exceeding this limit may be subject to towing at the owner expense',
   // LastUpdated: new Date().toISOString(),
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
  };*/
