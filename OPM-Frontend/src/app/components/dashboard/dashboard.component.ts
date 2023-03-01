import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { SharedService } from "../../services/shared.service";
import swal from "sweetalert";
import Observer from "../../services/observer";
import { USER_DASHBOARD_END_POINT } from "../../services/endpoints";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  id_company: string;
  purchases: number;
  sales: number;

  constructor(
    private backendService: BackendService,
    private sharedService: SharedService
  ) {
    this.purchases = 0.00;
    this.sales = 0.00;
  }

  ngOnInit() {
    this.sharedService.getSelectedCompany((id) => {
      if (id) {
        this.id_company = id;
        this.getDashboard("0");
        this.getDashboard("1");
      } else {
        return swal("Failure!", "No company selected !", "info");
      }
    });
  }
  getDashboard(operation: string) {
    this.backendService
      .get(`${USER_DASHBOARD_END_POINT}/${this.id_company}/${operation}`)
      .subscribe(
        new Observer().OBSERVER_GET((response) => {
          const { rows } = response;
          switch (operation) {
            case "0":
              this.purchases = rows[0].totalprix?rows[0].totalprix.toFixed(2):0.00;
              break;
            case "1":
              this.sales = rows[0].totalprix?rows[0].totalprix.toFixed(2):0.00;
              break;
          }
        })
      );
  }
}
