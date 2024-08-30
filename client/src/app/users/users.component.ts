import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../File';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletConfiramtionComponent } from '../delet-confiramtion/delet-confiramtion.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'email', 'username', 'role', 'userType', 'action']; // Ajoutez 'action' ici
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,  // Injection de MatDialog
    private snackBar: MatSnackBar // Injection de MatSnackBar pour les notifications
  ) {}

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

  deleteUser(userId: number): void {
    const dialogRef = this.dialog.open(DeletConfiramtionComponent); // Utilisez dialog.open()

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            this.snackBar.open('Utilisateur supprimé avec succès', 'Fermer', { duration: 3000 });
            this.fetchUsers(); // Rafraîchissez la liste des utilisateurs après suppression
          },
          (error) => {
            console.error(error);
            this.snackBar.open('Échec de la suppression de l\'utilisateur', 'Fermer', { duration: 3000 });
          }
        );
      }
    });
  }
}
