import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { SettingComponent } from './setting/setting.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageContentComponent } from './manage-content/manage-content.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FaqComponent } from './faq/faq.component';
import { EditFeeComponent } from './edit-fee/edit-fee.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignAnnouncementComponent } from './assign-announcement/assign-announcement.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SideIconComponent } from './side-icon/side-icon.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { Faq1Component } from './faq1/faq1.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { AddTokenComponent } from './add-token/add-token.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';
import { TokenComponent } from './token/token.component';
import { PopupComponent } from './popup/popup.component';
import { UserTokenComponent } from './user-token/user-token.component';


@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    TermsOfUseComponent,
    SettingComponent,
    ManageUserComponent,
    ManageContentComponent,
    LoginComponent,
    ForgotPasswordComponent,
    FaqComponent,
    EditFeeComponent,
    EditFaqComponent,
    DashboardComponent,
    AssignAnnouncementComponent,
    AnnouncementComponent,
    AddAnnouncementComponent,
    LogoutComponent,
    FooterComponent,
    SidebarComponent,
    ChangePasswordComponent,
    MyProfileComponent,
    SideIconComponent,
    Faq1Component,
    ViewDetailsComponent,
    ForgotComponent,
    AddFaqComponent,
    AddTokenComponent,
    EditUserComponent,
    EditMyProfileComponent,
    TokenComponent,
    PopupComponent,
    UserTokenComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2ImgMaxModule,
    BrowserAnimationsModule,
    MyDatePickerModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    NgxPaginationModule,
    CKEditorModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
