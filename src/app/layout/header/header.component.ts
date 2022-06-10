import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user:any;
  constructor(private authServ : AuthService,
              private router : Router) { }

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
  }

  onSignOut(){
    this.authServ.signOut();
    this.router.navigate(['']);
    localStorage.removeItem('UserData');
  }

  onCangePassword(){}

}
