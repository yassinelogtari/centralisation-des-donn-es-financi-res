import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HomeUserComponent } from './userdashboard/home-user/home-user.component';
import { DashboardLayoutUserComponent } from './userdashboard/dashboard-layout-user/dashboard-layout-user.component';
import { EditAccountUserComponent } from './userdashboard/edit-account-user/edit-account-user.component';
import { FilesUserComponent } from './userdashboard/files-user/files-user.component';
import { UsersComponent } from './users/users.component';

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
    ],
  },
  {
    path: 'dashboardUser',
    component: DashboardLayoutUserComponent,
    children: [
      { path: 'home-user/:userType', component: HomeUserComponent },
      { path: 'files-user/:userType', component: FilesUserComponent },
      {
        path: 'edit-account-user/:userType',
        component: EditAccountUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
