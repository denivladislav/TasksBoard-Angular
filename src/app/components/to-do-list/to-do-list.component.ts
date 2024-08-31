import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import type { ToDoListItem } from '../to-do-list-item/to-do-list-item.types';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { noWhitespaceValidator } from '../../utils/validators';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ToDoListItemComponent,
        ButtonComponent,
    ],
    templateUrl: './to-do-list.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
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

    public isLoading = true;

    public itemInputFormControl = new FormControl('', [Validators.required, noWhitespaceValidator]);

    public deleteItem(id: number) {
        this.toDoList = this.toDoList.filter((item) => item.id !== id);
    }

    public addItem(text: string) {
        const itemIds = this.toDoList.map((toDoListItem) => toDoListItem.id);
        const newItemId = itemIds.length > 0 ? Math.max(...itemIds) + 1 : 0;
        const sanitizedText = text.trim();
        this.toDoList.push({
            id: newItemId,
            text: sanitizedText,
        });
        this.itemInputFormControl.reset();
    }

    ngOnInit() {
        setTimeout(() => (this.isLoading = false), 500);
    }
}
