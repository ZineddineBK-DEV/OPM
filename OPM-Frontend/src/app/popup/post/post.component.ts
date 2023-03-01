import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  ADD_USER_PRODUCTS_END_POINT,
  GET_SUPPLIETS_SERVICES_END_POINT,
  GET_USER_ACCOUNTING_LIST_PLAN_END_POINT,
  POST_SUPPLIETS_CUSTOMERS_END_POINT,
  POST_USER_ACCOUNTING_PLAN_END_POINT,
  POST_USER_ACCOUNTING_PLAN_ROW_END_POINT,
  POST_USER_COMPANIES_END_POINT,
  POST_USER_CUSTOMERS_END_POINT,
  POST_USER_EMPLOYEES_END_POINT,
  POST_USER_SERVICES_END_POINT,
  POST_USER_TAXES_END_POINT,
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
  supplierList: [] = [];
  accountsList: [] = [];
  actualDate: string;

  birthdateinputype: string;
  hiredateinputype: string;
  startperiodinputype: string;
  companyList: [];

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
    this.startperiodinputype = "text";
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
      case "COMPANY":
        endpoint = POST_USER_COMPANIES_END_POINT;
        break;
      case "EMPLOYEE":
        endpoint = POST_USER_EMPLOYEES_END_POINT;
        payload = { ...payload, id_company: this.payload.id_company };

        break;
      case "ACCOUNTING_PLAN_ROW":
        endpoint = POST_USER_ACCOUNTING_PLAN_ROW_END_POINT;
        payload = {
          ...payload,
          id_source: this.payload.id_source,
          id_company: this.payload.id_company,
        };
        break;
      case "ACCOUNTING_PLAN":
        endpoint = POST_USER_ACCOUNTING_PLAN_END_POINT;
        payload = { ...payload, id_company: this.payload.id_company };

        break;
      case "TAX":
        endpoint = POST_USER_TAXES_END_POINT;
        payload = { ...payload, id_company: this.payload.id_company };

        break;

      case "CUSTOMER":
        endpoint = POST_USER_CUSTOMERS_END_POINT;
        payload = { ...payload, id_company: this.payload.id_company };
        break;
      case "SERVICES":
        endpoint = POST_USER_SERVICES_END_POINT;
        payload = { ...payload, id_company: this.payload.id_company,operation:this.payload.operation };
        break;
      case "PRODUCTS":

        endpoint = ADD_USER_PRODUCTS_END_POINT;
        payload = { ...payload, id_company: this.payload.id_company,operation:this.payload.operation };
        break;
      case "SUPPLIERS":
        endpoint = POST_SUPPLIETS_CUSTOMERS_END_POINT;
        payload = { ...payload, id_company: this.payload.id_company };
        break;
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

}
