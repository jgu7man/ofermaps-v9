import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OfertasService } from '../../../../services/ofertas.service';

@Component({
  templateUrl: './del-oferta.component.html',
  styleUrls: ['./del-oferta.component.scss']
})
export class DelOfertaComponent implements OnInit {

  constructor (
    @Inject(MAT_DIALOG_DATA) public ofertaId: string,
    public dialog_: MatDialogRef<DelOfertaComponent>,
    public ofertas_: OfertasService
  ) { }

  ngOnInit(): void {
  }

  

}
