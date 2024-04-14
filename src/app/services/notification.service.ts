import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppNotification } from '../models/notifications';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications = new BehaviorSubject<AppNotification[]>([]);

  constructor(private db: AngularFireDatabase) {}

  fetchNotification(notificationId: number): void {
    // Fetch the notification from the Firebase database by ID
    this.db
      .object<AppNotification>(`/notifications/${notificationId}`)
      .valueChanges()
      .subscribe(
        (notification) => {
          if (notification) {
            // Add the fetched notification to the stream if it's not already present
            this.addNotification(notification);
          }
        },
        (error) => {
          console.error('Error fetching notification:', error);
          // Handle the error appropriately
        }
      );
  }

  addNotification(notification: AppNotification): void {
    const currentNotifications = this.notifications.getValue();
    const existingNotification = currentNotifications.find(
      (notif) => notif.id === notification.id
    );

    // Only add the notification if it doesn't already exist in the array
    if (!existingNotification) {
      const updatedNotifications = [...currentNotifications, notification];
      this.notifications.next(updatedNotifications);
    }
  }

  clearNotification(notificationId: number): void {
    const updatedNotifications = this.notifications
      .getValue()
      .filter((notif) => notif.id !== notificationId);
    this.notifications.next(updatedNotifications);
  }

  getNotifications(): Observable<AppNotification[]> {
    return this.notifications.asObservable();
  }
}