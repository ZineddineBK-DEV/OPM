import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  DELETE_SUPPLIETS_CUSTOMERS_END_POINT,
  GET_SUPPLIETS_SERVICES_END_POINT,
} from "../../../../app/services/endpoints";
import {
  PRODUCTS_POPUP_TYPE,
  SUPPLIERS_POPUP_TYPE,
} from "../../../../app/popup/popup-type";
import { PostComponent } from "../../../../app/popup/post/post.component";
import { PutComponent } from "../../../../app/popup/put/put.component";
import { BackendService } from "../../../../app/services/backend.service";
import Observer from "../../../../app/services/observer";
import { SharedService } from "../../../../app/services/shared.service";
import swal from "sweetalert";

@Component({
  selector: "app-suppliers",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"],
})
export class SuppliersComponent implements OnInit {
  suppliersList: [] = [];
  collectionSize: number = 0;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 20, 100];
  id_company: string;
  constructor(
    private backendService: BackendService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.getSelectedCompany((id) => {
      if (id) {
        this.id_company = id;
        this.getsuppliers();
      } else {
        return swal("Failure!", "No company selected !", "info");
      }
    });
  }
  OpenModal(title: string, suppliers?) {
    if(this.id_company){
    const modalRef = this.modalService.open(
      title.split("_")[0] === "NEW" ? PostComponent : PutComponent,
      { size: "lg", backdrop: "static" }
    );
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.type = SUPPLIERS_POPUP_TYPE;

    modalRef.componentInstance.payload = suppliers
      ? { ...suppliers }
      : { id_company: this.id_company };
    } else {
      return swal("Failure!", "No company selected !", "info");
    }
  }
  getsuppliers() {
    const offset = (this.page - 1) * this.pageSize;
    this.backendService
      .get(
        `${GET_SUPPLIETS_SERVICES_END_POINT}/${this.id_company}`,
        this.pageSize,
        offset
      )
      .subscribe(
        new Observer().OBSERVER_GET((response) => {
          this.suppliersList = response.rows;
          this.collectionSize = response.totalItems;
          //alert(response)
        })
      );
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getsuppliers();
  }

  handlePageChange(currentPage: number) {
    this.page = currentPage;
    this.getsuppliers();
  }
  deletesuppliers(id) {
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
          .delete(`${DELETE_SUPPLIETS_CUSTOMERS_END_POINT}/${id}`)
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
}
