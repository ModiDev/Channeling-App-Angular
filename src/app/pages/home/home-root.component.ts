import {Component, OnInit} from '@angular/core';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-root',
  templateUrl: './home-root.component.html',
  styleUrls: ['./home-root.component.scss']
})
export class HomeRootComponent implements OnInit {
  faAngleRight = faAngleDoubleRight;
  showSideBar: boolean = true;
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
