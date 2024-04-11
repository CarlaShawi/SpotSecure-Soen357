// parking-results.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageDTO } from 'src/app/models/garages';
import { GarageService } from 'src/app/services/garage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-results',
  templateUrl: './parking-results.component.html',
  styleUrls: ['./parking-results.component.scss'],
})
export class ParkingResultsComponent implements OnInit {
  garages: GarageDTO[] | null = null;

  constructor(private garageService: GarageService, private router: Router) {}

  ngOnInit(): void {
    this.garageService.garages$.subscribe(
      (data) => {
        if (data && typeof data === 'object') {
          this.garages = Object.values(data);
        } else {
          this.garages = data;
        }
      },
      (error) => {
        console.error('Error fetching garages:', error);
      }
    );
  }
  navigateToGarage(garageId: string): void {
    console.log('Navigating to Garage with ID:', garageId);
    this.router.navigate(['/garage', garageId]);
  }
}