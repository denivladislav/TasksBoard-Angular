import { Component } from '@angular/core';
import { TuiHeader } from '@taiga-ui/layout';
import { TaskComponent } from '../task/task.component';
import type { Task } from '../task/task.types';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [CommonModule, TaskComponent, TuiHeader, TuiButton, TuiTextfield],
    templateUrl: './to-do-list.component.html',
    styleUrl: './to-do-list.component.scss',
})
export class ToDoListComponent {
    public taskList: Task[] = [
        {
            id: 0,
            name: 'Task1',
        },
        {
            id: 1,
            name: 'Task2',
        },
        {
            id: 2,
            name: 'Task3',
        },
    ];
}
