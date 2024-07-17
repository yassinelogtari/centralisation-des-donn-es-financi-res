import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  username: string = '';
  constructor(private router: Router ,private userService: UserService) {}


  ngOnInit(): void {
    const user = this.userService.getUser();
    this.username = user.username;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}