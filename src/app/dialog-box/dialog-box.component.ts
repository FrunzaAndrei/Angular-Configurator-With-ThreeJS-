import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-box',
  templateUrl: 'dialog-box.component.html',
})
export class GenericDialogBox {
  public currentComponent = undefined;
  public currentDialog = undefined;

  constructor(
    public dialogRef: MatDialogRef<GenericDialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentComponent = data.component;
      this.currentDialog = this;
    }

  callback(user){
    this.data.callback(user);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
