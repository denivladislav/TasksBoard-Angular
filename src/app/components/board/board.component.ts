import { Component, OnInit } from '@angular/core';
import { STATUS_OPTIONS, ToDoListService, ToDoListItemStatus, ToDoListItem } from '../../services';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule, SharedModule, ToDoListItemComponent],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
    public statusOptions = Object.values(STATUS_OPTIONS);

    constructor(private _toDoListService: ToDoListService) {}

    public get isLoading() {
        return this._toDoListService.isLoading;
    }

    public getTasksByStatusOption(status: ToDoListItemStatus): ToDoListItem[] {
        return this._toDoListService.toDoList.filter((item) => item.status === status);
    }

    public getIsItemChecked(id: string) {
        const item = this._toDoListService.getItemById(id);
        if (!item) {
            return false;
        }

        return item.status === STATUS_OPTIONS.completed;
    }

    public deleteItem(id: string) {
        this._toDoListService.deleteItem(id);
    }

    public toggleItemStatus(id: string) {
        this._toDoListService.toggleItemStatus(id);
    }

    ngOnInit() {
        this._toDoListService.getToDoList();
    }
}
