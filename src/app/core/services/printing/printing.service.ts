import { Injectable } from '@angular/core';
// @ts-ignore: Unreachable code error
import * as html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PrintingService {

  constructor() { }


  public print(element:HTMLElement | null){
    var opt = {
      margin:       10,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 1 },
      jsPDF:        { unit: 'in', format: 'A5', orientation: 'portrait' }//landscape / portrait
    };
    html2pdf().from(element).toPdf().get('pdf').then(function (pdf:any) {
      let x = window.open(pdf.output('bloburl'), '_blank');
      x?.focus();
      x?.print();
    });
  }
}
