
    // mesa.interface.ts
    export interface Mesa {
        numero: number;
        estado: 'Libre' | 'Ocupada' | 'Pendiente';
      }
      
      export interface Producto {
        id: number;
        nombre: string;
        precio: number;
        categoria: string;
      }
      
      export interface ItemPedido extends Producto {
        cantidad: number;
      }
      