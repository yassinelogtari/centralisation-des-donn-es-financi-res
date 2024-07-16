import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.valid) {
      const { email, mdp } = this.loginForm.value;
      this.authService.login(email, mdp).subscribe(
        response => {
          console.log(response);
          if (response.role === 'ADMIN') {
            this.router.navigate(['/dashboard/home']);
          } else if (response.role === 'USER') {
            this.router.navigate([`/dashboardUser/home-user/${response.userType}`]);
          }
        },
        error => {
          alert('Invalid email or password');
        }
      );
    }
  }
}
