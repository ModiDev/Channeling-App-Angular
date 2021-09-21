import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {ActiveStatus} from 'src/app/core/commons/constants/Constant';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  searchIcon = faSearch;
  inputText: string = "";
  searchType: ActiveStatus | "all" = "all";

  constructor() { }

  @Input() title!: string;
  @Input() placeholder!: string;
  @Output() onSearchTextChange = new EventEmitter<string>();
  @Output() onSearchTypeChange = new EventEmitter<string>();
  @Output() onSearchButtonClick = new EventEmitter<string>();
  @Output() onAction = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onChangeSearchText(value: any) {
    this.onSearchTextChange.emit(value);
    this.inputText = value;
  }
  onChangeSearchType(value: any) {
    this.onSearchTypeChange.emit(value);
  }
  onActionClick() {
    this.onAction.emit();
  }
  searchButtonClick() {
    this.onSearchButtonClick.emit();
  }
}
