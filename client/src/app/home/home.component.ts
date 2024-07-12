import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Corrected property name
})
export class HomeComponent implements OnInit {
  fileCount: number = 0;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.fetchFileCount();
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
}
