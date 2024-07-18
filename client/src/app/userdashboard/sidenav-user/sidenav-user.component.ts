import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-sidenav-user',
  templateUrl: './sidenav-user.component.html',
  styleUrls: ['./sidenav-user.component.css']
})
export class SidenavUserComponent implements OnInit {
  userType: string = '';
  logoUrl: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userType = user.userType;
      this.setLogoUrl();
    }
  }

  setLogoUrl(): void {
    if (this.userType === 'STEG') {
      this.logoUrl = 'assets/STEG.png';
    } else if (this.userType === 'SONED') {
      this.logoUrl = '/assets/SONED.png';
    } else {
      this.logoUrl = '/assets/CNSS.png';
    }
  }
}
