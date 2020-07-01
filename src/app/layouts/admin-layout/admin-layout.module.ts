import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from 'src/app/admin_panel/dashboard/dashboard.component';
import { AdminSideNavComponent } from 'src/app/component/admin-side-nav/admin-side-nav.component';
import { PostComponent } from 'src/app/admin_panel/post/post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [DashboardComponent, PostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule

  ],
})
export class AdminLayoutModule { }
