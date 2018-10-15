import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ManageContentComponent } from './manage-content/manage-content.component';
import { SettingComponent } from './setting/setting.component';
import { AssignAnnouncementComponent } from './assign-announcement/assign-announcement.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { FaqComponent } from './faq/faq.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { Faq1Component } from './faq1/faq1.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TokenComponent } from './token/token.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';
import { PopupComponent } from './popup/popup.component';
import { AddTokenComponent } from './add-token/add-token.component';
import { UserTokenComponent } from './user-token/user-token.component';


const routes: Routes = [{path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent},
{path: 'dashboard', component: DashboardComponent },
{path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'logout', component: LogoutComponent},
{ path: 'manage-user', component:ManageUserComponent},
{ path: 'announcement', component:AnnouncementComponent},
{ path: 'manage-content', component:ManageContentComponent},
{ path: 'setting', component:SettingComponent},
{ path: 'assign-announcement/:id', component:AssignAnnouncementComponent},
{ path: 'user_details/:type/:tab', component:UserDetailsComponent},
{path:'add_announcement',component:AddAnnouncementComponent},
{path:'termsOfuse/:type',component:TermsOfUseComponent},
{path:'Faq',component:FaqComponent},
{path:'Faq1/:type',component:Faq1Component},
{path:'viewDetails',component:ViewDetailsComponent},
 {path:'reset/:otp/:adminId',component:ForgotComponent},
 {path:'edit-user',component:EditUserComponent},
 {path:'token',component:TokenComponent},
{path:'edit_myProfile/:adminId',component:EditMyProfileComponent},
{path:'change_password',component:ChangePasswordComponent},
{path:'my_profile',component:MyProfileComponent},
{path:'edit_faq/:type',component:EditFaqComponent},
{path:'add_faq',component:AddFaqComponent},
{path:'popup',component:PopupComponent},
{path: 'add-token', component: AddTokenComponent},
{path:'user-token',component:UserTokenComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
