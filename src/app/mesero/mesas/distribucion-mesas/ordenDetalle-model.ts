export interface OrdenDetalleModel {
    detalleOrdenId?: number ;
    cantidad: number ;
    subTotal: number ;
    comentario: string;
    condicion: string;
    productoID: number;
    ordenID: number ;
}