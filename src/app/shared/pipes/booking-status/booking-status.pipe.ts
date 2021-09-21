import {Pipe, PipeTransform} from '@angular/core';
import {Booking} from 'src/app/core/commons/models/Booking';

@Pipe({
  name: 'bookingStatus'
})
export class BookingStatusPipe implements PipeTransform {

  transform(bookings: Booking[], statusType: string, searchText: string): Booking[] {
    return bookings.filter(
      (booking) =>
        (statusType !== "" ? booking.bookingStatus === statusType : true) &&
        (booking.patientNameSimple?.includes(searchText) || booking.patientContactNo?.includes(searchText))
    );
  }
}
