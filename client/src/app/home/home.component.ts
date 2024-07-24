import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  fileCount: number = 0;
  userCount: number = 0;
  filleFilledCount:number=0;

  constructor(
    private fileService: FileService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchFileCount();
    this.fetchUserCount();
    this.fetchFileFilledCount()
  }

  fetchFileCount(): void {
    this.fileService.getFileCount().subscribe(
      (count: number) => {
        this.fileCount = count;
      },
      (error: any) => {
        console.error('Error fetching file count', error);
      }
    );
  }

  fetchFileFilledCount(): void {
    this.fileService.getFileFilledCount().subscribe(
      (FilledCount: number) => {
        this.filleFilledCount = FilledCount;
      },
      (error: any) => {
        console.error('Error fetching file count', error);
      }
    );
  }


  fetchUserCount(): void {
    this.userService.getUserCount().subscribe(
      (count: number) => {
        this.userCount = count;
      },
      (error: any) => {
        console.error('Error fetching user count', error);
      }
    );
  }
}
