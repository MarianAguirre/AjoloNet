import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Area, Dispositivo, Rack } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { DatosUser } from '../../../interfaces/user.interfaces';
import { UserService } from '../../services/user.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'pdf-component',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  dispositivos: Dispositivo[] = [];
  public patchPanels: Dispositivo[] = [];
  public routers: Dispositivo[] = [];
  public switches: Dispositivo[] = [];
  public endDevices: Dispositivo[] = [];
  public areas: Area[] = [];
  public racks: Rack[] = [];
  user!: DatosUser;

  constructor(private dispositivoService: EquiposServices , private userService: UserService) {}

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
    this.userService.getUserDatos().subscribe(
      (response: DatosUser) => {
        this.user = response; // Asignar directamente a user
      },
      (error: any) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );

  }

  generatePDF(): void {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download('dispositivos.pdf');
  }

  getDocumentDefinition() {
    return {
      content: [
        { text: 'Listado de Dispositivos', style: 'header' },
        this.getDispositivosTable(),
        { text: 'Listado de Areas', style: 'header' },
        this.getAreas(),
        { text: 'Listado de Racks', style: 'header' },
        this.getRacks()
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
          color: 'black'        }
      }
    };
  }

  getDispositivosTable() {
    return {
    table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'ID', style: 'tableHeader' },
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'Tipo de Dispositivo', style: 'tableHeader' },
            { text: 'Número de puertos', style: 'tableHeader' },
            { text: 'Poe', style: 'tableHeader' },
            { text: 'Administrable', style: 'tableHeader' },
            { text: 'Dirección Ip', style: 'tableHeader' },
          ],
          ...this.dispositivos.map(dispositivo => [
            dispositivo.id || '',
            dispositivo.name || '',
            dispositivo.deviceType || '',
            dispositivo.numberOfPorts || '',
            dispositivo.poe ? 'Sí' : 'No',
            dispositivo.manageable ? 'Sí' : 'No',
            dispositivo.ipAddress || '',
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
  getRacks(){
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
}
