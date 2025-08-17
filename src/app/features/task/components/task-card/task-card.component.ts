import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Priority, Status, Task} from "../../model/task.model";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {CommonModule, DatePipe} from "@angular/common";
@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() item!: Task;
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();

  private sanitizer = inject(DomSanitizer);

  private priorityLabels: { [key in Priority]: string } = {
    HIGH: 'Alta',
    MEDIUM: 'Média',
    LOW: 'Baixa'
  };

  private statusLabels: { [key in Status]: string } = {
    PENDING: 'Pendente',
    COMPLETED: 'Concluído',
    STARTED: 'Iniciado',
    BLOCKED: 'Bloqueado',
    NOSTARTED: 'Não Iniciado'
  };

  private statusIcons: { [key in Status]: string } = {
    PENDING: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    COMPLETED: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    STARTED: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>`,
    BLOCKED: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>`,
    NOSTARTED: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  };

  onEditTaskFn(){
    this.onEditTask.emit(this.item)
  }

  getPriorityLabel(priority: Priority): string {
    return this.priorityLabels[priority];
  }

  getStatusLabel(status: Status): string {
    return this.statusLabels[status];
  }

  getPriorityClass(priority: Priority): string {
    return `task-component-card__priority--${priority.toLowerCase()}`;
  }

  getStatusClass(status: Status): string {
    return `task-component-card__status--${status.toLowerCase()}`;
  }

  getStatusIcon(status: Status): SafeHtml {
    const icon = this.statusIcons[status] || '';
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
