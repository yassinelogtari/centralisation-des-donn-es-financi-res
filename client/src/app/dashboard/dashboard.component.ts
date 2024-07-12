import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileFormComponent } from '../file-form/file-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { File } from '../File';
import { FileService } from '../services/file.service';
import { UpdateFileFormComponent } from '../update-file-form/update-file-form.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['ref','filename','userType','january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'actions'];
  dataSource = new MatTableDataSource<File>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _dialog: MatDialog, private fileService: FileService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchFiles();
  }

  fetchFiles(): void {
    this.fileService.getFiles().subscribe(files => {
      this.dataSource.data = files.map((file: File) => ({
        ...file,
        january: file.frequenceSaisie.january ? '✓' : '',
        february: file.frequenceSaisie.february ? '✓' : '',
        march: file.frequenceSaisie.march ? '✓' : '',
        april: file.frequenceSaisie.april ? '✓' : '',
        may: file.frequenceSaisie.may ? '✓' : '',
        june: file.frequenceSaisie.june ? '✓' : '',
        july: file.frequenceSaisie.july ? '✓' : '',
        august: file.frequenceSaisie.august ? '✓' : '',
        september: file.frequenceSaisie.september ? '✓' : '',
        october: file.frequenceSaisie.october ? '✓' : '',
        november: file.frequenceSaisie.november ? '✓' : '',
        december: file.frequenceSaisie.december ? '✓' : '',
      }));
    });
  }

  openAddFileForm(): void {
    const dialogRef = this._dialog.open(FileFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchFiles();
    });
  }

  openUpdateFileForm():void {
    this._dialog.open(UpdateFileFormComponent)
  }

  deleteFile(id: number): void {
    this.fileService.deleteFile(id).subscribe(() => {
      this.fetchFiles();
    });
  }
  downloadFile(id: number): void {
    const file = this.dataSource.data.find(f => f.ref === id);
    if (file) {
      this.fileService.downloadFile(id).subscribe(blob => {
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
