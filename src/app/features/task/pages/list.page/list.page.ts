import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {TaskCardComponent} from "../../components/task-card/task-card.component";
import {Task, TaskQueryFilters} from "../../model/task.model";
import {Dialog} from "@angular/cdk/dialog";
import {TaskFormsComponent} from "../../components/task-forms/task-forms.component";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {RouterLink} from "@angular/router";
import {UsersService} from "../../../users/services/users.service";
import {PaginationComponent} from "../../components/pagination/pagination.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-list.page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    DatePipe,
    TaskCardComponent,
    RouterLink,
    PaginationComponent,
    FormsModule
  ],
  templateUrl: './list.page.html',
  styleUrl: './list.page.css'
})
export class ListPage implements OnInit, OnDestroy {
  private taskService = inject(TaskService);
  private dialog = inject(Dialog);
  private user = inject(UsersService);
  private destroy$ = new Subject<void>();

  userData$ = this.user.currentUser$;
  userInitial$: Observable<string | undefined> = this.userData$.pipe(
    map(user => user?.name?.[0])
  );
  allTask$ = this.taskService.taskList$;
  pagination$ = this.taskService.pagination$;

  image = "https://placehold.co/50x50/ffebe8/ff725e?font=poppins&text=";

  selectedPriority: 'HIGH' | 'MEDIUM' | 'LOW' | '' = '';
  selectedStatus: 'PENDING' | 'COMPLETED' | 'STARTED' | 'BLOCKED' | 'NOSTARTED' | '' = '';

  ngOnInit(): void {
    this.taskService.loadTasks({
      page: 1, limit: 5,
    })
  }

  onEdiitTask(task: Task){
    const dialogRef = this.dialog.open<Task>(TaskFormsComponent, {
      data: task,
    });

    (dialogRef.componentInstance as TaskFormsComponent).taskUpdated
    .pipe(
      takeUntil(this.destroy$),
    ).
    subscribe(t =>{
      this.taskService.update(task.id, {
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        user_id: t.user_id,
      }).subscribe((value)=>{
        alert(`Tarefa ${value.title} atualizada`);
      });
      this.dialog.closeAll();
    });
    // TODO: adicionar de sucesso
    (dialogRef.componentInstance as TaskFormsComponent).taskCreated
    .pipe(
      takeUntil(this.destroy$),
    ).
    subscribe(t =>{
      this.taskService.create({
        title: t.title,
        description: t.description,
        priority: t.priority,
        user_id: t.user_id,
      }).subscribe((value)=>{
        alert(`Tarefa ${value.title} criada!`);
      });
      this.dialog.closeAll();
    // TODO: adicionar de sucesso
    });
  }
  onCreateTask(){
    const dialogRef = this.dialog.open<Task>(TaskFormsComponent, {
      data: null,
    });
    // TODO: adicionar de sucesso
    (dialogRef.componentInstance as TaskFormsComponent).taskCreated
    .pipe(
      takeUntil(this.destroy$),
    ).
    subscribe(t =>{
      this.taskService.create({
        title: t.title,
        description: t.description,
        priority: t.priority,
        user_id: t.user_id,
      }).subscribe((value)=>{
        alert(`Tarefa ${value.title} criada!`);
      });
      this.dialog.closeAll();
    // TODO: adicionar de sucesso
    });
  }
  onFilterChange(): void {
    const filters: Partial<TaskQueryFilters> = {
      page: 1,
      priority: this.selectedPriority || undefined,
      status: this.selectedStatus || undefined,
    };

    this.taskService.loadTasks(filters);
  }

  onPageChange(newPage: number): void {
    this.taskService.loadTasks({ page: newPage });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
