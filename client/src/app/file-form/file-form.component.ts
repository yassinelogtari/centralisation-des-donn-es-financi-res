import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css'],
})
export class FileFormComponent implements OnInit {
  fileForm: FormGroup;
  files: File[] = [];
  months: string[] = [
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
  ];
  userTypes: string[] = ['STEG', 'SONED', 'CNSS']; // Add the UserType values here

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<FileFormComponent>
  ) {
    this.fileForm = this.fb.group({
      name: [''],
      details: [''],
      companyName: [''], // Add the company name field here
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
      december: [false],
    });
  }

  ngOnInit(): void {
    // Initialization code if needed
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
      formData.append('userType', this.fileForm.get('companyName')?.value); // Add the userType to the form data

      this.files.forEach((file) => {
        formData.append('files', file);
      });

      this.months.forEach((month) => {
        if (this.fileForm.get(month)?.value) {
          formData.append(month, this.fileForm.get(month)?.value.toString());
        }
      });

      this.http.post('http://localhost:8090/api/file', formData).subscribe(
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
