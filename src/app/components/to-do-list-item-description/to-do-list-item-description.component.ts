import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item.types';

@Component({
    selector: 'app-to-do-list-item-description',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: './to-do-list-item-description.component.html',
    styleUrl: './to-do-list-item-description.component.scss',
})
export class ToDoListItemDescriptionComponent {
    @Input() toDoListItem!: ToDoListItem;
}
