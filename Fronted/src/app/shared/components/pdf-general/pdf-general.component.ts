import { Area, Connections, Device, Maintenance, Rack } from '../../../interfaces/Dispositivo';
import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../services/conection.service';
import { EquiposServices } from '../../services/equipos.service';
import { es } from 'date-fns/locale';
import { format } from 'date-fns'; // Importar la función format de date-fns
import { MantenimientoService } from '../../services/mantenimiento.service';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'pdf-general',
  templateUrl: './pdf-general.component.html',
  styleUrls: ['./pdf-general.component.css']
})
export class PdfGeneral implements OnInit {
  dispositivos: Device[] = [];
  public patchPanels: Device[] = [];
  public routers: Device[] = [];
  public switches: Device[] = [];
  public endDevices: Device[] = [];
  public areas: Area[] = [];
  public racks: Rack[] = [];
  registros: Maintenance[] = [];
  conexiones: Connections[] = [];
  localtime: string

  constructor(
    private dispositivoService: EquiposServices,
    private mantenimientoService: MantenimientoService,
    private conectionService: ConectionService
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
    this.dispositivoService.getAreas().subscribe((data: Area[]) => {
      this.areas = data;
    });
    this.dispositivoService.getRacks().subscribe((data: Rack[]) => {
      this.racks = data;
    });
    this.mantenimientoService.getMaintenance().subscribe((data: Maintenance[]) => {
      this.registros = data;
      console.log(data);
    });
    this.conectionService.getConnections().subscribe((data: Connections[]) => {
      this.conexiones = data;
      console.log(data);
    });
    this.getLocalTime()
  }

  generatePDF(): void {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download('Documentación.pdf');
  }

  getDocumentDefinition() {
    return {
      content: [
        { text: 'Informe completo de infraestructura tecnológica', style: 'header' },
        { text: `Este documento proporciona un registro exhaustivo de la infraestructura tecnológica de la empresa, incluyendo áreas, racks, equipos, conexiones y registros de mantenimiento.\n\n` },
        { text: [{ text: `Fecha de generación del informe: `, style: 'subHeader' }, `${this.localtime}\n\n`] },
        { columns: [{ text: 'Áreas', style: 'header' }, { text: 'Racks', style: 'header' }] },
        { columns: [{ text: 'Descripción de los áreas', style: 'subHeader' }, { text: 'Descripción de los racks', style: 'subHeader' }] },
        { columns: [this.getAreas(), this.getRacks()] },



        { text: '', pageBreak: 'after' },


        { text: `Equipos`, style: 'header' },
        { text: 'Inventario de equipos', style: 'subHeader' },
        this.getDispositivosTable(),
        { text: '', pageBreak: 'after' },
        { text: `\n Conexiones`, style: 'header' },
        this.getConexiones(),
        { text: `\n Registro de mantenimiento`, style: 'header' },
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
          fontSize: 12,
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

  getAreas() {
    return {
      table: {
        widths: ['auto', 'auto'],
        body: [
          [
            { text: 'ID', style: 'tableHeader' },
            { text: 'Areas existentes', style: 'tableHeader' },
          ],
          ...this.areas.map(areas => [
            areas.id || '',
            areas.name || '',
          ])
        ]
      }
    };
  }

  getRacks() {
    return {
      table: {
        widths: ['auto', 'auto'],
        body: [
          [
            { text: 'ID', style: 'tableHeader' },
            { text: 'Racks existentes', style: 'tableHeader' },
          ],
          ...this.racks.map(racks => [
            racks.id || '',
            racks.name || '',
          ])
        ]
      }
    };
  }

  getConexiones() {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Id', style: 'tableHeader' },
            { text: 'Tipo', style: 'tableHeader' },
            { text: 'Puerto', style: 'tableHeader' },
            { text: 'Puerto de conexion', style: 'tableHeader' },
            { text: 'Tipo', style: 'tableHeader' },
            { text: 'Id', style: 'tableHeader' },
          ],
          ...this.conexiones.map(conexiones => [
            conexiones.sourceId || '',
            conexiones.sourceType || '',
            conexiones.sourcePort || '',
            conexiones.destinationPort || '',
            conexiones.destinationType || '',
            conexiones.destinationId || '',
          ])
        ]
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
            registros.deviceId || '',
            registros.deviceName || '',
            registros.deviceType || '',
            registros.performedBy || '',
            registros.description || '',
            registros.materialsUsed || '',
            this.formatDate(registros.maintenanceDate) || '',
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
    this.localtime = date.toLocaleString();
  }
}
