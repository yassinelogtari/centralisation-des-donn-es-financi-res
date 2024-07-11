import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  sideBarOpen=true;

  

  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen
  }
}
