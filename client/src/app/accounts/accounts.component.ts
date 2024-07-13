import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  userForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private userService: AuthService, private router: Router) {
    this.userForm = this.fb.group({
      email: [''],
      username: [''],
      mdp: [''],
      role: [''],
      userType: [{ value: '', disabled: true }]
    });
  }

 

  ngOnInit(): void {
    this.userForm.get('role')!.valueChanges.subscribe(role => {
      const userTypeControl = this.userForm.get('userType')!;
      if (role === 'USER') {
        userTypeControl.enable();
      } else {
        userTypeControl.disable();
        userTypeControl.setValue('');
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/dashboard/home']);
        },
        error => {
          console.error('Error during registration', error);
         
        }
      );
    }
  }
}
