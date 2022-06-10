import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
profileForm !: FormGroup;
editMode:boolean=false;
profileInfo:any;

token =  JSON.parse(localStorage.getItem('UserData')|| '{}').token;

  constructor(private fb : FormBuilder,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private authServ : AuthService) {}

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      "username" : ['', Validators.required],
      'picUrl' : ['', Validators.required]
    })

   
    this.activatedRoute.queryParamMap.subscribe({
      next:(res:any)=>{
        let qParams = res.get('EditMode');

        if(qParams != null){
          this.editMode = true;
        }else{
          this.editMode = false;
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

                    
    this.authServ.profileInfo.subscribe(res=>{
      this.profileInfo = res;
      this.profileForm.setValue({
        username : res.displayName,
        picUrl : res.photoUrl
      })
    })

  }

  onSubmit(){
    // console.log(this.profileForm.value);

    const updateData = {token:this.token, ...this.profileForm.value};
    this.authServ.updateProfile(updateData).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.authServ.getUserData(this.token);
      },
      error:(err)=>{
        console.log(err);
      }
    })

    
  }

  onDiscard(){
    if(!this.editMode){
    this.profileForm.reset();
    }

    this.router.navigate([],{queryParams:{EditMode:null}})
  }

}
