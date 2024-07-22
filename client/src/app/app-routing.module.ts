import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HomeUserComponent } from './userdashboard/home-user/home-user.component';
import { DashboardLayoutUserComponent } from './userdashboard/dashboard-layout-user/dashboard-layout-user.component';
import { FilesUserComponent } from './userdashboard/files-user/files-user.component';
import { UsersComponent } from './users/users.component';
import { FilledFilesComponent } from './filled-files/filled-files.component';
import { ChangePasswordComponent } from './userdashboard/change-password/change-password.component';

const userType = localStorage.getItem('userType');

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'home-user', component: HomeUserComponent },
      { path: 'files', component: DashboardComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'filled-files', component: FilledFilesComponent },
    ],
  },
  {
    path: 'dashboardUser',
    component: DashboardLayoutUserComponent,
    children: [
      { path: `home-user/:userType`, component: HomeUserComponent },
      { path: `files-user/:userType`, component: FilesUserComponent },
      { path: `changePassword-user/:userType`, component: ChangePasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
