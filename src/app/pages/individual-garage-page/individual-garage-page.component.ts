import { Component, OnInit } from '@angular/core';
import { GarageDTO } from '../../models/garages';
import { GarageService } from 'src/app/services/garage.service';
import { ParkingMapComponent } from '../parking-map/parking-map.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
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
    this.router.navigate(['/reservation']);
}
}
