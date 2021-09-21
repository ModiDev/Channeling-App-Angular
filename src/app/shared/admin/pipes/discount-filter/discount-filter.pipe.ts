import { DiscountType } from '../../../../core/commons/models/DiscountType';
import { Pipe, PipeTransform } from "@angular/core";
import { ActiveStatus } from "src/app/core/commons/constants/Constant";
import { Drawer } from "src/app/core/commons/models/Drawer";

@Pipe({
  name: "discountFilter",
})
export class DiscountFilterPipe implements PipeTransform {
  transform(discounts: DiscountType[], searchText: string,seachType: ActiveStatus | "all"): DiscountType[] {
    const b1 = searchText.trim() !== "";
    const b2 = seachType !== "all";
    if (b1 && b2) {
      return discounts
        .filter((discount) =>
          discount.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter((discount) => discount.status === seachType);
    } else if (b1 && !b2) {
      return discounts.filter((discount) =>
        discount.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (!b1 && b2) {
      return discounts.filter((discount) => discount.status === seachType);
    } else {
      return discounts;
    }
  }
}
