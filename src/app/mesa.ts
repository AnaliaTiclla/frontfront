// mesa.ts
export interface Mesa {
  numero: number;
  estado: 'Libre' | 'Ocupada' | 'Pendiente' | 'Pagada';
}

export interface ItemPedido {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}
