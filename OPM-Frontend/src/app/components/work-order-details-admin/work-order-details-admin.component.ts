import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../services/backend.service';
import { SharedService } from '../../services/shared.service';
import {  GET_LIST_CLIENTS_BAY_Type, GET_LIST_FILES_BY_CLIENTS, GET_LIST_FOLDERS_All,   PUT_USER_USER_CLIENTS_BY_VALIDE } from '../../services/endpoints';
import { ActivatedRoute } from '@angular/router';
import Observer from '../../services/observer';

@Component({
  selector: 'app-work-order-details-admin',
  templateUrl: './work-order-details-admin.component.html',
  styleUrls: ['./work-order-details-admin.component.scss']
})
export class WorkOrderDetailsAdminComponent implements OnInit {
  clientList: [] = [];
  collectionSize: number = 0;
  page = 1;
  p: number = 1;
  pageSize = 5;
  pageSizes = [5, 10,20,40];
  id_company:string;
  id_user:any;
  id:any ;
  constructor(
    private backendService: BackendService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.id=this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
        this.getListFolder();
  }

  getListFolder() {

    this.backendService.get(`${GET_LIST_FILES_BY_CLIENTS}/${this.id}`).subscribe(

      new Observer().OBSERVER_GET((response) => {
    console.log(response);

        // this.collectionSize=response.totalItems;
         this.clientList = response.rows;
      })
    );
  }

  getListFolderByValid(valide:string ) {

    this.backendService.get(`${GET_LIST_CLIENTS_BAY_Type}/${valide}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
    console.log(response);

        // this.collectionSize=response.totalItems;
         this.clientList = response.rows;
      })
    );
  }




  changeEtaClient(etat:boolean,email:string){
    const payload ={valid:etat,email:email}
     this.backendService
     .put(PUT_USER_USER_CLIENTS_BY_VALIDE, payload)
     .subscribe(
       new Observer(
         this.router,// just un class dans angular
         null,//target : lin eli machilou
         true,//relode
         true,//swwet alert
         this.sharedService,//obligtour si ona reload
       ).OBSERVER_EDIT()
     );
       }

  changeSelectedFile(valid) {
    this.getListFolderByValid(valid);

  }
  handlePageSizeChange(event: any): void {

    this.pageSize = event.target.value;
    console.log(this.pageSize+"rrrrrrrrrrrr")
    this.page = 1;
  }

  handlePageChange(currentPage: number) {
    if(this.id_company){
      this.getListFolder();
    }
    this.page = currentPage;
  }


}
