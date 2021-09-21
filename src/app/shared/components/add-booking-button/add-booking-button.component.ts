import {Component, Input, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Session} from 'src/app/core/commons/models/Session';
import {AddBookingModalComponent} from '../../modals/add-booking-modal/add-booking-modal.component';
import {AlertDialogBoxComponent} from "../alert-dialog-box/alert-dialog-box.component";
import {Booking} from "../../../core/commons/models/Booking";

@Component({
  selector: 'app-add-booking-button',
  templateUrl: './add-booking-button.component.html',
  styleUrls: ['./add-booking-button.component.scss']
})
export class AddBookingButtonComponent implements OnInit {
  faplus = faPlus;

  @Input() session!: Session;
  @Input() bookings!:Booking;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  openAddBooking() {
    if(!this.session.limit_not_exceeded && this.session.limit_not_exceeded !== undefined){
      let ngbModalOptions: NgbModalOptions = {
        windowClass: 'my-class-alert',
        centered: true,
      };
      const modalRef = this.modalService.open(AlertDialogBoxComponent, ngbModalOptions);
      modalRef.componentInstance.alertTitle = "PATIENT LIMIT EXCEEDED";
      modalRef.componentInstance.alertDescription= "Patient limit exceeded for this session and couldn't add any appointments ";
    }
    else{
      let ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false,
        centered: true,
      };
      const modalRef = this.modalService.open(AddBookingModalComponent, ngbModalOptions);
      modalRef.componentInstance.session = this.session;
    }
  }

}
