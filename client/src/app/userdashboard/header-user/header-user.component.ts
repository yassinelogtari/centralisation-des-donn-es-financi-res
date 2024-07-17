import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css',
})
export class HeaderUserComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  username: string = '';

  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    const user = this.userService.getUser();
    this.username = user.username;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
