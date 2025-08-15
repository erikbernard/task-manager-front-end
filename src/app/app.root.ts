import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.root.html',
  styleUrls: ['./app.root.css']
})
export class AppRoot {
  title = 'task-manager-front-end';
}
