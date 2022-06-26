import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { HeaderComponent } from './layout/header/header.component'

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';

import { Comp1Component } from './testComp/comp1/comp1.component';
import { Comp2Component } from './testComp/comp2/comp2.component';
import { Comp3Component } from './testComp/comp3/comp3.component';


@NgModule({
  declarations: [
    AppComponent,
    ManageProductsComponent,
    ManageUserComponent,
    HeaderComponent,
    ReactiveFormsComponent,
    LandingPageComponent,
    DashboardComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'clientId'
            )
          }
        ],
        onError: (err:any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
