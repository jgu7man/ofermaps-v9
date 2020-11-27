import { Injectable } from '@angular/core';
import { UbicacionNegocioModel } from '../models/ubicacion.negocio.model';
import { AngularFirestore,} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UbicacionEmpresa } from '../models/Ubicacion.Empresa.model';
import { OfertaModel } from '../models/Oferta.Model';
import { Plan } from './planes.service';

export interface Zone {
    lat: number;
    long: number;
}

@Injectable({
    providedIn: 'root',
})
export class UbicacionNegocioService {
    
    
    public UbicacionNegocio: UbicacionNegocioModel;
    public ubicacion: any;
    public UbicacionesNegocios;
    public Key: string;
    public Collection: any = this.fs.collection('ubicaciones');
    public zone: Zone;
    
    
    constructor (
        private fs: AngularFirestore,
        private _http: HttpClient,
    ) {
        this.Key = 'AIzaSyBHpFEu4AVWbbM5kvJrZT26Z4HapioqI5E';
        this.UbicacionNegocio = new UbicacionNegocioModel('', '', '', '', '');
        // this.Collection = this.fs.collection('ubicaciones');
    }

    async getNegocios() {
        await this.Collection.get().forEach((docs) => {
            var ubicaciones = [];
            docs.forEach((doc) => {
                ubicaciones.push(doc.data());
            });
            this.UbicacionesNegocios = ubicaciones;
        });

        return this.UbicacionesNegocios;
    }

    async getForCiudad(zone) {
        var ubicaciones = [];

        var sinAcentos = zone
            .normalize('NFD')
            .replace(
                /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                '$1'
            )
            .normalize();
        var sinEspacios = sinAcentos.trim();
        var sinMayus = sinEspacios.toLowerCase();
        var ciudad = sinMayus;

        const today = new Date();

        await this.Collection.ref
            .where('dCiudad', '==', ciudad).get()
            .then((docs) => {
                docs.forEach(async (doc) => {
                    var ubicacion: UbicacionEmpresa = doc.data() 
                    var ofers = await this.fs.collection('ofertas').ref
                        .where('idEmpresa', '==', ubicacion.idEmpresa).get();
                    
                    ofers.forEach((ofer) => {
                        let oferta: OfertaModel = ofer.data() as OfertaModel;
                        if (oferta.oCodes >= oferta.oLimite
                            || ofer.data()['oCaducidad'] > today
                            || !this._validateEmpresa(oferta.idEmpresa)
                        ) {
                            this.fs.collection('ofertas').ref.doc(ofer.id)
                                .update({visible: false})
                        } else if (oferta.visible) {
                            ubicaciones.push({
                                oferId: ofer.id,
                                oferName: oferta.oNombre,
                                oferLat: ubicacion.lat,
                                oferLong: ubicacion.long,
                                oferImg: oferta.oImagen,
                            });
                        }
                    });

                   
                });
            });
        return ubicaciones;
    }

    private async _validateEmpresa( idEmpresa: string) {
        const planDoc = await this.fs.doc(`empresas/${idEmpresa}/plan/actual`).ref.get()
        const plan: Plan = planDoc.data() as Plan
        if (plan.vistas == 0) return false
        // if (plan.publicaciones == 0) return false
        return true
    }

    async getUbi_oferta(idEmpresa, zone) {
        var sinAcentos = zone
            .normalize('NFD')
            .replace(
                /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                '$1'
            )
            .normalize();
        var sinEspacios = sinAcentos.trim();
        var sinMayus = sinEspacios.toLowerCase();
        var ciudad = sinMayus;
        var ubicacion = [];

        console.log(idEmpresa, ciudad);
        await this.Collection.ref
            .where('idEmpresa', '==', idEmpresa)
            .where('dCiudad', '==', ciudad)
            .get()
            .then((docs) => {
                console.log(docs.docs);
                docs.forEach((doc) => {
                    console.log(doc.data());
                    ubicacion.push(doc.data());
                });
            });
        return ubicacion;
    }

    async getUbicacionesByEmpresa(idEmpresa: string) {
        await this.fs
            .collection('ubicaciones')
            .ref.where('idEmpresa', '==', idEmpresa)
            .get()
            .then((docs) => {
                var ubicaciones = [];
                docs.forEach((doc) => {
                    ubicaciones.push(doc.data());
                });

                this.UbicacionesNegocios = ubicaciones;
            });

        return this.UbicacionesNegocios;
    }

    private geoUrl:string = 'https://maps.googleapis.com/maps/api/geocode/'

    geoPolitical(lat: number, lng: number): Observable<any> {
        return this._http.get(this.geoUrl+`json?latlng=${lat},${lng}&location_type=APPROXIMATE&result_type=locality&key=${this.Key}`
        );
    }

    geoCoder(lat: number, lng: number): Observable<any> {
        return this._http.get(this.geoUrl + `json?latlng=${lat},${lng}&key=${this.Key}`);
    }

    async saveUbicacion(ubicacion: UbicacionEmpresa) {
        var user = JSON.parse(localStorage.getItem('omlog'));
        var sinAcentos = ubicacion.dCiudad
            .normalize('NFD')
            .replace(
                /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                '$1'
            )
            .normalize();
        var sinEspacios = sinAcentos.trim();
        var sinMayus = sinEspacios.toLowerCase();

        ubicacion.idEmpresa = user.m
        ubicacion.dCiudad = sinMayus
        Object.keys(ubicacion).forEach(key => { if (ubicacion[key] == undefined) delete ubicacion[key]})

        this.Collection.add({...ubicacion})
        return 
    }
}
