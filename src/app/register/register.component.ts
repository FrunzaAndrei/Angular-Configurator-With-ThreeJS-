import { Component, OnInit, Input } from "@angular/core";
import { GenericDialogBox } from "../dialog-box/dialog-box.component";
import { FormControl, Validators } from "@angular/forms";
import * as firebase from "firebase";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Input() currentDialog: GenericDialogBox;

  email = new FormControl("", [Validators.required, Validators.email]);
  public currentUser = undefined;
  hide = false;
  registerIs = true;
    errorCode = "";

  constructor(private _router: Router) {}

  ngOnInit() {}

  getErrorMessage() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  register(user) {
    console.log(user);
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        switch (errorCode) {
          case "auth/email-already-in-use":
            alert("This email is already in use!");
            break;
          case "auth/invalid-email":
            alert("This email is invalid!");
            break;
          case "auth/operation-not-allowed":
            alert("Operation is not allowed");
            break;
          case "auth/weak-password":
            alert("The password is weak");
            break;
        }
      });
      if (this.errorCode == "") {
        alert("Succes!")
        this.currentUser = user;
        this.registerIs = false;
      }else{
        this.registerIs = false;
    }
  }

  goToHomePage() {
    this._router.navigate(["home"]);
    this.currentDialog.closeDialog();
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.currentUser.email, this.currentUser.password).then(res =>{
      let user =res.user
      if(user) {
        this.currentDialog.closeDialog();
        this.currentDialog.callback(this.currentUser);
        this._router.navigate(['/webGL']);
      }
})
  }

}
