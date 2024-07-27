import { Component, OnInit } from '@angular/core';
import { Device } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'pdf-equipos',
  templateUrl: './pdf-equipos.component.html',
  styleUrls: ['./pdf-equipos.component.css']
})
export class PdfEquipos implements OnInit {
  dispositivos: Device[] = [];
  public patchPanels: Device[] = [];
  public routers: Device[] = [];
  public switches: Device[] = [];
  public endDevices: Device[] = [];
  localTime: string;

  constructor(
    private dispositivoService: EquiposServices,
  ) { }

  ngOnInit(): void {
    this.dispositivoService.getDevices().subscribe((data: any) => {
      if (data && typeof data === 'object') {
        this.routers = data.routers || [];
        this.switches = data.switches || [];
        this.patchPanels = data.patchPanels || [];
        this.endDevices = data.endDevices || [];
        this.dispositivos = [...this.routers, ...this.switches, ...this.patchPanels, ...this.endDevices];
      } else {
        console.error('Error: data is not an object', data);
      }
    });
    this.getLocalTime();
  }

  generatePDF(): void {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download('Listado de equipos.pdf');
  }

  getDocumentDefinition() {
    return {
      content: [
        { text: 'Informe de inventario de equipos', style: 'header' },
        { text: `Este documento contiene un registro detallado de los equipos existentes dentro de la empresa. La información presentada incluye el tipo de dispositivo, el nombre del dispositivo, el número de puertos, si es Poe o no, si es administrable o no, la dirección IP y la dirección MAC.\n\n` },
        { text: [{ text: `Fecha de generación del informe: `, style: 'subHeader' }, `${this.localTime}\n\n`] },

        this.getDispositivosTable(),
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

  getDispositivosTable() {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'ID', style: 'tableHeader' },
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'Tipo de Dispositivo', style: 'tableHeader' },
            { text: 'Número de puertos', style: 'tableHeader' },
            { text: 'Poe', style: 'tableHeader' },
            { text: 'Administrable', style: 'tableHeader' },
            { text: 'Dirección Ip', style: 'tableHeader' },
            { text: 'Dirección MAC', style: 'tableHeader' },
          ],
          ...this.dispositivos.map(dispositivo => [
            dispositivo.id || 'N/A',
            dispositivo.name || 'N/A',
            dispositivo.deviceType || 'N/A',
            dispositivo.numberOfPorts || 'N/A',
            dispositivo.poe ? 'Sí' : 'No',
            dispositivo.manageable ? 'Sí' : 'No',
            dispositivo.ipAddress || 'N/A',
            dispositivo.mac || 'N/A',
          ])
        ]
      }
    };
  }
  getLocalTime(): void {
    const date = new Date();
    this.localTime = date.toLocaleString();
  }
}
