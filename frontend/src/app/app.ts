import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Converter } from './converter/converter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Converter],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('frontend');
}
