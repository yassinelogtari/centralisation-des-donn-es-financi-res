import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout-user',
  templateUrl: './dashboard-layout-user.component.html',
  styleUrl: './dashboard-layout-user.component.css'
})
export class DashboardLayoutUserComponent {

  sideBarOpen=true;

  
  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen
  }
}
