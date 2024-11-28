export interface PagoModel {
    pagoId?: number;
    fecha: Date;
    metodoPago: string;
    estadoPago: string;
    ordenID: number;
    tipocomprobanteID: number;
} 