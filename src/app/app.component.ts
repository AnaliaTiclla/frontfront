import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeseroComponent } from './mesero/mesero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MeseroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Polleria';

  
}
