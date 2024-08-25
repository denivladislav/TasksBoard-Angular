import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import type { Task } from '../task/task.types';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule, TaskComponent],
    templateUrl: './to-do-list.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list.component.scss'],
})
export class ToDoListComponent {
    public taskList: Task[] = [
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
}
