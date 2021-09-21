import { Doctor } from "../../../../core/commons/models/Doctor";
import { Pipe, PipeTransform } from "@angular/core";
import { ActiveStatus } from "src/app/core/commons/constants/Constant";

@Pipe({
  name: "doctorFilter",
})
export class DoctorFilterPipe implements PipeTransform {
  transform(
    doctors: Doctor[],
    searchText: string,
    seachType: ActiveStatus | "all"
  ): Doctor[] {
    const b1 = searchText.trim() !== "";
    const b2 = seachType !== "all";
    if (b1 && b2) {
      return doctors
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter((doctor) => doctor.status === seachType);
    } else if (b1 && !b2) {
      return doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (!b1 && b2) {
      return doctors.filter((doctor) => doctor.status === seachType);
    } else {
      return doctors;
    }
  }
}
