import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import swal from "sweetalert";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { SharedService } from "../../services/shared.service";
import {
  DELETE_USER_ACCOUNTING_PLAN_ROW_END_POINT,
  GET_USER_ACCOUNTING_PLAN_END_POINT,
  GET_USER_ACCOUNTING_PLAN_SOURCES_END_POINT,
  IMPORT_USER_ACCOUNTING_PLAN_END_POINT,
  UNLINK_USER_ACCOUNTING_PLAN_END_POINT,
} from "../../services/endpoints";
import Observer from "../../services/observer";
import { PostComponent } from "../../popup/post/post.component";
import { PutComponent } from "../../popup/put/put.component";
import {
  ACCOUNTING_PLAN_POPUP_TYPE,
  ACCOUNTING_PLAN_ROW_POPUP_TYPE,
} from "../../popup/popup-type";
import { ExcelService } from "../../services/excel.service";

@Component({
  selector: "app-accounting-plan",
  templateUrl: "./accounting-plan.component.html",
  styleUrls: ["./accounting-plan.component.scss"],
})
export class AccountingPlanComponent implements OnInit {
  accountingPlansList: [] = [];
  sourceFiles = [];
  id_company: string;
  upload: string;
  id_source: string;
  collectionSize: number = 0;
  page = 1;
  pageSize = 100;
  pageSizes = [100, 150, 200];

  constructor(
    private backendService: BackendService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.sharedService.getSelectedCompany((id) => {
      if (id) {
        this.id_company = id;
        this.getsources();
      } else {
        return swal("Failure!", "No company selected !", "info");
      }
    });
  }

  getsources() {
    if (this.id_company) {
      this.backendService
        .get(`${GET_USER_ACCOUNTING_PLAN_SOURCES_END_POINT}/${this.id_company}`)
        .subscribe(
          new Observer().OBSERVER_GET((response) => {
            const { rows } = response;
            const { err } = rows[0];
            if (!err) {
              this.sourceFiles = rows;
            }
          })
        );
    } else {
      return swal("Failure!", "No company selected !", "info");
    }
  }

  changeSelectedFile(selected: string) {
    const [a, b] = selected.split(";");
    this.upload = a;
    this.id_source = b;
    this.accountingPlansList.length = 0;
    this.collectionSize = 1;
    if (this.id_company) this.getAccountingPlans(a);
  }

  getAccountingPlans(upload: string) {
    const offset = (this.page - 1) * this.pageSize;
    this.upload = upload;
    this.backendService
      .get(
        `${GET_USER_ACCOUNTING_PLAN_END_POINT}/${this.id_company}/${upload}`,
        this.pageSize,
        offset
      )
      .subscribe(
        new Observer().OBSERVER_GET((response) => {
          if (!response.err) {
            this.accountingPlansList = response.rows;
            this.collectionSize = response.totalItems;
          }
        })
      );
  }

  deleteAccountingPlanRow(id: string) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      closeOnEsc: true,
      closeOnClickOutside: true,
      buttons: ["cancel", "confirm"],
    }).then((result) => {
      if (result) {
        this.backendService
          .delete(`${DELETE_USER_ACCOUNTING_PLAN_ROW_END_POINT}/${id}`)
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

  OpenModal(title: string, accounting_plan?) {
    if (this.id_company) {
      if (this.sourceFiles.length > 0 || title.includes("NEW")) {
        const modalRef = this.modalService.open(
          title.split("_")[0] === "NEW" ? PostComponent : PutComponent
        );
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.type = title.includes("ROW")
          ? ACCOUNTING_PLAN_ROW_POPUP_TYPE
          : ACCOUNTING_PLAN_POPUP_TYPE;
        modalRef.componentInstance.payload = accounting_plan
          ? {
              ...accounting_plan,
            }
          : { id_company: this.id_company, id_source: this.id_source };
      } else return swal("Failure!", "No file selected !", "info");
    } else {
      return swal("Failure!", "No company selected !", "info");
    }
  }

  changeFile(event) {
    if (this.id_company) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData = new FormData();
        formData.append("accounting-plan-excel-file", file);
        this.backendService
          .post(
            `${IMPORT_USER_ACCOUNTING_PLAN_END_POINT}/${this.id_company}`,
            formData
          )
          .subscribe(
            new Observer(
              this.router,
              null,
              true,
              true,
              this.sharedService,
              null
            ).OBSERVER_POST()
          );
      }
    } else {
      return swal("Failure!", "No company selected !", "info");
    }
  }

  unlinkFile() {
    if (this.id_company) {
      if (this.sourceFiles.length > 0) {
        const lang = JSON.parse(localStorage.getItem("lang")).lang;
        swal({
          title: lang && lang == "en" ? "Are you sure?" : "Êtes-vous sûr?",
          text:
            lang && lang == "en"
              ? "You won't be able to revert this !"
              : "Vous ne pourrez pas revenir en arrière !",
          icon: "warning",
          closeOnEsc: true,
          closeOnClickOutside: true,
          buttons:
            lang && lang == "en"
              ? ["cancel", "confirm"]
              : ["annuler", "confirmer"],
        }).then((result) => {
          if (result) {
            this.backendService
              .delete(
                `${UNLINK_USER_ACCOUNTING_PLAN_END_POINT}/${this.id_company}/${this.upload}`
              )
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
      } else return swal("Failure!", "No file selected !", "info");
    } else {
      return swal("Failure!", "No company selected !", "info");
    }
  }

  exportFile() {
    if (this.id_company) {
      if (this.sourceFiles.length > 0) {
        this.backendService
          .get(
            `${GET_USER_ACCOUNTING_PLAN_END_POINT}/${this.id_company}/${this.upload}`
          )
          .subscribe(
            new Observer().OBSERVER_GET((response) => {
              if (!response.err) {
                this.excelService.exportAsExcelFile(response.rows);
              }
            })
          );
      } else {
        return swal("Failure!", "No file selected !", "info");
      }
    } else {
      return swal("Failure!", "No company selected !", "info");
    }
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    if (this.id_company) this.getAccountingPlans(this.upload);
  }

  handlePageChange(currentPage: number) {
    this.page = currentPage;
    if (this.id_company) this.getAccountingPlans(this.upload);
  }
}
