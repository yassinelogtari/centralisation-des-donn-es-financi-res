import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.css']
})
export class UserUploadComponent {
  selectedFiles: File[] = [];
  uploadProgress = 0;

  constructor(private http: HttpClient) { }

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

    this.http.post<any>('http://localhost:8090/api/file/filled', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round((100 * event.loaded));
            break;
          case HttpEventType.Response:
            console.log('Files uploaded successfully!', event.body)
            break;
        }
      }),
      catchError(error => {
        console.error('Error uploading files:', error);
        return of(`Upload failed: ${error}`);
      })
    ).subscribe();
  }
}
