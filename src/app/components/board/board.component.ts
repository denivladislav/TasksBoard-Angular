import { Component, OnInit } from '@angular/core';
import { STATUS_OPTIONS, ToDoListService, ToDoListItem, ToDoListItemStatus } from '../../services';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { map, Observable } from 'rxjs';
import { LOCALIZED_STATUS_OPTIONS } from '../../services/to-do-list-service/to-do-list.service.types';

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule, SharedModule, ToDoListItemComponent],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
    public statusOptions = Object.values(STATUS_OPTIONS);

    constructor(public toDoListService: ToDoListService) {}

    public getTasksByStatusOption(status: ToDoListItemStatus): Observable<ToDoListItem[]> {
        return this.toDoListService.toDoList$.pipe(map((items) => items.filter((item) => item.status === status)));
    }

    public getIsItemChecked(item: ToDoListItem): boolean {
        return item.status === STATUS_OPTIONS.completed;
    }

    public getLocalizedStatus(status: ToDoListItemStatus): string {
        return LOCALIZED_STATUS_OPTIONS[status];
    }

    public deleteItem(id: string) {
        this.toDoListService.deleteItem(id);
    }

    public toggleItemStatus(item: ToDoListItem) {
        this.toDoListService.toggleItemStatus(item);
    }

    ngOnInit() {
        this.toDoListService.getToDoList();
    }
}
