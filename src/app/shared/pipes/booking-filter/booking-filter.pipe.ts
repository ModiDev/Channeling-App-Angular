import { Booking } from "src/app/core/commons/models/Booking";
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "BookingFilter",
})
export class BookingFilterPipe implements PipeTransform {
  transform(bookings: Booking[], searchText: string): Booking[] {
    if (searchText.trim().length <= 0) return bookings;
    return bookings.filter(
      (booking) =>
        booking.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
        booking.patient?.mobile.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
