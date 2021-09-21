import {PrintingService} from "./../../../core/services/printing/printing.service";
import {Component, OnInit} from "@angular/core";
import {
  faEdit,
  faEllipsisV,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Booking} from "../../../core/commons/models/Booking";
import {BookingService} from "../../../core/services/booking/booking.service";
import {BookingStatus, PaymentMethod} from "../../../core/commons/constants/Constant";
import {Session} from "src/app/core/commons/models/Session";
import {DialogBoxComponent} from "src/app/shared/components/dialog-box/dialog-box.component";
import {BookingCancelDTO} from "src/app/core/commons/dtos/BookingCancelDTO";
import {NotificationService} from "src/app/core/services/notification/notification.service";
import {BookingRefundDTO} from "src/app/core/commons/dtos/BookingRefundDTO";
import {FormControl, FormGroup} from "@angular/forms";
import {AddBookingModalComponent} from "../add-booking-modal/add-booking-modal.component";
import {LogsViewModalComponent} from "../logs-view-modal/logs-view-modal.component";
import {ReceiptTemplateData} from "../../print-templates/receipt-template/receipt-template.component";
import {UserService} from "src/app/core/services/user/user.service";
import {ngbModalOptions} from "src/app/pages/home/home-page/home.component";

@Component({
  selector: "app-appointments-view",
  templateUrl: "./appointments-view.component.html",
  styleUrls: ["./appointments-view.component.scss"],
})
export class AppointmentsViewComponent implements OnInit {
  faCross = faTimes;
  faEdit = faEdit;
  faEllipsis = faEllipsisV;

  booking!: Booking;
  session!: Session;
  printTamplateData!: ReceiptTemplateData;

  payByCashDiscount: number = 0;
  totalFee: number = 0;

  isTentative: boolean = false;
  isRefund: boolean = false;
  isCardPayment: boolean = false;

  formGroup!: FormGroup;

