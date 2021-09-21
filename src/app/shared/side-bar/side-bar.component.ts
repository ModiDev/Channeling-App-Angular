import {Component, OnInit} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {faAngleDown, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {DoctorService} from 'src/app/core/services/doctor/doctor.service';
import {SpecialityService} from 'src/app/core/services/speciality/speciality.service';
import {Doctor} from 'src/app/core/commons/models/Doctor';
import {Specialty} from "../../core/commons/constants/Constant";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  currentRoute: string = "/dashboard/doctor";

  faAngleRight = faAngleRight;
  faAngleDown = faAngleDown;

  specialities: string[] = [];

  doctors: Doctor[] = [];
  doctorsSubscription: Subscription = new Subscription;

  constructor(
    private specialityService: SpecialityService,
    private doctorService: DoctorService,
    private router: Router,
  ) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.includes("dashboard/history") ? "/dashboard/history" : "/dashboard/doctor";
      }
    });
  }

  ngOnInit(): void {

    this.specialities = this.specialityService.getSpecialtyValues();

    this.doctorsSubscription = this.doctorService
      .getActiveDoctors()
      .subscribe((action) => {
        this.doctors = action.map(dc => {
          return {
            ...dc.payload.doc.data() as Doctor,
            id: dc.payload.doc.id
          }
        })
      });
  }

  getDoctorsBySpeciality(id?: String) {
    return this.doctors.filter((doctor) => doctor.specialty === id);
  }

  ngOnDestroy(): void {
    this.doctorsSubscription.unsubscribe();
  }
}
