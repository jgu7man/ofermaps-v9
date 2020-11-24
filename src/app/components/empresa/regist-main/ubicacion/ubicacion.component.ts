import { Component, OnInit } from "@angular/core";
import { UbicacionEmpresa } from "../../../../models/Ubicacion.Empresa.model";
import { Route, Params, Router, ActivatedRoute } from '@angular/router';
import { UbicacionNegocioService } from '../../../../services/Ubicacion.Negocio.Service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';

@Component({
  selector: "app-ubicacion",
  templateUrl: "./ubicacion.component.html",
  styleUrls: ["./ubicacion.component.css"]
})
export class UbicacionComponent implements OnInit {
  public ubicacion: UbicacionEmpresa = new UbicacionEmpresa("","","","","","",'','');

  public idEmpresa: string
  constructor(
    private _ubicacion: UbicacionNegocioService,
    private _router: Router,
    private _route: ActivatedRoute,
    private fs: AngularFirestore,
    public location_: Location
  ) {
    this.idEmpresa = this._route.snapshot.params['idEmpresa']
  }

  ngOnInit() {
    var ubi = JSON.parse(sessionStorage.getItem('ubi'));
    if (ubi != null){ this.ubicacion = ubi; }
    if (this.idEmpresa) { this.getUbicacion() }
  }

  async getUbicacion() {
    let ubicaciones = await this.fs.collection('ubicaciones').ref
      .where('idEmpresa', '==', this.idEmpresa).get()
    if (!ubicaciones.empty) {
      this.ubicacion = ubicaciones.docs[0].data() as UbicacionEmpresa
    }
  }

  onSubmit() {
    $("app-loading").toggle()
    this._ubicacion.saveUbicacion(this.ubicacion)
    sessionStorage.removeItem('ubi');
    this._router.navigate(['/empresa/Dashboard'])
  }
}
