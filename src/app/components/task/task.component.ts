import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from './task.types';
import { TuiButton } from '@taiga-ui/core';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [CommonModule, TuiButton],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss',
})
export class TaskComponent {
    @Input() task: Task | undefined;
}
