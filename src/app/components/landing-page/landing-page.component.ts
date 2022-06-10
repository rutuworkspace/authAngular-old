import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/model/auth-response';
import { AuthService } from 'src/app/service/auth.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  authForm !: FormGroup;
  loginMode :boolean= true;
  errorMessage:any;
  constructor(private fb : FormBuilder,
              private authServ : AuthService,
              private errorServ : ErrorService,
              private router : Router,
              private socialAuthService: SocialAuthService) {}

  get f(){
    return this.authForm.controls;
  }
  ngOnInit(): void {
    this.authServ.user.subscribe({
      next:(res:any)=>{
        if(res){
          this.router.navigate(['users']);
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    this.authForm = this.fb.group({
      'email': ['',[Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onDataSwitch(){
    this.loginMode = !this.loginMode;
  }

  onSubmit(){
    if(this.authForm.valid){
      const email = this.authForm.value.email;
      const password = this.authForm.value.password;

      let authObservable : Observable<AuthResponse>

      if(this.loginMode){
        authObservable = this.authServ.signIn(email,password);
      }else{
        authObservable = this.authServ.signUp(email,password)
      }
   
      authObservable.subscribe({
        next:(res:any)=>{
          console.log(res);
          this.router.navigate(['users'])
        },
        error:(err)=>{
          console.log(err);
          this.errorMessage = err;
      
        }

      })
    }
    
  }

  //social signin
  onGoogleSignIn(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user:any)=>{
        this.authServ.googleSignin(user.googleData).subscribe({
          next:(res:any)=>{
            console.log(res);
            
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
        
      }
      
    )
  }

}
