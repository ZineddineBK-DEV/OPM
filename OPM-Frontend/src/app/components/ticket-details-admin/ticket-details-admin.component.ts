import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../services/backend.service';
import { SharedService } from '../../services/shared.service';
import { GET_LIST_FILES_BY_CLIENTS, GET_LIST_Ticket_BY_CLIENTS } from '../../services/endpoints';
import { ActivatedRoute } from '@angular/router';
import Observer from '../../services/observer';
import { DetailsComponent } from './../../popup/details/details.component';



@Component({
  selector: 'app-ticket-details-admin',
  templateUrl: './ticket-details-admin.component.html',
  styleUrls: ['./ticket-details-admin.component.scss']
})
export class TicketDetailsAdminComponent implements OnInit {
  filesListe;
  collectionSize: number = 0;
  page = 1;
  p: number = 1;
  pageSize = 5;
  pageSizes = [5, 10,20,40];
  id_company:string;
  id_user:any;
  id:any ;
  constructor(
    private backendService: BackendService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.id=this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
        this.getListFilesByClients();
  }
  //OpenModal(sch:string){}
  getListFilesByClients() {
    this.backendService.get(`${GET_LIST_Ticket_BY_CLIENTS}/${this.id}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
    console.log(response.rows);
         this.filesListe = response.rows;
      })
    );
  }



  OpenDetails(title: string, payload:any){
    const modalRef = this.modalService.open(DetailsComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.type = "tiket_detalise";
    modalRef.componentInstance.payload = { ...payload };
  }


  changeSelectedFile(valid) {
    // this.getListFolderByValid(valid);

  }
  handlePageSizeChange(event: any): void {

    this.pageSize = event.target.value;
    console.log(this.pageSize+"rrrrrrrrrrrr")
    this.page = 1;
  }

  handlePageChange(currentPage: number) {
    if(this.id_company){
      // this.getListFolder();
    }
    this.page = currentPage;
  }


}
