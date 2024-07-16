import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../services/file.service';
import { File } from '../../File';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileFormComponent } from '../../file-form/file-form.component';
import { UserUploadComponent } from '../user-upload/user-upload.component';

@Component({
  selector: 'app-files-user',
  templateUrl: './files-user.component.html',
  styleUrls: ['./files-user.component.css'],
})
export class FilesUserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'ref',
    'filename',
    'userType',
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
    'actions',
  ];
  dataSource = new MatTableDataSource<File>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private fileService: FileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userType = params['userType'];
      this.fetchFilesByUserType(userType);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddFileForm(): void {
    const dialogRef = this._dialog.open(UserUploadComponent);
    dialogRef.afterClosed().subscribe(() => {});
  }

  fetchFilesByUserType(userType: string): void {
    this.fileService.getFilesByUserType(userType).subscribe((files) => {
      this.dataSource.data = files.map((file: any) => ({
        ...file,
        january: file.january ? '✓' : '',
        february: file.february ? '✓' : '',
        march: file.march ? '✓' : '',
        april: file.april ? '✓' : '',
        may: file.may ? '✓' : '',
        june: file.june ? '✓' : '',
        july: file.july ? '✓' : '',
        august: file.august ? '✓' : '',
        september: file.september ? '✓' : '',
        october: file.october ? '✓' : '',
        november: file.november ? '✓' : '',
        december: file.december ? '✓' : '',
      }));
    });
  }

  downloadFile(id: number): void {
    const file = this.dataSource.data.find((f) => f.ref === id);
    if (file) {
      this.fileService.downloadFile(id).subscribe((blob) => {
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
