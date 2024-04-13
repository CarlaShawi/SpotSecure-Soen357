import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-parking',
  templateUrl: './find-parking.component.html',
  styleUrls: ['./find-parking.component.scss'],
})
export class FindParkingComponent {
  constructor(private router: Router) {}

  navigateToParkingResults(): void {
    // Navigate to the parking-results page
    this.router.navigate(['/parking-results']);
  }
}
