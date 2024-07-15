import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delet-confiramtion',
  templateUrl: './delet-confiramtion.component.html',
  styleUrl: './delet-confiramtion.component.css'
})
export class DeletConfiramtionComponent {

  constructor(public dialogRef: MatDialogRef<DeletConfiramtionComponent>) {}
}
