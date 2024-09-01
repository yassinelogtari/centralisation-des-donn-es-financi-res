import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from '../services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-file-form',
  templateUrl: './update-file-form.component.html',
  styleUrls: ['./update-file-form.component.css']
})
export class UpdateFileFormComponent implements OnInit {
  fileForm: FormGroup;
  files: File[] = [];
  months: string[] = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  userTypes: string[] = ['STEG', 'SONED', 'CNSS'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<UpdateFileFormComponent>,
    private fileService: FileService,
    private snackBar: MatSnackBar,
    
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.fileForm = this.fb.group({
      name: [''],
      details: [''],
      companyName: [[]],
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

  ngOnInit() {
    if (this.data && this.data.id) {
      this.fileService.getFileById(this.data.id).subscribe(file => {
        this.fileForm.patchValue({
          name: file.name,
          details: file.details,
          companyName: file.userTypes || [],
          january: file.frequenceSaisie?.january || false,
          february: file.frequenceSaisie?.february || false,
          march: file.frequenceSaisie?.march || false,
          april: file.frequenceSaisie?.april || false,
          may: file.frequenceSaisie?.may || false,
          june: file.frequenceSaisie?.june || false,
          july: file.frequenceSaisie?.july || false,
          august: file.frequenceSaisie?.august || false,
          september: file.frequenceSaisie?.september || false,
          october: file.frequenceSaisie?.october || false,
          november: file.frequenceSaisie?.november || false,
          december: file.frequenceSaisie?.december || false
        });
      });
    }
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
  
      this.fileForm.get('companyName')?.value.forEach((userType: string) => {
        formData.append('userTypes', userType);
      });
  
      this.files.forEach(file => {
        formData.append('files', file);
      });
  

      this.months.forEach((month) => {
        const value = this.fileForm.get(month)?.value;
        formData.append(month, value ? 'true' : 'false');
      });
  
      this.fileService.updateFile(this.data.id, formData).subscribe(
        (response: any) => {
          console.log('Update successful', response);
          this.snackBar.open('File updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Update failed', error);
          this.snackBar.open('Failed to update file. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      );
    }
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}
