import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToDoListItem } from './to-do-list-item.types';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './to-do-list-item.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list-item.component.scss'],
})
export class ToDoListItemComponent {
    @Input() toDoListItem: ToDoListItem | undefined;
}
