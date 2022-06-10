import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetePassForm! : FormGroup;
  error :any = null;
  success: boolean = false; 

  constructor(private fb : FormBuilder,
    private authServ : AuthService) { }

  ngOnInit(): void {
    this.forgetePassForm = this.fb.group({
      'email' : ['',[Validators.required,Validators.email]]
    })
  }

  get f(){
    return this.forgetePassForm.controls;
  }

  onForgetPassword(){
    // console.log(this.forgetePassForm.value);
    this.authServ.forgetPassword(this.forgetePassForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.success = true;
      },
      error:(err)=>{
        console.log(err);
        this.error = err
      }
    })
  }
}
