import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../../popup/post/post.component';
import { PutComponent } from '../../popup/put/put.component';
import { BackendService } from '../../services/backend.service';
import { SharedService } from '../../services/shared.service';
import { DELETE_USER_TAXES_END_POINT, GET_USER_employers_BY_VALID_END_POINT, GET_USER_employers_END_POINT, POST_WOREK_ORDER_ADMIN_END_POINT, PUT_USER_USER_employers_BY_VALIDE } from '../../services/endpoints';
import { DetailsComponent } from '../../popup/details/details.component';
import { EMPLOYERS_POPUP_TYPE } from '../../popup/popup-type';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Observer from '../../services/observer';
import swal from 'sweetalert';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-wodt',
  templateUrl: './wodt.component.html',
  styleUrls: ['./wodt.component.scss']
})
export class WODTComponent implements OnInit {
  paylodFormData:FormData ;
  employerslist: [] = [];
  collectionSize: number = 0;
  p=1;
  page = 1;
  mayFile :any ;
  nbrItemPage = 5;
  pageSize = 5;
  pageSizes = [5, 10, 20];
  id_company:string;
  titer ;
  id ;
  goRouting= "/app/workOrderDetail"
  fileInputPlaceHolder = "fileInputPlaceHolder"
  constructor(
    private backendService: BackendService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private route: ActivatedRoute
  

    
  ) {
    this.paylodFormData = new FormData();
  }

  ngOnInit() {


        this.getAllEmployeesByAuthority("technician");
        this.id=this.route.snapshot.paramMap.get("id");
        // alert(this.id)

  }

  onSubmit(form: NgForm) {
    let endpoint: string = "";
    let payload = { ...form.value };
    console.log(payload)
    this.paylodFormData.append("title",payload.title);
    this.paylodFormData.append("description",payload.description);
    this.paylodFormData.append("clientId",this.id)
    this.paylodFormData.append("fileType","Logo")
    this.paylodFormData.append("file",this.mayFile)

    this.paylodFormData.append("partName",payload.partName)
    this.paylodFormData.append("serialNum",payload.serialNum)
    this.paylodFormData.append("partNum",payload.partNum)
    this.paylodFormData.append("employeeId",payload.employeeId)
    // 
    this.backendService
      .post(POST_WOREK_ORDER_ADMIN_END_POINT, this.paylodFormData)
      .subscribe(
        new Observer(
         this.router,// just un class dans angular
         null,//target : lin eli machilou
         true,//relode
         true,//swwet alert
         this.sharedService,//obligtour si ona reload
        ).OBSERVER_POST()
      );
  }




  getAllEmployeesByAuthority(typeEmp:string ) {

    this.backendService.get(`${GET_USER_employers_END_POINT}/${typeEmp}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
    console.log(response);

        // this.collectionSize=response.totalItems;
         this.employerslist = response.rows;
      })
    );
  }

  getAllEmployeesByValid(valide:string ) {

    this.backendService.get(`${GET_USER_employers_BY_VALID_END_POINT}/${valide}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
    console.log(response);

        // this.collectionSize=response.totalItems;
         this.employerslist = response.rows;
      })
    );
  }


  changeEtaEmpl(etat:boolean,email:string){
    const payload ={valid:etat,email:email}
     this.backendService
     .put(PUT_USER_USER_employers_BY_VALIDE, payload)
     .subscribe(
       new Observer(
         this.router,// just un class dans angular
         null,//target : lin eli machilou
         false,//relode
         false,//swwet alert
         this.sharedService,//obligtour si ona reload
       ).OBSERVER_EDIT()
     );
       }

  changeSelectedFile(valid) {
    this.getAllEmployeesByValid(valid);

  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  this.nbrItemPage =event.target.value ;
  }

  handlePageChange(currentPage: number) {
 
      // this.getListClient();

    this.page = currentPage;
  }
  changeSelectedFile02(event){
    this.mayFile = event.target.files[0] ;
   
  }

}
