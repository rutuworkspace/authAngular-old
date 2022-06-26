import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {
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
