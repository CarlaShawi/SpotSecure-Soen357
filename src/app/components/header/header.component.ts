import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  showMenu: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userService.myUser.subscribe((userDetails: UserDTO | null) => {
          this.userName = userDetails ? userDetails.Email : '';
        });
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  async logOut() {
    this.userService.updateUser(null);
    await this.authService.SignOut();
  }
}