import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ThreeViewComponent } from './three-view/three-view.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent  },
  { path: 'home', component: HomeComponent  },
  { path: 'webGL', component: ThreeViewComponent  },
  { path: '',  redirectTo:'/home', pathMatch: 'full'},
  { path: '**',  redirectTo:'/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
