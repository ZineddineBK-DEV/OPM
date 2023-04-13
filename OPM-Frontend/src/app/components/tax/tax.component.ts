import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../../popup/post/post.component';
import { PutComponent } from '../../popup/put/put.component';
import { BackendService } from '../../services/backend.service';
import { SharedService } from '../../services/shared.service';
import { DELETE_USER_TAXES_END_POINT, GET_USER_TAXES_END_POINT } from '../../services/endpoints';
import { DetailsComponent } from '../../popup/details/details.component';
import { TAX_POPUP_TYPE } from '../../popup/popup-type';

import Observer from '../../services/observer';
import swal from 'sweetalert';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  taxesList: [] = [];
  collectionSize: number = 0;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 20, 100];
  id_company:string;
  constructor(
    private backendService: BackendService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.getSelectedCompany((id)=>{
      if (id) {
        this.id_company = id;
        this.getTaxes();
      } else {
        return swal("Failure!", "No company selected !", "info");
      }
    });
  }

  getTaxes() {

    const offset = (this.page - 1) * this.pageSize;
    this.backendService.get(`${GET_USER_TAXES_END_POINT}/${this.id_company}`,this.pageSize,offset).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.collectionSize=response.totalItems;
         this.taxesList = response.rows;
      })
    );
  }

  deleteTax(id_tax: string) {
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
          .delete(`${DELETE_USER_TAXES_END_POINT}/${id_tax}`)
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

  OpenModal(title: string, tax?) {
    if(this.id_company){
    const modalRef = this.modalService.open(
      title.split("_")[0] === "NEW" ? PostComponent : PutComponent,
      { size: "lg", backdrop: "static" }
    );
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.type = TAX_POPUP_TYPE;

    modalRef.componentInstance.payload = tax!=null ? tax:{id_company:this.id_company};
  } else {
    return swal("Failure!", "No company selected !", "info");
  }
  }

  OpenDetails(title: string, payload:any) {
    const modalRef = this.modalService.open(DetailsComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.type = TAX_POPUP_TYPE;
    modalRef.componentInstance.payload = { ...payload };
  }

  handlePageSizeChange(event: any): void {
    if(this.id_company){

      this.getTaxes();
    }
    this.pageSize = event.target.value;
    this.page = 1;
  }

  handlePageChange(currentPage: number) {
    if(this.id_company){
      this.getTaxes();
    }
    this.page = currentPage;
  }
}
