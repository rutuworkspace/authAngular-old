import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { AuthGuard } from './service/guard/auth.guard';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path: 'app-landing-page', component: LandingPageComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path : 'dashboard', component: DashboardComponent},
  {path:'products', component:ManageProductsComponent},
  {path:'users', canActivate:[AuthGuard], component:ManageUserComponent},
  {path: 'reactiveForm', component:ReactiveFormsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
