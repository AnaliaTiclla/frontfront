import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeseroComponent } from './mesero/mesero.component';
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MeseroComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Polleria';

  
}
