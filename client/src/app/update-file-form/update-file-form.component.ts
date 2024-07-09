import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { FileFormComponent } from '../file-form/file-form.component';

@Component({
  selector: 'app-update-file-form',
  templateUrl: './update-file-form.component.html',
  styleUrl: './update-file-form.component.css'
})
export class UpdateFileFormComponent {

  fileForm: FormGroup;
  files: File[] = [];
  months: string[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<FileFormComponent>
  ) {
    this.fileForm = this.fb.group({
      name: [''],
      details: [''],
      january: [false],
      february: [false],
      march: [false],
      april: [false],
      may: [false],
      june: [false],
      july: [false],
      august: [false],
      september: [false],
      october: [false],
      november: [false],
      december: [false]
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
    }
  }

  onSubmit() {
    if (this.fileForm.valid) {
      const formData = new FormData();
      formData.append('name', this.fileForm.get('name')?.value);
      formData.append('details', this.fileForm.get('details')?.value);

      this.files.forEach(file => {
        formData.append('files', file);
      });

      this.months.forEach(month => {
        if (this.fileForm.get(month)?.value) {
          formData.append(month, this.fileForm.get(month)?.value.toString());
        }
      });

      this.http.post('http://localhost:8090/file', formData)
        .subscribe(
          (response: any) => {
            console.log('Upload successful', response);
            this.dialogRef.close();
          },
          (error: any) => {
            console.error('Upload failed', error);
          }
        );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
