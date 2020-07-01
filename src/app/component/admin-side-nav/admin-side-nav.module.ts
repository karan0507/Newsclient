import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminSideNavComponent } from './admin-side-nav.component';



@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [ AdminSideNavComponent ],
  exports: [ AdminSideNavComponent ]
})
export class AdminSideNavModule { }
