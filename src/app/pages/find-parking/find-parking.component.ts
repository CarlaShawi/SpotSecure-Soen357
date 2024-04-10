import { Component } from '@angular/core';

@Component({
  selector: 'app-find-parking',
  templateUrl: './find-parking.component.html',
  styleUrls: ['./find-parking.component.scss'],
})
export class FindParkingComponent {
  address: string = '';
  searchResults: string[] = [];

  constructor() {}

  searchParking(): void {
    if (this.address.trim() !== '') {
      // Hardcoded parking data for demonstration
      this.searchResults = [
        'Parking Lot A',
        'Parking Lot B',
        'Street Parking on Main St',
        'Parking Garage C',
        'Parking Lot D',
      ];
    } else {
      // Clear search results if address is empty
      this.searchResults = [];
    }
  }
}
