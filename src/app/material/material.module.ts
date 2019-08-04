import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule } from '@angular/material';


const MaterialModules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule
]

@NgModule({
   imports: [MaterialModules],
   exports: [MaterialModules]   
})
export class MaterialModule { }
