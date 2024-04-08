import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/models/users';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  uploading = false;
  user: UserDTO | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.uploading = true;
    this.userService.myUser.subscribe({
      next: (userData: UserDTO | null) => {
        this.uploading = false;
        if (userData) {
          this.user = userData;
        }
      },
      error: (err) => {
        this.uploading = false;
        console.error('Failed to subscribe to user data:', err);
      },
    });
  }
}
