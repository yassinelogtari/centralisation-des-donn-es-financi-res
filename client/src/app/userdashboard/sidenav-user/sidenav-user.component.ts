import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-sidenav-user',
  templateUrl: './sidenav-user.component.html',
  styleUrl: './sidenav-user.component.css'
})
export class SidenavUserComponent implements OnInit {

  userType: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userType = user.userType;
    }
  }

}
