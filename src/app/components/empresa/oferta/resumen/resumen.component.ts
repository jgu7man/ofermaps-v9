import { Component, OnInit } from '@angular/core';
import { OfertaModel } from '../../../../models/Oferta.Model';
import { OfertasService } from '../../../../services/ofertas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import { DelOfertaComponent } from '../del-oferta/del-oferta.component';
import {Plan} from '../../../../services/planes.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertaService } from '../../../../services/alertas.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  public oferta: OfertaModel
  public idOferta: string
  public codes
  public progress
  public canjes
  public caduc: boolean = false
  constructor(
    private _ofertas: OfertasService,
    private ruta: ActivatedRoute,
    private router: Router,
    private fs: AngularFirestore,
    private _dialog: MatDialog,
    private _alert: AlertaService
  ) {
    this.oferta = new OfertaModel('','','','','','','',[],new Date, new Date, [], 0,0,0, '', false)
   }

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      this.idOferta = params['id']
    })
    this._ofertas.getOneOferta(this.idOferta).then(res => {
      this.oferta = res.oferta
      this.oferta.oCaducidad = res.cad
      $("app-loading").toggle()
      this.progressBar()
      this.checkCad()
    })

  }

  progressBar() {
    var progress = this.oferta.oCodes * 100
    var negProgress = progress / this.oferta.oLimite
    this.progress = 100 - negProgress
    var widthProgress = this.progress.toString() + '%'
    $(".progresBar").css('width', widthProgress)

    var canjes = this.oferta.oCanjes * 100
    var negCanjes = canjes / this.oferta.oLimite
    this.canjes = 100 - negCanjes
    var widthCanjes = this.canjes.toString() + '%'
    $(".canjesBar").css('width', widthCanjes)
    
  }

  checkCad() {
    var today = new Date()
    var cad = this.oferta.oCaducidad

    if (cad < today) {
      this.caduc = true
    } else {
    }
  }

  toEdit() {
    sessionStorage.setItem('pend', JSON.stringify(this.oferta))
    this.router.navigate(['/empresa/edit-of'])
  }

  async setVisible(e) {
    var planRef = this.fs.doc(`empresas/${this.oferta.idEmpresa}/plan/actual`).ref
    var oferRef = this.fs.collection('ofertas').ref.doc(this.idOferta)
    var plan: Plan = (await planRef.get()).data() as Plan
    if (e.target.checked) {
      if (plan.publicaciones == 0) {
        this._alert.sendAlerta('No tienes permiso de publicar otra oferta')
      } else {
        planRef.update({publicaciones: firebase.firestore.FieldValue.increment(-1)})
        oferRef.update({ visible: true })
      }
    } else {
      planRef.update({publicaciones: firebase.firestore.FieldValue.increment(1)})
        oferRef.update({ visible: false })
    }
  }

  eliminar() {
    this._dialog.open(DelOfertaComponent, {
      minWidth: '50%',
      data: this.oferta.idOferta
    })
  }

}
