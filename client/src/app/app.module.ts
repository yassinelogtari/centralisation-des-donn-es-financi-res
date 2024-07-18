import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { FileFormComponent } from './file-form/file-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdateFileFormComponent } from './update-file-form/update-file-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AccountsComponent } from './accounts/accounts.component';
import { HomeUserComponent } from './userdashboard/home-user/home-user.component';
import { HeaderUserComponent } from './userdashboard/header-user/header-user.component';
import { SidenavUserComponent } from './userdashboard/sidenav-user/sidenav-user.component';
import { DashboardLayoutUserComponent } from './userdashboard/dashboard-layout-user/dashboard-layout-user.component';
import { FilesUserComponent } from './userdashboard/files-user/files-user.component';
import { EditAccountUserComponent } from './userdashboard/edit-account-user/edit-account-user.component';
import { UserUploadComponent } from './userdashboard/user-upload/user-upload.component';
import { DeletConfiramtionComponent } from './delet-confiramtion/delet-confiramtion.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { UsersComponent } from './users/users.component';
import { FilledFilesComponent } from './filled-files/filled-files.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    FileFormComponent,
    UpdateFileFormComponent,
    LoginComponent,
    DashboardLayoutComponent,
    AccountsComponent,
    HomeUserComponent,
    HeaderUserComponent,
    SidenavUserComponent,
    DashboardLayoutUserComponent,
    FilesUserComponent,
    EditAccountUserComponent,
    UserUploadComponent,
    DeletConfiramtionComponent,
    UsersComponent,
    FilledFilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    TableModule,
    InputTextModule,
    ButtonModule, 
    AvatarModule,
  ],
  providers: [provideAnimationsAsync(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
