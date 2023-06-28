import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  ADD_USER_PRODUCTS_END_POINT,
  GET_SUPPLIETS_SERVICES_END_POINT,
  GET_USER_ACCOUNTING_LIST_PLAN_END_POINT,
  GET_USER_employers_END_POINT,
  POST_ADD_FILE_TICKET_ADMIN_END_POINT,
  POST_SUPPLIETS_CUSTOMERS_END_POINT,
  POST_TICKET_ADMIN_END_POINT,
  POST_USER_ACCOUNTING_PLAN_END_POINT,
  POST_USER_ACCOUNTING_PLAN_ROW_END_POINT,
  POST_USER_COMPANIES_END_POINT,
  POST_USER_CUSTOMERS_END_POINT,
  POST_USER_EMPLOYEES_END_POINT,
  POST_USER_SERVICES_END_POINT,
  POST_USER_TAXES_END_POINT,
  POST_WOREK_ORDER_ADMIN_END_POINT,
  PUT_WOREK_ORDER_END_POINT,
} from "../../services/endpoints";
import Observer from "../../services/observer";
import { BackendService } from "../../services/backend.service";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Input("title") title: string;
  @Input("type") type: string;
  @Input("payload") payload: any;
  //
  files :any  ;
  supplierList: [] = [];
  accountsList: [] = [];
  actualDate: string;
  listTechnician: [] = [];
  birthdateinputype: string;
  hiredateinputype: string;
  startperiodinputype: string;
  companyList: [];
  paylodFormData:FormData ;
  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    public backendService: BackendService,
    private router: Router
  ) {
    this.paylodFormData = new FormData();
    this.actualDate = new Date().toDateString();
    this.birthdateinputype = "text";
    this.hiredateinputype = "text";

  }
  ngOnInit() {
    this.getEmployesByOutherty("technician");
   
    // this.startperiodinputype = "text";
    // if (this.type == "SERVICES" || this.type == "PRODUCTS") {

    //   // this.getAccounts();
    // }
  }
  getEmployesByOutherty(type: string) {
    this.backendService
      .get(
        `${GET_USER_employers_END_POINT}/${type}`)
      .subscribe(
        new Observer().OBSERVER_GET((response) => {
          this.listTechnician = response.rows;
        })
      );
  }
  getSuppliers() {
    this.backendService
      .get(
        `${GET_SUPPLIETS_SERVICES_END_POINT}/${this.sharedService.getItem(
          "companyNo"
        )}`
      )
      .subscribe(
        new Observer().OBSERVER_GET((response) => {
          this.supplierList = response.rows;
        })
      );
  }
  getAccounts() {
    this.backendService
      .get(
        `${GET_USER_ACCOUNTING_LIST_PLAN_END_POINT}/${this.sharedService.getItem(
          "companyNo"
        )}`
      )
      .subscribe(
        new Observer().OBSERVER_GET((response) => {
          this.accountsList = response.rows;
        })
      );
  }

  onSubmit(form: NgForm) {
    let endpoint: string = "";
    let payload = { ...form.value };
  
    
    switch (this.type) {
      case "WORK_ORDER":
        endpoint = POST_WOREK_ORDER_ADMIN_END_POINT;
        payload = { ...payload, clientId:this.payload.clientId };
        // alert(JSON.stringify(payload))
        break;
      case "newTICKET":
        payload = {...payload,...this.payload};
        endpoint = POST_TICKET_ADMIN_END_POINT;
        const {title,description} =form.value ;
        this.paylodFormData.append("title",title);
        this.paylodFormData.append("description",description);
        this.paylodFormData.append("workOrderId",payload.workOrderId)
        this.paylodFormData.append("clientId",payload.clientId)
        this.paylodFormData.append("employeeId",payload.employeeId)
        this.paylodFormData.append("fileType","File")
    if(this.files) {   for (let i = 0; i < this.files.length; i++) {
         this.paylodFormData.append("files", this.files[i]);
     }
}

      //   if(this.files){
      //  // this.paylodFormData.append("files",this.files)
      //  for (let i = 0; i < this.files.length; i++) {
      //   this.paylodFormData.append("files", this.files[i]);
      // }}
      
        payload = this.paylodFormData;
        break;
      case "TICKET":
        endpoint = POST_ADD_FILE_TICKET_ADMIN_END_POINT;
        this.paylodFormData.append("ticketId",this.payload.ticketId)
        this.paylodFormData.append("fileType","File")
         for (let i = 0; i < this.files.length; i++) {
          this.paylodFormData.append("files", this.files[i]);
      }
          payload = this.paylodFormData;
          console.log("daadadaddadadad");
          
          console.log(this.paylodFormData.get("ticketId"));
          console.log(this.paylodFormData.get("fileType"));
          break;
      case "add_Tech":
       
        endpoint = PUT_WOREK_ORDER_END_POINT;
        payload = {
          ...payload,
          _id: this.payload._id,
          };
    }

    this.backendService
      .post(endpoint, payload)
      .subscribe(
        new Observer(
          this.router,
          null,
          true,
          true,
          this.sharedService,
          this.activeModal
        ).OBSERVER_POST()
      );
  }

  setinputtype(type: string) {
    if (type === "birthdate") this.birthdateinputype = "date";
    if (type === "hiredate") this.hiredateinputype = "date";
    if (type === "start_period") this.startperiodinputype = "date";
  }
  changeSelectedFile02(event){
  this.files = event.target.files ;
    // console.log( event.target.files);
    
   
  }

}


/*  




*/