export interface PagoDetalleModel {
    detallePagoId?: number;
    tipoDoc: string;
    numeroDoc?: string;
    iziPay?: string;
    subTotal: number;
    igv: number;
    total: number;
    pagoID: number;
} 