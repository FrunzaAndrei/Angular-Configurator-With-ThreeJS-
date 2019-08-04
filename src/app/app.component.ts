import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GenericDialogBox } from './dialog-box/dialog-box.component';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'configuratorThreeJS';
  currentUser = undefined;

  constructor(private dialog : MatDialog, private _router: Router){}

  openDialog(component): void {
    const dialogRef = this.dialog.open(GenericDialogBox, {
      width: '250px',
      data: {component: component, dialog: this.dialog, callback: this.setCurrentUser.bind(this)}
    });
  }

  setCurrentUser(user){
    this.currentUser = user;
  }

  signOut(){
    this.currentUser = '';
    this._router.navigate(['home']);
  }

}
