import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Pagination} from "../../model/task.model";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() pagination: Pagination | null = null;
  @Output() pageChange = new EventEmitter<number>();

  public pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pagination && this.pagination.totalPages > 0) {
      this.pages = Array.from({ length: this.pagination.totalPages }, (_, i) => i + 1);
    }
  }

  onPrevious(): void {
    if (this.pagination && this.pagination.page > 1) {
      this.pageChange.emit(this.pagination.page - 1);
    }
  }

  onNext(): void {
    if (this.pagination && this.pagination.page < this.pagination.totalPages) {
      this.pageChange.emit(this.pagination.page + 1);
    }
  }

  onGoToPage(page: number): void {
    this.pageChange.emit(page);
  }
}
