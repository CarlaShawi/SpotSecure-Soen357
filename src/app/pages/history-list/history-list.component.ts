import { Component } from '@angular/core';
import { Reservation } from 'src/app/models/reservations';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent {
  reservations: Reservation[] = [
    {
      id: 1,
      spotNumber: 101,
      timeSlot: '08:00 AM - 09:00 AM',
      isActive: true,
      paid: '2.50$',
    },
    {
      id: 2,
      spotNumber: 102,
      timeSlot: '09:00 AM - 10:00 AM',
      isActive: false,
      paid: '2.50$',
    },
    {
      id: 3,
      spotNumber: 103,
      timeSlot: '10:00 AM - 11:00 AM',
      isActive: false,
      paid: '2.50$',
    },
  ];
}
