import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoListItem } from './to-do-list-item.types';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './to-do-list-item.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list-item.component.scss'],
})
export class ToDoListItemComponent {
    @Input() toDoListItem!: ToDoListItem;
    @Output() deleteToDoListItemEvent = new EventEmitter<number>();

    public deleteToDoListItem(id: number) {
        this.deleteToDoListItemEvent.emit(id);
    }
}
