import { EmpresaService } from 'src/app/services/empresa.service';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-empresa-menu',
  templateUrl: './empresa-menu.component.html',
  styleUrls: ['./empresa-menu.component.css']
})
export class EmpresaMenuComponent implements OnInit {

  @Input() idEmpresa: string
  usuario
  public plan
  constructor (
    private _empresa: EmpresaService
  ) { }

  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('omlog'));
    var empresa = await this._empresa.getEmpresa(this.usuario.m) 
    var planString = empresa.planActual
    switch (planString) {
      case 'gratis':
        this.plan = 0
        break;
      case 'plus':
        this.plan = 1
        break;
      case 'premium':
        this.plan = 2
        break;
      case 'empresa':
        this.plan = 3
        break;
      case 'franquicia':
        this.plan = 4
        break;
    }
  }

}
