import { Injectable } from '@angular/core';
import {
  get,
  getDatabase,
  ref,
  onValue,
} from 'firebase/database';
import {
  UserDTO,
} from '../models/users';
import { Database} from '@angular/fire/database';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  myUser = this.myUserSubject.asObservable();

  constructor(private database: Database, private authService: AuthService) {
    this.getUser();
  }

  /**
   * Updates and broadcasts the current user's information.
   *
   * @param {UserDTO | null} user - The updated user data.
   */
  updateUser(user: UserDTO | null) {
    this.myUserSubject.next(user);
  }

  /**
   * Retrieves and updates the current user's information based on their authority level.
   *
   * @returns A Promise that resolves when the user's information has been updated.
   */
  getUser() {
    return new Promise<void>((resolve) => {
      const myUser = this.authService.getUser();
      if (myUser) {
        this.subscribeToPublicUser(myUser.uid, (user: UserDTO | null) => {
          this.updateUser(user);
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * Retrieves a public user's data from the database.
   *
   * @param {string} userId - The ID of the user to retrieve.
   * @returns A Promise that resolves to the user's data as a `UserDTO` object, or `null` if the user does not exist.
   */
  async getPublicUser(userId: string): Promise<UserDTO | null> {
    try {
      const db = getDatabase();
      const userRef = ref(db, `public users/${userId}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        return userSnapshot.val() as UserDTO;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }


  /**
   * Subscribes to updates for a public user in the database.
   *
   * @param {string} userId - The ID of the user to subscribe to.
   * @param {function} callback - The function to call when the user's data updates.
   */
  subscribeToPublicUser(
    userId: string,
    callback: (user: UserDTO | null) => void
  ) {
    const db = getDatabase();
    const userRef = ref(db, `public users/${userId}`);
    onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const userDto = snapshot.val() as UserDTO;
          this.updateUser(userDto);
          if (callback) {
            callback(userDto);
          }
        } else {
          this.updateUser(null);
          if (callback) {
            callback(null);
          }
        }
      },
      {
        onlyOnce: false,
      }
    );
  }
}
