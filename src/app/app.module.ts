import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { LoginComponent } from "./login/login.component";
import { GenericDialogBox } from "./dialog-box/dialog-box.component";
import { MatFormFieldModule, MatDialogModule, MatSelectModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase } from "angularfire2/database";
import { environment } from "../environments/environment";

import * as firebase from "firebase";
import { ThreeViewComponent } from './three-view/three-view.component';
import { ConfigTableComponent } from './config-table/config-table.component';
firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GenericDialogBox,
    RegisterComponent,
    HomeComponent,
    ThreeViewComponent,
    ConfigTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
    // AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  entryComponents: [GenericDialogBox],
  providers: [AngularFireDatabase, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
