import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit {
  userName!:string;
  constructor(private userServ : UserService) { }

  ngOnInit(): void {
    this.userServ.userName.subscribe({
      next:(res:any)=>{
        this.userName = res;
      }
    })
  }


  getUsername(uname:string){
    console.log(uname);
    this.userServ.userName.next(uname)
    
  }
}
