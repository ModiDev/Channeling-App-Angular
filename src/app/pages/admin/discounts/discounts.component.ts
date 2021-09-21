import { DiscountService } from 'src/app/core/services/discount/discount.service';
import { DiscountType } from '../../../core/commons/models/DiscountType';
import { AddDiscountModelComponent } from './../../../shared/modals/add-discount-model/add-discount-model.component';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faBan, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DrawerService } from 'src/app/core/services/drawer/drawer.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ActiveStatus } from 'src/app/core/commons/constants/Constant';
import { Drawer } from 'src/app/core/commons/models/Drawer';
import { AddDrawerModalComponent } from 'src/app/shared/modals/add-drawer-modal/add-drawer-modal.component';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  faEdit = faEdit;
  inactiveIcon = faBan;
  sortIcon = faAngleDown;
  moreIcon = faEllipsisH;
  searchText: string = "";
  searchType: ActiveStatus | "all" = "all";

  status = ActiveStatus

  discounts: DiscountType[] = [];

  constructor(
    private discountService: DiscountService,
    private modalService: NgbModal,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.discountService.getDiscounts().subscribe((a) => {
      this.discounts = a.map((a) => ({
        ...a.payload.doc.data(),
        id: a.payload.doc.id,
      }));
    });
  }

  onChangeSearchText(value: any) {
    this.searchText = value;
  }
  onChangeSearchType(value: any) {
    this.searchType = value;
  }
  onActionClick() {
    this.modalService.open(AddDiscountModelComponent, { centered: true });
  }

  editDrawer(discount: DiscountType) {
    const modalRef = this.modalService.open(AddDiscountModelComponent, {
      centered: true,
    });
    modalRef.componentInstance.discount = discount;
  }

  updateDrawerState(discount: DiscountType) {
    if (discount.id)
      this.discountService.updateDiscountStatus(discount.id).subscribe(
        () => {
          this.notifyService.showSuccess(
            "Drawer state update successfully!",
            "Success"
          );
        },
        () => {
          this.notifyService.showError(
            "Drawer state update failed!",
            "Failure"
          );
        }
      );
  }

}
