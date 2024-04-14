import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/users';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';
import { AppNotification } from 'src/app/models/notifications';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName = '';
  hasUnreadNotifications: boolean = false;
  notifications: AppNotification[] = [];
  private notificationsSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userService.myUser.subscribe((userDetails: UserDTO | null) => {
          this.userName = userDetails ? userDetails.Email : '';
          this.notificationService.fetchNotification(1);
        });
      } else {
        this.isLoggedIn = false;
        this.notifications = [];
      }
    });

    this.notificationsSubscription = this.notificationService
      .getNotifications()
      .subscribe((notifications: AppNotification[]) => {
        this.notifications = notifications;
        this.hasUnreadNotifications = notifications.length > 0;
      });
  }

  ngOnDestroy(): void {
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
  }

  onNotificationClick(notificationId: number): void {
    this.notificationService.clearNotification(notificationId);
  }

  async logOut() {
    this.userService.updateUser(null);
    await this.authService.SignOut();
  }
}
