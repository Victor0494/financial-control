import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoComponent } from "./components/info/info/info.component";
import { HomeComponent } from "./pages/home/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfoComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'controle-financeiro';
}
