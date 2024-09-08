import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoListItem } from './to-do-list-item.types';
import { ButtonComponent } from '../../ui/button/button.component';
import { SharedModule } from '../../modules/shared/shared.module';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [CommonModule, ButtonComponent, SharedModule],
    templateUrl: './to-do-list-item.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list-item.component.scss'],
})
export class ToDoListItemComponent {
    @Input() toDoListItem!: ToDoListItem;
    @Input() isSelected = false;

    @Output() setSelectedItemIdEvent = new EventEmitter<number>();
    @Output() deleteToDoListItemEvent = new EventEmitter<number>();

    public setSelectedItemId(id: number) {
        this.setSelectedItemIdEvent.emit(id);
    }

    public deleteToDoListItem(e: Event, id: number) {
        e.stopPropagation();
        this.deleteToDoListItemEvent.emit(id);
    }
}
