import { Injectable } from '@angular/core';
import {
  DatabaseReference,
  get,
  getDatabase,
  ref,
  onValue,
} from 'firebase/database';
import {
  Authority,
  User,
  UserDTO,
} from '../models/users';
import { Database, remove, update } from '@angular/fire/database';
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
      let myUser = this.authService.getUser() as User;

      if (this.myUser) {
        const callback = (user: any) => {
          this.myUser = user;
          resolve();
        };
        if (myUser) {
          this.subscribeToPublicUser(myUser.uid, callback);
        }
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
   * Updates a user's data in the database based on their authority level.
   *
   * @param {any} index - The ID of the user to update.
   * @param {any} value - The new data for the user.
   * @throws Will throw an error if the update operation fails.
   */
  async editUser(index: any, value: any) {
    try {
      if (value.Authority == Authority.Public) {
        let myUser = value as UserDTO;
        const dbRef = ref(this.database, `public users/${index}`); // Reference to the specific user in the public users node
        await update(dbRef, myUser);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Deletes a user from the database based on their authority level.
   *
   * @param {any} User - The user object to delete.
   * @throws Will throw an error if the deletion operation fails.
   */
  async deleteUser(User: any) {
    try {
      if (User.Authority == Authority.Public) {
        const dbRef: DatabaseReference = ref(
          this.database,
          `public users/${User.ID}`
        );
        await remove(dbRef);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Subscribes to updates for a public user in the database.
   *
   * @param {string} userId - The ID of the user to subscribe to.
   * @param {function} callback - The function to call when the user's data updates.
   */
  async subscribeToPublicUser(
    userId: string,
    callback: (user: UserDTO | null) => void
  ) {
    const db = getDatabase();
    const userRef = ref(db, `public users/${userId}`);
    onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          this.updateUser(snapshot.val() as UserDTO);
          callback(snapshot.val() as UserDTO);
        } else {
          callback(null);
        }
      },
      {
        onlyOnce: false,
      }
    );
  }
}
