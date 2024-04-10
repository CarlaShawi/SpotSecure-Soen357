// parking-results.component.ts
import { Component, NgModule } from '@angular/core'; // Import NgModule
import { CommonModule } from '@angular/common';

export class ParkingResultsModule {} // Add ParkingResultsModule

@Component({
  selector: 'app-parking-results',
  templateUrl: './parking-results.component.html',
  styleUrls: ['./parking-results.component.scss'],
})
export class ParkingResultsComponent {
  parkingData = [
    {
      name: 'Parking Pepsi',
      address: '3595 Boulevard Cote Vertu Ouest, Saint-Laurent, Quebec H4R 2M3',
      distance: '738 M',
      status: 'Available',
      rate: '$20/hr',
      image:
        'https://relightdepot.com/product_images/uploaded_images/relightdepot-lighting-layout-parking-garage.jpg',
    },
    {
      name: 'Stationnement Rodimax Parking',
      address: '35 Rue de Port-Royal E, Montréal, QC H3L 3T1',
      distance: '0.9 km',
      status: 'Not available',
      rate: '$35/hr',
      image:
        'https://fsclighting.com/wp-content/uploads/2022/07/UCT-LJ11-1024x768.jpeg',
    },
    {
      name: 'Stationnement Indigo',
      address: '650 Boulevard Marcel-Laurin, Saint-Laurent, QC H4M 0A1',
      distance: '2.1 km',
      status: 'Available',
      rate: '$25/hr',
      image:
        'https://www.primelights.com/cdn/shop/collections/parkinggarage.jpg?v=1637084024',
    },
  ];
  addresses = this.parkingData.map((parking) => parking.address); // Array of all addresses
  constructor() {}

  ngOnInit(): void {}
}
