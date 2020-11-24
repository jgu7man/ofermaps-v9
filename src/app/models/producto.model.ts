export class ProductoModel {
    constructor (
        public referencia: string,
        public precio: string,
        public imagen?: string,
        public idProducto?: string,
        public cantidad?:number
    ){}
}