import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent {
  spotIds: string[] = ['1A', '1B', '1C', '1D'];
  timeSlots: string[] = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
    '08:00 PM - 10:00 PM',
  ];

  selectedSpotId: string = this.spotIds[0];
  selectedTimeSlot: string = this.timeSlots[0];

  constructor(private router: Router) {}

  reserveSpot() {
    Swal.fire({
      title: 'Confirm Reservation',
      text: `Reserve spot ID ${this.selectedSpotId} for ${this.selectedTimeSlot}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reserve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Spot Reserved');
        Swal.fire(
          'Reserved!',
          'Your reservation has been confirmed.',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['history-list']);
          }
        });
      }
    });
  }
}