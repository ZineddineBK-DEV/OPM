import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import { DetailsComponent } from '../../popup/details/details.component';
import { DetailsComponent } from "../../../popup/details/details.component";
import swal from "sweetalert";
import {
  PRODUCTS_POPUP_TYPE,
  SERVICES_POPUP_TYPE,
} from "../../../../app/popup/popup-type";
import { PostComponent } from "../../../../app/popup/post/post.component";
import { PutComponent } from "../../../../app/popup/put/put.component";
import { BackendService } from "../../../../app/services/backend.service";
import {
  DELETE_USER_CUSTOMERS_END_POINT,
  DELETE_USER_PRODUCTS_END_POINT,
  DELETE_USER_SERVICES_END_POINT,
  GET_USER_PRODUCTS_END_POINT,
  GET_USER_SERVICES_END_POINT,
} from "../../../../app/services/endpoints";
import Observer from "../../../../app/services/observer";
import { SharedService } from "../../../../app/services/shared.service";
import { Router } from "@angular/router";
import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

@Component({
  selector: "app-prodserv",
  templateUrl: "./prodserv.component.html",
  styleUrls: ["./prodserv.component.scss"],
})
export class ProdservComponent implements OnInit {
  itemsList: [] = [];
  collectionSize: number = 0;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 20, 100];
  id_company: string;

  etat: string;
  operation: string;
  defaultEndPoint: string;

  constructor(
    private backendService: BackendService,
    private modalService: NgbModal,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.etat = "1";
    this.operation = "0";
  }

  ngOnInit() {
    this.sharedService.getSelectedCompany((id) => {
      if (id) {
        this.id_company = id;
        this.defaultEndPoint = `${GET_USER_PRODUCTS_END_POINT}/${this.id_company}/${this.operation}`;
        this.getItems(this.defaultEndPoint);
      } else {
        return swal("Failure!", "No company selected !", "info");
      }
    });
  }

  getItems(endPoint: string) {
    this.itemsList = [];
    const offset = (this.page - 1) * this.pageSize;
    this.backendService.get(endPoint, this.pageSize, offset).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.itemsList = response.rows;
        this.collectionSize = response.totalItems;
      })
    );
  }
  // getservices(operation:string) {
  //   const offset = (this.page - 1) * this.pageSize;
  //   this.backendService
  //     .get(
  //       `${GET_USER_SERVICES_END_POINT}/${this.id_company}/${operation}`,
  //       this.pageSize,
  //       offset
  //     )
  //     .subscribe(
  //       new Observer().OBSERVER_GET((response) => {
  //         this.serviceList = response.rows;
  //         this.collectionSize = response.totalItems;
  //       })
  //     );
  // }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getItems(this.defaultEndPoint);
  }

  handlePageChange(currentPage: number) {
    this.page = currentPage;
    this.getItems(this.defaultEndPoint);
  }

  changeState(event) {
    const etat = event.nextId.toString();
    this.etat = etat;
    switch (this.etat) {
      case "1":
        this.defaultEndPoint = `${GET_USER_PRODUCTS_END_POINT}/${this.id_company}/0`;
        break;
      case "2":
        this.defaultEndPoint = `${GET_USER_SERVICES_END_POINT}/${this.id_company}/0`;
        break;
    }
    this.getItems(this.defaultEndPoint);


  }


  changeOperation(value: string) {
    this.operation = value;
    switch (this.etat) {
      case "1":
        this.defaultEndPoint = `${GET_USER_PRODUCTS_END_POINT}/${this.id_company}/${this.operation}`;
        break;
      case "2":
        this.defaultEndPoint = `${GET_USER_SERVICES_END_POINT}/${this.id_company}/${this.operation}`;
        break;
    }
    this.getItems(this.defaultEndPoint);
  }


  OpenModal(title: string, obj?) {
    if (this.id_company) {
      const modalRef = this.modalService.open(
        title.split("_")[0] === "NEW" ? PostComponent : PutComponent,
        { size: "lg", backdrop: "static" }
      );
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.type =
        this.etat == "1" ? PRODUCTS_POPUP_TYPE : SERVICES_POPUP_TYPE;
      modalRef.componentInstance.payload = obj
        ? { ...obj, id_company: this.id_company }
        : { id_company: this.id_company,operation:this.operation };
    } else {
      return swal("Failure!", "No company selected !", "info");
    }
  }
  // SERVICES PRODUCTS
  deleteItem(id) {
    const lang=JSON.parse(localStorage.getItem('lang')).lang;
    swal({
      title: lang&&lang=='en'?"Are you sure?":'Êtes-vous sûr?',
      text: lang&&lang=='en'?"You won't be able to revert this !":'Vous ne pourrez pas revenir en arrière !',
      icon: "warning",
      closeOnEsc: true,
      closeOnClickOutside: true,
      buttons: lang&&lang=='en'?["Cancel", "Confirm"]:["Annuler","Confirmer"],
    }).then((result) => {
      if (result) {
        this.backendService
          .delete(`${DELETE_USER_PRODUCTS_END_POINT}/${id}`)
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
  OpenDetails(title: string, payload: any) {
    const modalRef = this.modalService.open(DetailsComponent);
    modalRef.componentInstance.title = title
    modalRef.componentInstance.type = this.etat=='1'?PRODUCTS_POPUP_TYPE:SERVICES_POPUP_TYPE;
    modalRef.componentInstance.payload = { ...payload };
  }


}
