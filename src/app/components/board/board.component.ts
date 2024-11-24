import { Component, OnInit } from '@angular/core';
import { STATUS_OPTIONS, ToDoListService, ToDoListItem, ToDoListItemStatus } from '../../services';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { map } from 'rxjs';

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

    public getTasksByStatusOption(status: ToDoListItemStatus) {
        return this.toDoListService.toDoList$.pipe(map((items) => items.filter((item) => item.status === status)));
    }

    public getIsItemChecked(item: ToDoListItem): boolean {
        return item.status === STATUS_OPTIONS.completed;
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
