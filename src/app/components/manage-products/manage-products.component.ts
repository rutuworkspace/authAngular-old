import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProdServiceService } from 'src/app/service/prod-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  prodTitle = this.prodServ.fetchTitle();
  fetching:boolean=false;
  
  editMode:boolean =false;
  editIndex!:number;


  @ViewChild('id') ID!:ElementRef;
  @ViewChild('name') Name!:ElementRef;
  @ViewChild('price') Price!:ElementRef;


  products = [
    {
       id:"p1",
       name: "Laptop",
       price : 50000
    },
    {
      id:"p2",
      name: "TV",
      price : 40000
   },
   {
    id:"p3",
    name: "Mobile",
    price : 25000
 },
 {
  id:"p4",
  name: "Music System",
  price : 5000
}
  ]
  
  constructor(private prodServ : ProdServiceService,
              private userServ : UserService) { }

  ngOnInit(): void {
    this.onFetchProduct();

        //next Subscribed Subject
        this.userServ.exclusive.next(true)
  }

          //Destroying Subject
          ngOnDestroy(): void {
            this.userServ.exclusive.next(false);
           }
  
  onAddProduct(id:any,name:any,price:any){
    if(!this.editMode){
    this.products.push({
      id:id.value,
      name:name.value,
      price:price.value
    })
  }else{
      this.products[this.editIndex]={
      id:id.value,
      name:name.value,
      price:price.value
      }
      this.onSaveProduct();
      this.editMode = false;
      this.ID.nativeElement.value = '';
    this.Name.nativeElement.value = ''
    this.Price.nativeElement.value = ''
  }
  }

  onDeleteProduct(i:any){
    if(confirm("Are you sure you want to Delete?")){
    this.products.splice(i,1);
    this.onSaveProduct();
  }
  }

  onSaveProduct(){
    this.prodServ.saveProduct(this.products).subscribe({
      next:(res:any)=>{
        this.products = res;
      },
      error:(err)=>{
        alert(err)
      }
    })
  }

  onFetchProduct(){
    this.fetching = true;
    this.prodServ.fetchProducts().subscribe({
      next:(res:any)=>{
        this.products = res;
        this.fetching=false;
      }
    })
  }

  onEditProduct(i:any){
    this.editIndex = i;
    console.log(this.products[i].name);
    this.editMode = true;
    this.ID.nativeElement.value = this.products[i].id;
    this.Name.nativeElement.value = this.products[i].name;
    this.Price.nativeElement.value = this.products[i].price
    
  }
}
