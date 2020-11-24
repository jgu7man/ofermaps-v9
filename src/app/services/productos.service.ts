import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {ProductoModel} from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor (
    private fs: AngularFirestore
  ) { }


  async getProductosByEmpresa(idEmpresa: string) {
    const prodRef = this.fs.collection(`empresas/${idEmpresa}/productos`).ref
    var docs = await prodRef.get()
    let productos: ProductoModel[] = []
    docs.forEach(doc => {
      productos.push(doc.data() as ProductoModel)
    })

    return productos
  }
}
