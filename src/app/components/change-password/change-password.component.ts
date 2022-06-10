import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm! : FormGroup;
  success : boolean = false;
  token =  JSON.parse(localStorage.getItem('UserData')|| '{}').token;

  constructor(private fb : FormBuilder,
              private authServ : AuthService) { }

  ngOnInit(): void {
    this.changePassForm = this.fb.group({
      'password' : ['',Validators.required]
    })
  }

  onChangePassword(){
    if(this.changePassForm.valid){
    const passObj = {idToken : this.token, ...this.changePassForm.value};
          
        this.authServ.changePassword(passObj).subscribe(res=>{
          console.log(res);
          this.success = true
        })
    }

    
  }

}
