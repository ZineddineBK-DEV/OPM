import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input('title') title:string;
  @Input('type') type:string;

  @Input('payload') payload:any;

  constructor(public actifmodal:NgbActiveModal) { }

  ngOnInit() {
  }

}
