import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input('title') title:string;
  @Input('type') type:string;

  @Input('payload') payload:any;
  userRole
  constructor(public actifmodal:NgbActiveModal,    private sharedService: SharedService,) { 
    this.userRole= this.sharedService.getDecodedAccessToken(sessionStorage.getItem("accessToken")).authority ;
  }

  ngOnInit() {

    // alert(JSON.stringify(this.payload))
    // alert(this.userRole)
  }

}
