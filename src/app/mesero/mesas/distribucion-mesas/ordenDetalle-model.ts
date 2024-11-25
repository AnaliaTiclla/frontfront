export interface OrdenDetalleModel {
    detalleOrdenId?: number ;
    productoID: number ;
    cantidad: number ;
    subTotal: number;
    comentario?: string;
    ordenID: number ;
}