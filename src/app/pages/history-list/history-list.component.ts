import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservations';
import { ReservationsService } from 'src/app/services/reservations.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements OnInit {
  reservations$!: Observable<Reservation[]>; // Observable to hold the reservation data

  constructor(
    private reservationsService: ReservationsService,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    //Get the user ID from the AuthService
    const user = this.authService.getUser();
    if (user !== null) {
      this.reservations$ = this.reservationsService.getReservationsForUser(
        user.uid
      );
    } else {
      console.error('User not logged in');
      this.authService.SignOut(); // Or navigate to login
    }
  }
}