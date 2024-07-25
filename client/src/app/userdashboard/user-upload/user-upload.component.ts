import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.css']
})
export class UserUploadComponent {
  selectedFiles: File[] = [];
  uploadProgress = 0;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
    }
  }

  uploadFiles() {
    const formData = new FormData();

    for (let file of this.selectedFiles) {
      formData.append('files', file);
    }

    const user = JSON.parse(localStorage.getItem('user')!);
    const userType = user.userType;

    formData.append('userType', userType);

    this.http.post<any>('http://localhost:8090/api/file/filled', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round((100 * event.loaded) / event.total!);
            break;
          case HttpEventType.Response:
            const messages = event.body.messages;
            messages.forEach((message: string) => {
              let config = new MatSnackBarConfig();
              config.duration = 5000;
              config.verticalPosition = 'top';
              config.horizontalPosition = 'center';

              if (message.startsWith("Files uploaded successfully!") || message.startsWith("Files uploaded successfully!")) {
                config.panelClass = ['snackbar-success'];
              } else if (message.startsWith("No matching normal file")) {
                config.panelClass = ['snackbar-error'];
              }

              this.snackBar.open(message, 'Close', config);
            });
            console.log('Files uploaded successfully!', event.body);
            break;
        }
      }),
      catchError(error => {
        console.error('Error uploading files:', error);
        this.snackBar.open('Error uploading files', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-error']
        });
        return of(`Upload failed: ${error}`);
      })
    ).subscribe();
  }
}