  isConfirmed: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private bookingService: BookingService,
    private modalService: NgbModal,
    private printingService: PrintingService,
    private userService: UserService,
    private notifyService: NotificationService
  ) {

  }

  appointmentTitle: string = "APPOINTMENT";
  confirmButtonTitle: string = "CONFIRM";
  cancelButtonTitle: string = "CANCEL";

  ngOnInit(): void {
    if (
      this.booking.bookingStatus === BookingStatus.CONFIRMED ||
      this.booking!.bookingStatus === undefined
    ) {
      this.appointmentTitle = "APPOINTMENT ".concat(this.booking.referenceNo);
      this.confirmButtonTitle = "PRINT BILL";
      this.cancelButtonTitle = "REFUND";

      this.formGroup = new FormGroup({
        reason: new FormControl("", []),
        amount: new FormControl("", []),
      });
    }
    if (
      this.booking.bookingStatus === BookingStatus.CANCELLED ||
      this.booking!.bookingStatus === undefined
    ) {
      this.appointmentTitle = "APPOINTMENT".concat(this.booking.referenceNo);
      this.confirmButtonTitle = "REACTIVATE";
    }

    if (
      this.booking.bookingStatus === BookingStatus.TENTATIVE ||
      this.booking!.bookingStatus === undefined
    ) {
      this.isTentative = true;
    }

    this.booking.services.forEach((value) => {
      this.payByCashDiscount += value.cashDiscountFee;
      this.totalFee += value.doctorFee + value.hospitalFee;
    });

    this.booking.additionalFees?.forEach((value, index) => {
      this.payByCashDiscount += value.cashDiscountFee;
      this.totalFee += value.doctorFee + value.hospitalFee;
      this.booking.services[index].doctorFee += value.doctorFee;
      this.booking.services[index].hospitalFee += value.hospitalFee;
    });

    if (this.booking.paymentMethod === PaymentMethod.CARD) {
      this.payByCashDiscount = 0;
      this.isCardPayment = true;
    }

    this.totalFee -= this.payByCashDiscount;

    this.fillDataToPrintTemplate();
  }

  public fillDataToPrintTemplate(refundAmount: number = 0) {
    if (this.session.createdBy) {
      console.log(this.booking.doctor);
      this.userService.getUserByUid(this.session.createdBy).subscribe(user => {
        this.printTamplateData = {
          invoiceNo: this.booking.referenceNo,
          patientNo: this.booking.patientNo + "",
          patientName: this.booking.patientName,
          sessionStartAt: this.session.startsAt,
          sessionEndAt: this.session.endsAt,
          isRefund: this.isRefund,
          refundAmmount: refundAmount,
          doctorName: this.session.doctor?.name || "",
          contact: this.booking.patient?.mobile || "",
          bookingDate: this.booking.createdAt || new Date(),
          fees: this.booking.services.map((s) => ({
            name: s.service.toString(),
            doctorFee: +s.doctorFee,
            hospitalFee: +s.hospitalFee,
            total: +s.doctorFee + +s.hospitalFee,
          })),
          total: this.totalFee,
          misc: 0,
          discount: this.payByCashDiscount,
          paid: this.totalFee - this.payByCashDiscount,
          paymentType: this.booking.paymentMethod,
          createdBy: user.firstName,
          createdAt: new Date((this.session.createdAt as any).seconds * 1000) || new Date(),
        };
      })
    }

  }

  openEditBooking() {
    const modalRef = this.modalService.open(AddBookingModalComponent, ngbModalOptions);
    if (this.booking.bookingStatus === BookingStatus.CONFIRMED) {
      modalRef.componentInstance.isConfirmEdit = true;
    }
    modalRef.componentInstance.booking = this.booking;
    modalRef.componentInstance.session = this.session;
    modalRef.componentInstance.isEdit = true;
    this.activeModal.close();
  }

  openBookingLogs() {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      size: "lg"
    }
    const modalRef = this.modalService.open(LogsViewModalComponent, modalOptions);
    modalRef.componentInstance.session = this.session;
    modalRef.componentInstance.booking = this.booking;
    this.activeModal.close();
  }

  onConfirm() {
    if (this.booking.bookingStatus === BookingStatus.TENTATIVE) {
      const modalRef = this.modalService.open(AddBookingModalComponent, ngbModalOptions);
      modalRef.componentInstance.booking = this.booking;
      modalRef.componentInstance.session = this.session;
      modalRef.componentInstance.isEdit = true;
      modalRef.componentInstance.isConfirmEdit = true;

      this.activeModal.close();
    } else if (this.booking.bookingStatus === BookingStatus.CONFIRMED) {
      if (this.isRefund) {
        this.refundBooking();
      } else {
        this.printBill();
      }
    }
  }

  onCancel() {
    if (this.booking.bookingStatus === BookingStatus.CONFIRMED) {
      this.isRefund = true;
      this.confirmButtonTitle = "CONFIRM";
      this.cancelButtonTitle = "CANCEL";
    }
    else {
      const modalOptions: NgbModalOptions = {
        ...ngbModalOptions,
        windowClass: 'my-class'
      }
      const modalRef = this.modalService.open(DialogBoxComponent, modalOptions);
      modalRef.componentInstance.description = " Cancelling appointment will move this patient no to available numbers";
      modalRef.componentInstance.onPressEvent.subscribe(($e: boolean) => {
        if ($e) {
          const cancelBooking: BookingCancelDTO = {
            bookingId: this.booking.id as string
          }
          this.bookingService.cancelBooking(cancelBooking).subscribe(
            (success) => {
              this.activeModal.close();
              this.notifyService.showSuccess("Appointment cancelled successfully!", "Success");
            },
            (error) => {
              console.log(error);
              this.notifyService.showError("Cancelling appointment failed!", "Failure");
            }
          )
        }
      });
    }
  }

  refundBooking() {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      windowClass: 'my-class'
    }
    const modalRef = this.modalService.open(DialogBoxComponent, ngbModalOptions);
    modalRef.componentInstance.description = " Refunding will cancel this appointment and the refund amount will be deducted from cash balance";
    modalRef.componentInstance.onPressEvent.subscribe(($e: boolean) => {
      if ($e) {
        const refundBooking: BookingRefundDTO = {
          bookingId: this.booking.id as string,
          reason: this.formGroup.get("reason")?.value,
          amount: Number(this.formGroup.get("amount")?.value),
        };

        this.bookingService.refundBooking(refundBooking).subscribe(
          (success) => {
            // this.activeModal.close();
            this.isConfirmed = true
            this.fillDataToPrintTemplate(Number(this.formGroup.get("amount")?.value))
            this.notifyService.showSuccess("Refunded successfully!", "Success");
          },
          (error) => {
            console.log(error);
            this.notifyService.showError("Refunding failed!", "Failure");
          }
        );
      }
    });
  }

  printBill() {
    if (this.isRefund) {
      this.fillDataToPrintTemplate(Number(this.formGroup.get("amount")?.value))
    }
    let element = document.getElementById("receipt-print-section");
    this.printingService.print(element);
  }
}
