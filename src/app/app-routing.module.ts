import { LoginComponent } from './pages/login/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/login/register/register.component';
import { AuthguardGuard } from './services/auth.guard';
import { VerifyEmailComponent } from './pages/login/verify-email/verify-email.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { FindParkingComponent } from './pages/find-parking/find-parking.component';
import { IndividualGaragePageComponent } from './pages/individual-garage-page/individual-garage-page.component';
import { ParkingResultsComponent } from './pages/parking-results/parking-results.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { HistoryListComponent } from './pages/history-list/history-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthguardGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },

  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'find-parking',
    component: FindParkingComponent,
  },
  {
    path: 'parking-results',
    component: ParkingResultsComponent,
  },
  {
    path: 'garage/:id',
    component: IndividualGaragePageComponent,
  },
  {
    path: 'reservation',
    component: ReservationComponent,
  },
  {
    path: 'history-list',
    component: HistoryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
