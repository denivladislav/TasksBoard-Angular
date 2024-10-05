import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../ui';
import { SharedModule } from '../../modules';
import { ToDoListItem } from '../../services';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [CommonModule, ButtonComponent, SharedModule],
    templateUrl: './to-do-list-item.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list-item.component.scss'],
})
export class ToDoListItemComponent {
    @Input() public toDoListItem!: ToDoListItem;
    @Input() public isSelected = false;

    @Output() public setSelectedItemIdEvent = new EventEmitter<number>();
    @Output() public setIsEditingEvent = new EventEmitter<boolean>();
    @Output() public deleteToDoListItemEvent = new EventEmitter<number>();

    public setSelectedItemId(id: number) {
        this.setSelectedItemIdEvent.emit(id);
    }

    public setIsEditing(isEditing: boolean) {
        this.setIsEditingEvent.emit(isEditing);
    }

    public deleteToDoListItem(e: Event, id: number) {
        e.stopPropagation();
        this.deleteToDoListItemEvent.emit(id);
    }
}
