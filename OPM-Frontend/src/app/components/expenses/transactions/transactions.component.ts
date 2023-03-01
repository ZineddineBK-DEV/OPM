import { Component, OnInit } from "@angular/core";
import { SharedService } from "../../../services/shared.service";
import swal from "sweetalert";
import { BackendService } from "../../../services/backend.service";
import Observer from "../../../services/observer";
import {
  GET_USER_TRANSACTIONS_PRODUCTS_END_POINT,
  GET_USER_TRANSACTIONS_SERVICES_END_POINT,
} from "../../../services/endpoints";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetailsComponent } from "../../../popup/details/details.component";
import {
  TRANSACTIONS_PRODUCTS_POPUP_TYPE,
  TRANSACTIONS_SERVICES_POPUP_TYPE,
} from "../../../popup/popup-type";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  collectionSize: number = 0;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 20, 100];
  transactionsList: [] = [];
  etat: string;
  id_company: string;
  defaultEndPoint: string;
  operation: string;

  constructor(
    private sharedService: SharedService,
    private backendService: BackendService,
    private modalService: NgbModal
  ) {
    this.etat = "1";
    this.operation = "0";
  }

  ngOnInit() {
    this.sharedService.getSelectedCompany((id) => {
      if (id) {
        this.id_company = id;
        this.defaultEndPoint = `${GET_USER_TRANSACTIONS_PRODUCTS_END_POINT}/${this.id_company}/${this.operation}`;
        this.getTransactions(this.defaultEndPoint);
      } else {
        return swal("Failure!", "No company selected !", "info");
      }
    });
  }

  getTransactions(endpoint: string) {
    this.transactionsList = [];
    const offset = (this.page - 1) * this.pageSize;

    this.backendService.get(endpoint, this.pageSize, offset).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.collectionSize = response.totalItems;
        this.transactionsList = response.rows;
      })
    );
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getTransactions(this.defaultEndPoint);
  }

  handlePageChange(currentPage: number) {
    this.page = currentPage;
    this.getTransactions(this.defaultEndPoint);
  }

  OpenDetails(title: string, payload: any) {
    const modalRef = this.modalService.open(DetailsComponent);
    modalRef.componentInstance.title = `${title}${this.operation=='0'?' (PURCHASE)':' (SALE)'}`;
    modalRef.componentInstance.type =
      this.etat == "1"
        ? TRANSACTIONS_PRODUCTS_POPUP_TYPE
        : TRANSACTIONS_SERVICES_POPUP_TYPE;

    modalRef.componentInstance.payload = payload && { ...payload };
  }

  changeState(event) {
    this.etat = event.nextId.toString();
    switch (this.etat) {
      case "1":
        this.defaultEndPoint = `${GET_USER_TRANSACTIONS_PRODUCTS_END_POINT}/${this.id_company}/0`;
        break;
      case "2":
        this.defaultEndPoint = `${GET_USER_TRANSACTIONS_SERVICES_END_POINT}/${this.id_company}/0`;
        break;
    }
    this.getTransactions(this.defaultEndPoint);
  }

  changeOperation(value: string) {
    this.operation = value;
    switch (this.etat) {
      case "1":
        this.defaultEndPoint = `${GET_USER_TRANSACTIONS_PRODUCTS_END_POINT}/${this.id_company}/${this.operation}`;
        break;
      case "2":
        this.defaultEndPoint = `${GET_USER_TRANSACTIONS_SERVICES_END_POINT}/${this.id_company}/${this.operation}`;
        break;
    }
    this.getTransactions(this.defaultEndPoint);
  }
}
