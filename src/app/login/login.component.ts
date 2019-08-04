import { Component, OnInit, Input } from '@angular/core';
import { GenericDialogBox } from '../dialog-box/dialog-box.component';
import { FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() currentDialog : GenericDialogBox;

  email = new FormControl('', [Validators.required, Validators.email]);
  public currentUser = undefined;
  hide = true;

  constructor(private _router: Router) {
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  login(user){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(res =>{
          this.currentUser =  res.user;
          if(this.currentUser) {
            this.currentDialog.closeDialog();
            this.currentDialog.callback(this.currentUser);
            this._router.navigate(['/webGL']);
          }
    })
   }

   
}
