import { Component, OnInit } from '@angular/core';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Maintenance } from '../../../interfaces/Dispositivo';
import { MantenimientoService } from '../../services/mantenimiento.service';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { TranslationService } from '../../translate.service';

@Component({
  selector: 'pdf-mantenimiento',
  templateUrl: './pdf-mantenimiento.component.html',
  styleUrls: ['./pdf-mantenimiento.component.css']
})
export class PdfMantenimiento implements OnInit {
  constructor(
    private mantenimientoService: MantenimientoService,
    private translationService: TranslationService // Inyecta el servicio de traducción
  ) {}

  registros: Maintenance[] = [];
  localTime: string;

  ngOnInit(): void {
    this.mantenimientoService.getMaintenance().subscribe((data: Maintenance[]) => {
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
        { text: [{ text: `Fecha de generación de informe: `, style: 'subHeader' }, `${this.localTime} \n\n`] },
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
        subHeader: {
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
          ...this.registros.map(registro => [
            registro.deviceId || 'N/A',
            registro.deviceName || 'N/A',
            this.translationService.translate(registro.deviceType) || 'N/A', // Usa el servicio de traducción
            registro.performedBy || 'N/A',
            registro.description || 'N/A',
            registro.materialsUsed || 'N/A',
            this.formatDate(registro.maintenanceDate) || 'N/A',
          ])
        ]
      }
    };
  }

  formatDate(date: string | Date): string {
    return format(new Date(date), 'dd/MMMM/yyyy hh:mm a', { locale: es });
  }

  getLocalTime(): void {
    const date = new Date();
    this.localTime = date.toLocaleString();
  }
}
