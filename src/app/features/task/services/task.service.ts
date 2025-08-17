import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {
  CreateTask,
  INITIAL_PAGINITION,
  ListTask,
  Pagination,
  Task,
  TaskQueryFilters,
  UpdateTask
} from "../model/task.model";
import {tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  httpClient = inject(HttpClient);

  private taskListSubject = new BehaviorSubject<Task[]>([]);
  public taskList$: Observable<Task[]> = this.taskListSubject.asObservable();

  private paginationSubject = new BehaviorSubject<Pagination>(INITIAL_PAGINITION);
  public pagination$: Observable<Pagination> = this.paginationSubject.asObservable();

  private filtersSubject = new BehaviorSubject<TaskQueryFilters>({
    page: INITIAL_PAGINITION.page,
    limit: INITIAL_PAGINITION.limit
  });
  // public filters$ = this.filtersSubject.asObservable();

  private baseURL= `${environment.baseURL}`;

  private endpointTasks = "tasks";
  private endpointTask = "task";

  loadTasks(queryFilters?: TaskQueryFilters): void {
    const newFilters = { ...this.currentFiltersValue, ...queryFilters };

    const cleanParams: { [param: string]: string | number | boolean } = {};
    Object.keys(newFilters).forEach(key => {
      const value = (newFilters as any)[key];

      // Adiciona ao objeto de parâmetros apenas se o valor não for null, undefined ou uma string vazia
      if (value !== null && value !== undefined && value !== '') {
        (cleanParams as any)[key] = value;
      }
    });

    this.httpClient.get<ListTask>(`${this.baseURL}${this.endpointTasks}`, { params: cleanParams })
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar tarefas:', error);
          this.taskListSubject.next([]);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.taskListSubject.next(response.data);
          this.paginationSubject.next(response.pagination);
          this.filtersSubject.next(newFilters);
        }
      });
  }
  create(task: CreateTask): Observable<Task>{
    return this.httpClient.post<Task>(`${this.baseURL}${this.endpointTask}`, task).pipe(
      tap(() => {
        this.loadTasks();
      })
    );
  }
  // TODO: implementar alteração de dados da tarefa
  update(id: string, task: UpdateTask): Observable<Task>{
    return this.httpClient.put<Task>(`${this.baseURL}${this.endpointTask}/${id}`, task).pipe(
      tap(() => {
        this.loadTasks();
      })
    );
  }
  delete(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}${this.endpointTask}/${id}` ).pipe(
      tap(() => {
        this.loadTasks();
      })
    );
  }

  public get currentPaginationValue(): Pagination {
    return this.paginationSubject.value;
  }
  public get currentFiltersValue(): TaskQueryFilters {
    return this.filtersSubject.value;
  }

}
