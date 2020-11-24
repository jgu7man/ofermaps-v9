import { Component, OnInit } from '@angular/core';
import {Angular2CsvService} from 'angular2-csv';
import {SuscriptorModel} from 'src/app/models/suscriptor.model';
import {SuscripcionesService} from '../../../../services/suscripciones.service';


@Component({
  selector: 'app-tus-clientes',
  templateUrl: './tus-clientes.component.html',
  styleUrls: ['./tus-clientes.component.scss']
})
export class TusClientesComponent implements OnInit {

  usuario
  clientes: SuscriptorModel[] = []
  constructor (
    private _suscripciones: SuscripcionesService,
    private _csv: Angular2CsvService
  ) {
    this.usuario = JSON.parse(localStorage.getItem('omlog'))
   }

  async ngOnInit() {
    this.clientes = await this._suscripciones.getEmpresaSuscriptores(this.usuario.m)
  }

  download() {
    var options = {
      title: 'Suscriptores',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: ['Nombre', 'Email', 'Fecha']
    };

    this._csv
    // new Angular2CsvService(data, this.formula, options);
  }

}
