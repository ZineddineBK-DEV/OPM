import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { SharedService } from "../../services/shared.service";
import Observer from "../../services/observer";
import { GET_USER_USER_COUNT_worekorder_BY_VALIDE} from "../../services/endpoints";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dash-client-job',
  templateUrl: './dash-client-job.component.html',
  styleUrls: ['./dash-client-job.component.scss']
})
export class DashClientJobComponent implements OnInit {
  id:string ;
  authority
  myWorekorder
  myWorekorderunhndled
  constructor(
    private backendService: BackendService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.id = this.sharedService.getDecodedAccessToken(sessionStorage.getItem("accessToken"))._id;
    this.authority = this.sharedService.getDecodedAccessToken(sessionStorage.getItem("accessToken")).authority;
    this.myWorekorder =0
    this.myWorekorderunhndled =0

// alert(this.id)
  }
  ngOnInit() {

  }


}
