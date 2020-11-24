import { EmpresaService } from 'src/app/services/empresa.service';
import { Component, Input, OnInit } from '@angular/core';
import {ProductoModel} from 'src/app/models/producto.model';
import { ProductosService } from '../../../../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from '../../../../models/Usuario.Model';

@Component({
  selector: 'app-tus-productos',
  templateUrl: './tus-productos.component.html',
  styleUrls: ['./tus-productos.component.scss']
})
export class TusProductosComponent implements OnInit {

  productos: ProductoModel[] = []
  @Input() idEmpresa: string
  usuario

  constructor (
    private _productos: ProductosService,
    private _empresa: EmpresaService
  ) {
    
  }
  
  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('omlog'));
    await this._empresa.getEmpresa(this.usuario.m) 
    this.productos = await this._productos.getProductosByEmpresa(this.idEmpresa)
  }

}
