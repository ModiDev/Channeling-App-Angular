import { DrawerLogsModalComponent } from './../../../shared/modals/drawer-logs-modal/drawer-logs-modal.component';
import {AddDrawerModalComponent} from "./../../../shared/modals/add-drawer-modal/add-drawer-modal.component";
import {DrawerService} from "./../../../core/services/drawer/drawer.service";
import {Component, OnInit} from "@angular/core";
import {
  faAngleDown,
  faBan,
  faEdit,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import {ActiveStatus} from "src/app/core/commons/constants/Constant";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Drawer} from "src/app/core/commons/models/Drawer";
import {NotificationService} from "src/app/core/services/notification/notification.service";
import {ngbModalOptions} from "../../home/home-page/home.component";

export interface MDrawer extends Drawer {
  loading?: boolean;
}
@Component({
  selector: "app-drawers",
  templateUrl: "./drawers.component.html",
  styleUrls: ["./drawers.component.scss"],
})
export class DrawersComponent implements OnInit {
  faEdit = faEdit;
  inactiveIcon = faBan;
  sortIcon = faAngleDown;
  moreIcon = faEllipsisH;
  searchText: string = "";
  searchType: ActiveStatus | "all" = "all";

  status = ActiveStatus;

  drawers: MDrawer[] = [];

  constructor(
    private drawerService: DrawerService,
    private modalService: NgbModal,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.drawerService.getDrawerCollection().subscribe((a) => {
      this.drawers = a.map((a) => ({
        ...a.payload.doc.data(),
        id: a.payload.doc.id,
        loading: false,
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
    this.modalService.open(AddDrawerModalComponent, ngbModalOptions);
  }
  openDrawerLogs(drawer: Drawer) {
    const modalRef = this.modalService.open(DrawerLogsModalComponent, {
      centered: true,
      windowClass: "drawer-log-model",
    });
    modalRef.componentInstance.drawer = drawer;
  }

  editDrawer(drawer: Drawer) {
    const modalRef = this.modalService.open(AddDrawerModalComponent, ngbModalOptions);
    modalRef.componentInstance.drawer = drawer;
  }

  updateDrawerState(drawer: MDrawer) {
    if (drawer.id) {
      drawer.loading = true;
      this.drawerService.updateDrawerState({ id: drawer.id }).subscribe(
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
}
