import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilledFileService } from '../services/filled-file.service';
import { ChangeDetectorRef } from '@angular/core';
import { FilledFile } from '../File';


@Component({
  selector: 'app-filled-files',
  templateUrl: './filled-files.component.html',
  styleUrls: ['./filled-files.component.css'],
})
export class FilledFilesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'filename', 'uploadDate','actions'];
  dataSource = new MatTableDataSource<FilledFile>();

  constructor(
    private filledFileService: FilledFileService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.filledFileService.getFilledFiles().subscribe((data: FilledFile[]) => {
      this.dataSource.data = data;
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
