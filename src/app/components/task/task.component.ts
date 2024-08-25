import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from './task.types';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-task',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './task.component.html',
    styleUrls: ['../../app.component.scss', './task.component.scss'],
})
export class TaskComponent {
    @Input() task: Task | undefined;
}
