import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { get, getDatabase, onValue, ref } from 'firebase/database';
import { Reservation } from '../models/reservations';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';

/**
 * Service responsible for managing operations related to reservations,
 * including fetching reservation data, subscribing to changes, and
 * providing data to components throughout the application.
 *
 * @export
 * @class ReservationService
 */
@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private reservationsSubject: BehaviorSubject<Reservation[] | null> =
    new BehaviorSubject<Reservation[] | null>(null);
  reservations$: Observable<Reservation[] | null> =
    this.reservationsSubject.asObservable();

  private reservationSubject: BehaviorSubject<Reservation | null> =
    new BehaviorSubject<Reservation | null>(null);
  reservation$: Observable<Reservation | null> =
    this.reservationSubject.asObservable();

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.subscribeToReservations();
  }

  /**
   * Fetches details of a single reservation by its unique ID.
   *
   * @param {string} reservationId - The unique identifier of the reservation.
   * @return {*}  {Promise<Reservation>} - A promise that resolves with the reservation details.
   */
  async getReservation(reservationId: string): Promise<Reservation> {
    try {
      const db = getDatabase();
      const reservationRef = ref(db, `reservations/${reservationId}`);
      const reservationSnapshot = await get(reservationRef);

      if (reservationSnapshot.exists()) {
        const reservation = reservationSnapshot.val() as Reservation;
        this.reservationSubject.next(reservation); // Update the BehaviorSubject
        return reservation;
      } else {
        throw new Error('Reservation not found');
      }
    } catch (error) {
      console.error('Error getting reservation:', error);
      throw error;
    }
  }

  /**
   * Subscribes to changes in the list of reservations and updates the
   * BehaviorSubject with the latest data.
   */
  subscribeToReservations() {
    const db = getDatabase();
    const reservationsRef = ref(db, 'reservations');

    onValue(reservationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const reservationsData = snapshot.val();
        const reservations: Reservation[] = Object.keys(reservationsData).map(
          (key) => ({
            ...reservationsData[key],
            id: key, // Include the reservation ID in each reservation object
          })
        );
        this.reservationsSubject.next(reservations);
      } else {
        this.reservationsSubject.next(null);
      }
    });
  }

  /**
   * Fetches reservations for a specific user.
   *
   * @param {string} userId - The unique identifier of the user.
   * @return {*}  {Observable<Reservation[]>} - An observable with the reservations for the user.
   */
  getReservationsForUser(userId: string) {
    return this.db
      .list<Reservation>('reservations', (ref) =>
        ref.orderByChild('userId').equalTo(userId)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            ...(c.payload.val() as Reservation),
          }))
        )
      );
  }
}
