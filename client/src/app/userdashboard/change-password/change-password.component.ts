import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  hideCurrent = true;
  hideNew = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const formValue = this.changePasswordForm.value;
      const user = this.userService.getUser();
      const payload = {
        userId: user.id,
        currentPassword: formValue.currentPassword,
        newPassword: formValue.newPassword
      };

      this.userService.changePassword(payload).subscribe(
        response => {
          alert(response.message); // Display the response message
          this.router.navigate([`dashboardUser/home-user/${user.userType}`]); // Navigate to the route with userType
        },
        error => {
          alert('Error changing password: ' + error.error.message); // Display the error message
        }
      );
    }
  }
}
