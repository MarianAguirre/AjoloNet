import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Mantenimiento } from '../../../interfaces/Dispositivo';
import { MantenimientoService } from '../../services/mantenimiento.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'pdf-mantenimiento',
  templateUrl: './pdf-mantenimiento.component.html',
  styleUrls: ['./pdf-mantenimiento.component.css']
})
export class PdfMantenimiento implements OnInit {
  registros: Mantenimiento[] = [];
  localTime: string;

  constructor(
    private mantenimientoService: MantenimientoService,
  ) {}

  ngOnInit(): void {
    this.mantenimientoService.getMaintenance().subscribe((data: Mantenimiento[]) => {
      this.registros = data;
      console.log(data);
    });
    this.getLocalTime();
  }

  generatePDF(): void {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download('Registros de mantenimientos.pdf');
  }

  getDocumentDefinition() {
    return {
      content: [
        { text: 'Informe de mantenimiento de equipos', style: 'header' },
        { text: `Este documento contiene un registro de los mantenimientos realizados a los equipos. La información presentada incluye el tipo de dispositivo, el nombre del dispositivo, el encargado del mantenimiento, la descripción del trabajo realizado, los materiales utilizados y la fecha del mantenimiento. \n\n` },
        { text:[ {text: `Fecha de generación de informe: `, style: 'subHeader'  }, `${this.localTime} \n\n`]},

        this.getMantenimiento(),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        subHeader:{
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 10]
        }
      }
    };
  }


  getMantenimiento() {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Id', style: 'tableHeader' },
            { text: 'Equipo', style: 'tableHeader' },
            { text: 'Tipo', style: 'tableHeader' },
            { text: 'Encargado', style: 'tableHeader' },
            { text: 'Descripción', style: 'tableHeader' },
            { text: 'Materiales usados', style: 'tableHeader' },
            { text: 'Fecha del mantenimiento', style: 'tableHeader' },
          ],
          ...this.registros.map(registros => [
            registros.deviceId || 'N/A',
            registros.deviceName || 'N/A',
            registros.deviceType || 'N/A',
            registros.performedBy || 'N/A',
            registros.description || 'N/A',
            registros.materialsUsed || 'N/A',
            this.formatDate(registros.maintenanceDate) || 'N/A',
          ])
        ]
      }
    };
  }

  formatDate(date: string | Date): string {
    return format(new Date(date), 'dd/MMMM/yyyy hh:mm a', {locale:es});
  }
  getLocalTime(): void {
    const date = new Date();
    this.localTime = date.toLocaleString();
  }
}
