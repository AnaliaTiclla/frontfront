// comprobante.ts
import { ItemPedido } from './mesa';

export interface Comprobante {
  tipo: 'Boleta' | 'Factura' | 'Ticket';
  dniRuc?: string;
  items: ItemPedido[];
  total: number;
}
