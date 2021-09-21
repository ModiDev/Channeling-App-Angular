import { MDrawer } from './../../../../pages/admin/drawers/drawers.component';
import { Pipe, PipeTransform } from "@angular/core";
import { ActiveStatus } from "src/app/core/commons/constants/Constant";
import { Drawer } from "src/app/core/commons/models/Drawer";

@Pipe({
  name: "drawerFilter",
})
export class DrawerFilterPipe implements PipeTransform {
  transform(drawers: MDrawer[], searchText: string,seachType: ActiveStatus | "all"): MDrawer[] {
    const b1 = searchText.trim() !== "";
    const b2 = seachType !== "all";
    if (b1 && b2) {
      return drawers
        .filter((drawer) =>
          drawer.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter((drawer) => drawer.status === seachType);
    } else if (b1 && !b2) {
      return drawers.filter((drawer) =>
        drawer.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (!b1 && b2) {
      return drawers.filter((drawer) => drawer.status === seachType);
    } else {
      return drawers;
    }
  }
}
