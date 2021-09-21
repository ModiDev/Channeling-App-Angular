import { PrintingService } from './../../../core/services/printing/printing.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// @ts-ignore: Unreachable code error
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  
  constructor(
    private printService:PrintingService
  ) { }

  ngOnInit(): void {
  }

  print(){
    var element = document.getElementById("print-section");
    this.printService.print(element)
  }



}
