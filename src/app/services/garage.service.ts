import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { GarageDTO } from '../models/garages';
import { BehaviorSubject, Observable } from 'rxjs';
import { get, getDatabase, onValue, ref, set } from 'firebase/database';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

/**
 * Service responsible for managing operations related to garages, including
 * fetching garage data, subscribing to changes, and providing data to
 * components throughout the application.
 *
 * @export
 * @class GarageService
 */

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  /**
   * BehaviorSubject to hold the list of garages. Subscribers will receive
   * updates whenever there is a change in the list of garages.
   *
   * @private
   * @type {(BehaviorSubject<GarageDTO[] | null>)}
   * @memberof GarageService
   */
  private garagesSubject: BehaviorSubject<GarageDTO[] | null> =
    new BehaviorSubject<GarageDTO[] | null>(null);
  garages$: Observable<GarageDTO[] | null> = this.garagesSubject.asObservable();

  /**
   * BehaviorSubject to hold details of a single garage. Subscribers will
   * receive updates whenever there is a change in the details of the garage.
   *
   * @private
   * @type {(BehaviorSubject<GarageDTO | null>)}
   * @memberof GarageService
   */
  private garageSubject: BehaviorSubject<GarageDTO | null> =
    new BehaviorSubject<GarageDTO | null>(null);
  garage$: Observable<GarageDTO | null> = this.garageSubject.asObservable();

  /**
   * Creates an instance of GarageService.
   * @param {AuthService} authService
   * @param {StorageService} storageService
   * @memberof GarageService
   */
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.subscribeToGarages();
  }

  /**
   * Fetches details of a single garage by its unique ID.
   *
   * @param {string} garageId - The unique identifier of the garage.
   * @return {*}  {Promise<GarageDTO>} - A promise that resolves with the garage details.
   * @memberof GarageService
   */
  async getGarage(garageId: string): Promise<GarageDTO> {
    try {
      const db = getDatabase();
      const garageRef = ref(db, `garages/${garageId}`);
      const garageSnapshot = await get(garageRef);

      if (garageSnapshot.exists()) {
        const garage = garageSnapshot.val() as GarageDTO;
        return garage;
      } else {
        throw new Error('Garage not found');
      }
    } catch (error) {
      console.error('Error getting Garage:', error);
      throw error;
    }
  }

  /**
   * Subscribes to changes in the list of garages and updates the
   * BehaviorSubject with the latest data.
   *
   * @memberof GarageService
   */
  subscribeToGarages() {
  const db = getDatabase();
  const garagesRef = ref(db, 'garages');

  onValue(garagesRef, (snapshot) => {
    if (snapshot.exists()) {
      const garagesData = snapshot.val();
      const garages: GarageDTO[] = Object.keys(garagesData).map(key => ({
        ...garagesData[key],
        GarageID: key // Include the GarageID in each garage object
      }));
      this.garagesSubject.next(garages);
    } else {
      this.garagesSubject.next(null);
    }
  });
}
}