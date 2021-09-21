import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActiveStatus } from 'src/app/core/commons/constants/Constant';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-action-bar',
  templateUrl: './admin-action-bar.component.html',
  styleUrls: ['./admin-action-bar.component.scss']
})
export class AdminActionBarComponent implements OnInit {
  searchIcon = faSearch;
  inputText: string = "";
  searchType:ActiveStatus | "all" = "all";

  @Input() titleAdmin!:string;
  @Input() actionButtonText!:string;

  constructor() { }

  @Output() onSearchTextChange = new EventEmitter<string>();
  @Output() onSearchTypeChange = new EventEmitter<string>();
  @Output() onAction = new EventEmitter<string>();


  ngOnInit(): void {
  }

  onChangeSearchText(value: any) {
    this.onSearchTextChange.emit(value);
  }
  onChangeSearchType(value: any) {
    this.onSearchTypeChange.emit(value);
  }
  onActionClick() {
    this.onAction.emit();
  }

}
