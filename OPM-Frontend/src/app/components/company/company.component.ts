import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SharedService } from "../../services/shared.service";
import { PostComponent } from "../../popup/post/post.component";
import { PutComponent } from "../../popup/put/put.component";
import { BackendService } from "../../services/backend.service";
import {
  DELETE_USER_COMPANIES_END_POINT,
  GET_USER_COMPANIES_END_POINT,
} from "../../services/endpoints";
import Observer from "../../services/observer";
import swal from "sweetalert";
import { COMPANY_POPUP_TYPE } from "../../popup/popup-type";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
})
export class CompanyComponent implements OnInit {
  companyList: [] = [];
  collectionSize: number = 0;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 20, 100];
  constructor(
    private backendService: BackendService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    const offset = (this.page - 1) * this.pageSize;

    this.backendService
      .get(GET_USER_COMPANIES_END_POINT, this.pageSize, offset)
      .subscribe(
        new Observer().OBSERVER_GET((response) => {
            this.collectionSize=response.totalItems;
            this.companyList = response.rows;
        })
      );
  }

  deleteCompany(id_company: string) {
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
          .delete(`${DELETE_USER_COMPANIES_END_POINT}/${id_company}`)
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

  OpenModal(title: string, company?) {
    const modalRef = this.modalService.open(
      title.split("_")[0] === "NEW" ? PostComponent : PutComponent
    );
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.type = COMPANY_POPUP_TYPE;
    modalRef.componentInstance.payload = company && { ...company };
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getCompanies();
  }

  handlePageChange(currentPage: number) {
    this.page = currentPage;
    this.getCompanies();
  }
}
