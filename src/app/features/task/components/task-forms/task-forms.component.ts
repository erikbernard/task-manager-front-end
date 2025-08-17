import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {CreateTask, Priority, Status, Task, UpdateTask} from "../../model/task.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-task-forms',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './task-forms.component.html',
  styleUrl: './task-forms.component.css'
})
export class TaskFormsComponent implements OnInit{
  private formbuild = inject(FormBuilder);
  public dialogRef = inject(DialogRef<Task>);
  public data: Task | null = inject(DIALOG_DATA, { optional: true });

  @Output() taskUpdated = new EventEmitter<UpdateTask>();
  @Output() taskCreated = new EventEmitter<CreateTask>();

  taskform!: FormGroup;

  priorityLabels: { [key in Priority]: string } = {
    HIGH: 'Alta',
    MEDIUM: 'Média',
    LOW: 'Baixa'
  };

  statusLabels: { [key in Status]: string } = {
    PENDING: 'Pendente',
    COMPLETED: 'Concluído',
    STARTED: 'Iniciado',
    BLOCKED: 'Bloqueado',
    NOSTARTED: 'Não Iniciado'
  };

  priorityKeys = Object.keys(this.priorityLabels) as Priority[];
  statusKeys = Object.keys(this.statusLabels) as Status[];
  ngOnInit(): void {
    this.taskform = this.formbuild.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      priority: ['LOW', Validators.required],
      status: ['NOSTARTED', Validators.required],
    });

    if (this.data) {
      this.taskform.patchValue(this.data);
    }
  }

  get title() {
    return this.taskform.get('title');
  }
  get description() {
    return this.taskform.get('description');
  }
  get priority() {
    return this.taskform.get('priority');
  }
  get status() {
    return this.taskform.get('status');
  }
  taskCreate(): void {
    if (this.taskform.valid) {
      const { title, description, priority, status } = this.taskform.value;
      this.taskCreated.emit({
        title: title,
        description: description,
        priority: priority,
        user_id: this.data?.user_id as string,
      });
    } else {
      this.taskform.markAllAsTouched();
      console.log('Formulário de registro inválido.');
    }
  }
  taskUpdate(): void {
    if (this.taskform.valid) {
      const { title, description, priority, status } = this.taskform.value;
      this.taskUpdated.emit({
        title:title,
        description: description,
        priority: priority,
        user_id: this.data?.user_id as string,
        status: status,
      });
    } else {
      this.taskform.markAllAsTouched();
      console.log('Formulário de registro inválido.');
    }
  }

}
