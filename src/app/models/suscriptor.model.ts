export class SuscriptorModel {
    constructor (
        public nombre: string,
        public email: string,
        public uid: string,
        public date: Date,
        public avatar: string
    )
    {}
}