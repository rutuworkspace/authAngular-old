import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(err:HttpErrorResponse){
    if(!err.error || !err.error.error){
      return throwError(()=> (this.erroMessages['UNKNOWN']))
    }else{
      return throwError(()=> (this.erroMessages[err.error.error.message]))
    }
  }

  erroMessages:any = {
    UNKNOWN : 'An Unknown Error is Occured!',
    EMAIL_EXISTS : 'This Email is Already Exist.',
    EMAIL_NOT_FOUND : 'There is no user record corresponding to this Email ID',
    INVALID_PASSWORD : 'The Password is Invalid'
  }

}
