import { Component } from '@angular/core';
import  pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EquiposServices } from '../../services/equipos.service';
import { enavironments } from '../../../../environments/envarionments';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrl: './pdf-page.component.css'
})
export class PdfPageComponent {

  constructor(private equiposServices:EquiposServices){}
  public crearPdf(): void {
    const doc = new jsPDF();

    doc.text('Hello world!', 10, 10);
    doc.save('hello-world.pdf');
  }

}
