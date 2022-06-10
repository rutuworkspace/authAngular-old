import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Users } from 'src/app/model/users';
import { UserService } from 'src/app/service/user.service';
import { NgForm }   from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  userServiceURL='https://crud-products-management-default-rtdb.firebaseio.com/users.json';

  @ViewChild('userForm') userForm !: NgForm;
  userTitle:string = "User Management"
  users :any=[];

  editMode:boolean=false;
  editUserId:any;
  user :any;
  constructor(private userServ : UserService,
              private http : HttpClient,
              private authServ : AuthService) { }

              
  ngOnInit(): void {
    this.fetchUser();
    this.authServ.profileInfo.subscribe(res=>{
      this.user = res;
    })
  }

  onAddUser(userData:Users){
    if(this.userForm.valid){
      if(this.editMode){
        this.http.put<Users>('https://crud-products-management-default-rtdb.firebaseio.com/users/'+this.editUserId+'.json',userData)
        .subscribe({
          next:(res:any)=>{
            this.fetchUser();
            this.userForm.reset();
            this.editMode= false;
          }
        })
        
      }else{
        this.http.post<Users>(this.userServiceURL,userData).subscribe({
          next:(res:any)=>{
            this.users.push(userData);
            this.userForm.reset();
  
            this.fetchUser();  
          }
        })
      }
    }else{
      let keys = Object.keys(this.userForm.controls);
      keys.filter(data=>{
        let control = this.userForm.controls[data];
        if(control.errors != null){
          control.markAsTouched();
        }
      })
    }
    

  }

  fetchUser(){
    this.http.get<Users>(this.userServiceURL)
    .pipe(map((resData:any)=>{
      const userData:any=[];
      for(const key in resData){
        if(resData.hasOwnProperty){
        userData.push({userId:key,...resData[key]})
        }
      }
      return userData
    }))
    .subscribe({
      next:(res:any)=>{
        console.log(res);
        this.users=res;
        
      }
    })
  }

  onDelete(userId:any){
    if(confirm("Do you want to delete?")){
      this.http.delete('https://crud-products-management-default-rtdb.firebaseio.com/users/'+userId+'.json')
      .subscribe({
        next:(res:any)=>{
          console.log(userId);
          this.fetchUser();
        } 
    })
    }
  }

  onEdit(userId:any,index:any){
    this.editMode = true;
    this.editUserId = userId;
    this.userForm.setValue({
      name: this.users[index].name,
      technology: this.users[index].technology
    })
  }

}
