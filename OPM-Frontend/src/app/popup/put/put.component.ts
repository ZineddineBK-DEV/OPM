import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  GET_SUPPLIETS_SERVICES_END_POINT,
  GET_USER_ACCOUNTING_LIST_PLAN_END_POINT,
  PUT_PRODUCTS_CUSTOMERS_END_POINT,
  PUT_SERVICES_END_POINT,
  PUT_SUPPLIETS_CUSTOMERS_END_POINT,
  PUT_USER_ACCOUNTING_PLAN_ROW_END_POINT,
  PUT_USER_COMPANIES_END_POINT,
  PUT_USER_CUSTOMERS_END_POINT,
  PUT_USER_EMPLOYEES_END_POINT,
  PUT_USER_TAXES_END_POINT,
} from "../../services/endpoints";
import { BackendService } from "../../services/backend.service";
import { SharedService } from "../../services/shared.service";
import Observer from "../../services/observer";

@Component({
  selector: "app-put",
  templateUrl: "./put.component.html",
  styleUrls: ["./put.component.scss"],
})
export class PutComponent implements OnInit {
  @Input("title") title: string;
  @Input("type") type: string;
  @Input("payload") payload: any;

  actualDate: string;

  birthdateinputype: string;
  hiredateinputype: string;
  companyList: [];
  suppliersList: [] = [];
  accountsList: [] = [];
  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    public backendService: BackendService,
    private router: Router
  ) {
    this.actualDate = new Date().toDateString();
    this.birthdateinputype = "text";
    this.hiredateinputype = "text";
  }
  ngOnInit() {
    if (this.type == "SERVICES" || this.type == "PRODUCTS") {
      this.getSuppliers();
      this.getAccounts();
    }
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
          this.suppliersList = response.rows;
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
      case "COMPANY":
        endpoint = PUT_USER_COMPANIES_END_POINT;
        payload = { ...payload, id_company: this.payload.id_company };
        break;
      case "EMPLOYEE":
        endpoint = PUT_USER_EMPLOYEES_END_POINT;
        payload = {
          ...payload,
          id_employee: this.payload.id_employee,
          id_company: this.payload.id_company,
        };

        break;
      case "ACCOUNTING_PLAN_ROW":
        endpoint = `${PUT_USER_ACCOUNTING_PLAN_ROW_END_POINT}/${this.payload.id}`;
        break;
      case "TAX":
        endpoint = PUT_USER_TAXES_END_POINT;
        payload = {
          ...payload,
          id: this.payload.id,
          id_company: this.payload.id_company,
        };
        break;
      case "CUSTOMER":
        endpoint = PUT_USER_CUSTOMERS_END_POINT;
        payload = { ...payload, id: this.payload.id };
        break;
      case "SUPPLIERS":
        endpoint = PUT_SUPPLIETS_CUSTOMERS_END_POINT;
        payload = { ...payload, id: this.payload.id };
        break;
      case "PRODUCTS":
        endpoint = PUT_PRODUCTS_CUSTOMERS_END_POINT;
        payload = { ...payload, id_product: this.payload.id_product };
        break;
      case "SERVICES":
        endpoint = PUT_SERVICES_END_POINT;
        payload = { ...payload, id_service: this.payload.id_service };
        break;
    }

    this.backendService
      .put(endpoint, payload)
      .subscribe(
        new Observer(
          this.router,
          null,
          true,
          true,
          this.sharedService,
          this.activeModal
        ).OBSERVER_EDIT()
      );
  }

  setinputtype(event, type: string) {
    if (type === "birthdate") this.birthdateinputype = "date";
    if (type === "hiredate") this.hiredateinputype = "date";
  }
}
