import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchIcon = faSearch;
  inputText: string = "";

  constructor() { }

  @Output() onChangedEvent = new EventEmitter<string>();
  @Input() placeholderText!: string;

  placeHolder: string = "";

  ngOnInit(): void {
    this.placeHolder = this.placeholderText;
  }

  onChangedEmitter(value: any) {
    this.onChangedEvent.emit(value);
  }

}
