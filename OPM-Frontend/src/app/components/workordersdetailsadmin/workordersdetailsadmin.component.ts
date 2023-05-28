import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../services/backend.service';
import { SharedService } from '../../services/shared.service';
import {DELETE_FILE_FOR_TICKET_ADMIN_END_POINT, DELETE_USER_TAXES_END_POINT, GET_ONE_WORK_ORDER_BY_ID_END_POINT, PUT_TICKET_END_POINT } from '../../services/endpoints';
import Observer from '../../services/observer';
import { environment } from "./../../../environments/environment";
import { TICKET_New_PLAN_POPUP_TYPE, TICKET_PLAN_POPUP_TYPE } from "../../popup/popup-type";
import { PostComponent } from './../../popup/post/post.component';
import { PutComponent } from './../../popup/put/put.component';
import { DetailsComponent } from './../..///popup/details/details.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-workordersdetailsadmin',
  templateUrl: './workordersdetailsadmin.component.html',
  styleUrls: ['./workordersdetailsadmin.component.scss']
})
export class WorkordersdetailsadminComponent implements OnInit {
  workOrder :any  ;
  listFile : any  =null ;
  id:any ;
  url_imguplode ;
  path_logo ;
  windurl =window.location.protocol + "//" + window.location.hostname+"/:3000/";
  titre_worek_order ;
  type_user  = "admin";
  description = ""
  titleWorkOrder = null;
  StatusWorkOrder = null;
  titleworkOrder = null;
  EmpoloyesFirstNameLastName = null;
  DescriptioneworkOrder = null;
  ticketDescription = null
  partName = null
  serialNum = null
  logoFileName = null
  tickettitle = null
  imageUrl = null
  // -----------//
  disAdmin =true
  disTech =true
  disClt =true
  updatdestech=true ;
  constructor(
    private backendService: BackendService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    

  ) {
    this.id=this.route.snapshot.paramMap.get("id");
    this.type_user=this.route.snapshot.paramMap.get("user_type");
    this.url_imguplode = environment.apiUrl+"/"+this.id+"/Logo/" ;
if(this.type_user == "admin"){ this.disAdmin  = false}
if(this.type_user == "tech"){this.disTech = false}
if(this.type_user == "clt"){this.disClt = false}
  }
  ngOnInit() {
    this.getOneWorkOrderBayId(this.type_user);
    this.workOrder =null ;
    this.listFile =null ;



}
openFile(url :string){
  const filesUrl = "http://localhost:3000/"+url ;
  //  window.open(filesUrl, '_blank');

}
upadeteEtaDesTEch(){this.updatdestech= !this.updatdestech}
async getOneWorkOrderBayId(type_op) {
await this.backendService.get(`${GET_ONE_WORK_ORDER_BY_ID_END_POINT}/${this.route.snapshot.paramMap.get("id")}/${type_op}`).subscribe(
  new Observer().OBSERVER_GET((response) => {
    this.workOrder = response.rows;
this.titleWorkOrder = this.workOrder.title;
this.StatusWorkOrder = this.workOrder.status;
console.log(response.rows);

this.EmpoloyesFirstNameLastName = this.workOrder.employeeId.firstName+" "+this.workOrder.employeeId.lastName;
this.DescriptioneworkOrder = this.workOrder.description;
if(this.workOrder.ticketId ){this.ticketDescription = this.workOrder.ticketId.description ;}else{this.ticketDescription=null}
this.partName = this.workOrder.partName
this.serialNum = this.workOrder.serialNum
if(this.workOrder.logo ){this.logoFileName =this.workOrder.logo.fileName}else { this.logoFileName = null}
this.tickettitle = this.workOrder.partName
// this.titleworkOrder = this.workOrder.;
// console.log(this.workOrder.ticketId._id);

if(response.rows.ticketId != null ){this.listFile=response.rows.ticketId.listOfFiles};
    // this.description = response.rows.description ;

    
  })
);
}
OpenModal(title: string,id_ticket) {
  const modalRef = this.modalService.open( PostComponent ,{ size: "lg", backdrop: "static" });
  modalRef.componentInstance.title = title;
  modalRef.componentInstance.type = TICKET_PLAN_POPUP_TYPE;
  modalRef.componentInstance.payload = {ticketId:id_ticket}
}




oppenAdd(title){
  const modalRef = this.modalService.open( PostComponent ,{ size: "lg", backdrop: "static" });
  modalRef.componentInstance.title = title;
  modalRef.componentInstance.type = TICKET_New_PLAN_POPUP_TYPE;
  // const { title, clientId, description, employeeId, workOrderId } = req.body;
  modalRef.componentInstance.payload = {workOrderId:this.workOrder._id,clientId:this.id,employeeId:this.workOrder.employeeId._id} //;
}





OpenDetails(title: string, payload:any) {
  const modalRef = this.modalService.open(DetailsComponent);
  modalRef.componentInstance.title = title;
  modalRef.componentInstance.type = TICKET_PLAN_POPUP_TYPE;
  modalRef.componentInstance.payload = { ...payload };
}

deleteFile(id_file: string,id_tiket:string) {
  alert(id_file+"---"+id_tiket)
  const lang=JSON.parse(localStorage.getItem('lang')).lang;
  swal({
    title: "Are you sure?",
    text: "You won't be able to revert this !",
    icon: "warning",
    closeOnEsc: true,
    closeOnClickOutside: true,
    buttons: ["Cancel", "Confirm"],
  }).then((result) => {
    if (result) {
      this.backendService
        .delete(`${DELETE_FILE_FOR_TICKET_ADMIN_END_POINT}/${id_file}/${id_tiket}`)
        .subscribe(
          new Observer(
            this.router,
            null,
            true,
            true,
            this.sharedService,
            null
          ).OBSERVER_DELETE()
        );
    }
  });
}

adddescrption(valuetxt,id){
  if(valuetxt != this.workOrder.ticketId.description){
  this.backendService
  .put(PUT_TICKET_END_POINT, {description:valuetxt,_id:id})
  .subscribe(
    new Observer(
      this.router,
      null,
      true,
      true,
      this.sharedService,
    ).OBSERVER_EDIT()
  );
}
}
}
