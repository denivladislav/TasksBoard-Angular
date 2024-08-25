import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import type { ToDoListItem } from '../to-do-list-item/to-do-list-item.types';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, ToDoListItemComponent],
    templateUrl: './to-do-list.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list.component.scss'],
})
export class ToDoListComponent {
    public toDoList: ToDoListItem[] = [
        {
            id: 0,
            text: 'Task1',
        },
        {
            id: 1,
            text: 'Task2',
        },
        {
            id: 2,
            text: 'Task3',
        },
    ];

    public inputValue = '';

    get isInputValueEmpty() {
        return this.inputValue.length === 0;
    }
}
