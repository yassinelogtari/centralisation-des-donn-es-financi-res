import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilledFileService } from '../services/filled-file.service';
import { ChangeDetectorRef } from '@angular/core';
import { FilledFile } from '../File';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filled-files',
  templateUrl: './filled-files.component.html',
  styleUrls: ['./filled-files.component.css'],
  providers: [DatePipe]
})
export class FilledFilesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'filename', 'userType', 'uploadDate', 'actions'];
  dataSource = new MatTableDataSource<FilledFile>();

  constructor(
    private filledFileService: FilledFileService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.filledFileService.getFilledFiles().subscribe((data: FilledFile[]) => {
    
      this.dataSource.data = data.map(file => ({
        ...file,
        uploadDate: this.datePipe.transform(file.uploadDate, 'dd/MM/yyyy') || '' // Use empty string if null
      }));
      this.cdr.detectChanges();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadFile(id: number): void {
    const file = this.dataSource.data.find(f => f.id === id);
    if (file) {
      this.filledFileService.downloadFilledFile(id).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.filename;
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
}
