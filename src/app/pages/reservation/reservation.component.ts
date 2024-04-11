import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent {
  numberOfSpots: number[] = Array.from({ length: 10 }, (_, i) => i + 1); // 10 spots for example
  timeSlots: string[] = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
  ];

  selectedSpot: number = this.numberOfSpots[0];
  selectedTimeSlot: string = this.timeSlots[0];

  reserveSpot() {
    Swal.fire({
      title: 'Confirm Reservation',
      text: `Reserve ${this.selectedSpot} spot(s) for ${this.selectedTimeSlot}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reserve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Here you would handle the reservation logic, like sending data to a server
        Swal.fire(
          'Reserved!',
          'Your reservation has been confirmed.',
          'success'
        );
      }
    });
  }
}
