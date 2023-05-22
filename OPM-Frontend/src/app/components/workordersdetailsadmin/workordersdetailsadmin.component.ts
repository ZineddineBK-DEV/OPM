import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../services/backend.service';
import { SharedService } from '../../services/shared.service';
import {GET_ONE_WORK_ORDER_BY_ID_END_POINT } from '../../services/endpoints';
import Observer from '../../services/observer';
import { environment } from "./../../../environments/environment";
@Component({
  selector: 'app-workordersdetailsadmin',
  templateUrl: './workordersdetailsadmin.component.html',
  styleUrls: ['./workordersdetailsadmin.component.scss']
})
export class WorkordersdetailsadminComponent implements OnInit {
  workOrder =null ;
  id:any ;
  url_imguplode ;
  path_logo ;
  titre_worek_order ;
  constructor(
    private backendService: BackendService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private route: ActivatedRoute

  ) {

    this.id=this.route.snapshot.paramMap.get("id");
    this.url_imguplode = environment.apiUrl+"/"+this.id+"/Logo/" ;

  }
  ngOnInit() {
    this.getOneWorkOrderBayId("admin");



}

async getOneWorkOrderBayId(type_op) {
await this.backendService.get(`${GET_ONE_WORK_ORDER_BY_ID_END_POINT}/${this.route.snapshot.paramMap.get("id")}/${type_op}`).subscribe(
  new Observer().OBSERVER_GET((response) => {
    this.workOrder = response.rows;
    console.log(response.rows);
    // this.titre_worek_order=this.workOrder. ;
    // this.path_logo = response.rows.logo.path ;
  })
);
}

}
