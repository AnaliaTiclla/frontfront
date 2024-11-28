export interface PagoDetalleModel {
    detallePagoId?: number;
    tipoDoc: string;
    numeroDoc: string;
    iziPay: string;
    subTotal: number;
    IGV: number;
    total: number;
    pagoID: number;
} 