import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user:any;
  exclusive : boolean = false;
  constructor(private authServ : AuthService,
              private router : Router,
              private userServ : UserService) { }

  ngOnInit(): void {

    this.authServ.profileInfo.subscribe(res=>{
      this.user = res;
    })

    this.authServ.user.subscribe({
      next:(res:any)=>{
        if(res){
          this.isLoggedIn = true;
        }else{
          this.isLoggedIn = false;
        }
      }
    })

    //subject subscription
    this.userServ.exclusive.subscribe({
      next:(res:any)=>{
        this.exclusive = res;
      }
    })
  }

  onSignOut(){
    this.authServ.signOut();
    this.router.navigate(['']);
    localStorage.removeItem('UserData');
  }

  onCangePassword(){}

}
