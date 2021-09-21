import { Component, OnInit } from '@angular/core';
import { ActiveStatus } from 'src/app/core/commons/constants/Constant';
import {faAngleDown, faBan,faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from '@fortawesome/free-regular-svg-icons';


interface User {
  AgetNo: string;
  firstName: string;
  lastName: string;
  workingPlace: string;
  contactNumber: string;
  userName: string;
}

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  faEdit = faEdit;
  inactiveIcon= faBan;
  sortIcon = faAngleDown;
  searchText: string = "";
  searchType: ActiveStatus | "all" = "all"


  users: User[] = [
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    },
    {
      AgetNo: 'A15',
      firstName: 'Asitha',
      lastName: 'Karunarathna',
      workingPlace: 'Parmacy beta Tangala',
      contactNumber: '0765432101',
      userName: 'AsithaK',
    }

  ];



  constructor() { }

  ngOnInit(): void {
  }

  onChangeSearchText(value: any) {
    this.searchText = value;
  }
  onChangeSearchType(value: any) {
    this.searchType = value;
  }
  onActionClick() {

  }

}
