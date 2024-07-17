import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../File';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'email', 'username', 'role', 'userType'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.dataSource.data = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
