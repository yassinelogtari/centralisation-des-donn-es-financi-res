import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  mdp: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.mdp).subscribe(
      (response) => {
        console.log(response)
        if (response.role === 'ADMIN') {
          this.router.navigate(['/dashboard/home']);
        } else if (response.role === 'USER') {
          alert('You are a normal user');
        }
      },
      (error) => {
        alert('Invalid email or password');
      }
    );
  }
}
