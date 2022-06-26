import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';
import { config } from '../config';
import { AuthResponse } from '../model/auth-response';
import { User } from '../model/user.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null!);
  profileInfo = new BehaviorSubject<any>({
    displayName : '',
    email : '',
    photoUrl : ''
  }) 
  private tokenExpirationTimer :any;

  constructor(private http : HttpClient,
              private errServ : ErrorService,
              private router : Router) {}

  signUp(email:any,password:any){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,{
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(
      catchError(err=>{
        return this.errServ.handleError(err)
      }),
      tap(res=>{
        this.authenticateUser(res.email,res.localId,res.idToken,+res.expiresIn)
      })
    )
  }

  signIn(email:any,password:any){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,{
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(
      catchError(err=>{
        return this.errServ.handleError(err)
      }),
      tap(res=>{
        this.authenticateUser(res.email,res.localId,res.idToken,+res.expiresIn)
      })
    )
  }

  autoSignIn(){
    const userData =  JSON.parse(localStorage.getItem('UserData')|| '{}');
    console.log("UserData:",userData);
    
    if(!userData){
      return;
    }

    const loggedInUser = new User(userData.email, userData.id, userData.token, new Date(userData.tokenExpirationDate));

    if(loggedInUser.getToken){
      this.user.next(loggedInUser);
      const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(expirationDuration);
      this.getUserData(loggedInUser.getToken)
    }
    
    
  }

  signOut(){
    this.user.next(null!);
    this.router.navigate(['']);
    localStorage.removeItem('UserData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignOut(expirationDuration:any){
     this.tokenExpirationTimer = setTimeout(() => {
        this.signOut();
      }, expirationDuration);
  }

  private authenticateUser(email:string, userId:string, token:string, expiresIn:any){
    
    const expirationdate = new Date(new Date().getTime() + expiresIn*1000)
    const user = new User(email, userId, token, expirationdate)
    console.log("User=>",user);
    this.user.next(user);
    this.autoSignOut(expiresIn*1000);
    localStorage.setItem('UserData', JSON.stringify(user));
    this.getUserData(token);
  }

  //Update Profile
  updateProfile(data:any){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`,
    {
      idToken : data.token,
      displayName : data.username,
      photoUrl : data.picUrl,
      returnSecureToken : true
    })
    .pipe(
      catchError(err=>{
        return this.errServ.handleError(err)
      })
    )
   
  }

  getUserData(token:any){
    this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${config.API_KEY}`,
    {
      idToken : token
    }
    ).subscribe({
      next:(res:any)=>{
          this.profileInfo.next({
          displayName : res.users[0].displayName,
          email : res.users[0].email,
          photoUrl : res.users[0].photoUrl
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  changePassword(passData:any){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`,
    {
      idToken : passData.idToken,
      password : passData.password,
      returnSecureToken : true
    }
    ).pipe(
      catchError(err=>{
        return this.errServ.handleError(err)
      })
    )  
  }

  forgetPassword(forgetPassData:any){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${config.API_KEY}`,
    {
      requestType : 'PASSWORD_RESET',
      email : forgetPassData.email
    }
    ).pipe(
      catchError(err=>{
        return this.errServ.handleError(err)
      })
    ) 
  }

  googleSignin(token:any){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${config.API_KEY}`,
    {
      postBody : `id_token=${token}&providerId=google.com`,
      requestUri : 'http://localhost:4500',
      returnIdpCredential : true,
      returnSecureToken : true
    }
    )
  }


}
