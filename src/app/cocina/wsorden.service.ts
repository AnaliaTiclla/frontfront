import { Client, StompConfig } from '@stomp/stompjs';
import { OrdenDetalleModel } from '../mesero/mesas/distribucion-mesas/ordenDetalle-model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WSOrdenService {
  private client!: Client; 

  private ordenesSubject = new BehaviorSubject<OrdenDetalleModel[]>([]);
  ordenes$ = this.ordenesSubject.asObservable();

  constructor() {
    this.initWebSocketConnection();
  }

  private initWebSocketConnection() {
    const stompConfig: StompConfig = {
      brokerURL: 'ws://localhost:8080/WSorden/websocket',
      
      webSocketFactory: () => {
        return new WebSocket('ws://localhost:8080/WSorden/websocket');
      },
      
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      
      debug: (str) => {
        console.log(new Date(), str);
      },
      
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        this.client.subscribe('/escuchar/canal1', (message) => {
          const orden = JSON.parse(message.body);
          const currentOrdenes = this.ordenesSubject.value;
          this.ordenesSubject.next([...currentOrdenes, orden]);
        });
      },
      
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      
      onDisconnect: (frame) => {
        console.log('Disconnected:', frame);
      }
    };

    // Initialize client
    this.client = new Client(stompConfig);
    
    // Activate connection
    this.client.activate();
  }

  // Modify send method to ensure connection
  sendOrden(orden: OrdenDetalleModel) {
    if (!this.client) {
      console.error('WebSocket client not initialized');
      return;
    }

    // Ensure client is connected before sending
    if (!this.client.connected) {
      console.warn('WebSocket not connected. Attempting to reconnect...');
      this.client.activate();
      
      // Wait a bit before sending
      setTimeout(() => {
        this.sendOrdenInternal(orden);
      }, 1000);
      return;
    }

    this.sendOrdenInternal(orden);
  }

  private sendOrdenInternal(orden: OrdenDetalleModel) {
    try {
      this.client.publish({
        destination: '/enviar/orden1',
        body: JSON.stringify(orden)
      });
      console.log('Order sent successfully', orden);
    } catch (error) {
      console.error('Failed to send order', error);
    }
  }
}