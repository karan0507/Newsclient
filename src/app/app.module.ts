import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin_panel/login/login.component';
import { PostComponent } from './admin_panel/post/post.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AdminSideNavComponent } from './component/admin-side-nav/admin-side-nav.component';
import { AdminHeadNavComponent } from './component/admin-head-nav/admin-head-nav.component';
import { ClientHeadNavComponent } from './component/client-head-nav/client-head-nav.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin_panel/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutRoutes } from './layouts/admin-layout/admin-layout.routing';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { AdminSideNavModule } from './component/admin-side-nav/admin-side-nav.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { SettingsComponent } from './admin_panel/settings/settings.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  //   NewsComponent,
  //   AdminSideNavComponent,
  //   AdminHeadNavComponent,
  //   ClientHeadNavComponent,
    AdminLayoutComponent,
  SettingsComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminLayoutModule,
    NgbModule,
    AdminSideNavModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    ToastrModule.forRoot(), // ToastrModule added

    NgMultiSelectDropDownModule.forRoot(),

    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
