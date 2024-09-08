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
import { ButtonComponent } from '../../ui/button/button.component';
import { ToDoListItemDescriptionComponent } from '../to-do-list-item-description/to-do-list-item-description.component';

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
        ToDoListItemDescriptionComponent,
        ButtonComponent,
    ],
    templateUrl: './to-do-list.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
    private _selectedItemId: number | null = null;

    public toDoList: ToDoListItem[] = [
        {
            id: 0,
            text: 'Task1',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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

    public get selectedItemId() {
        return this._selectedItemId;
    }

    public get selectedItem() {
        return this.toDoList.find((item) => item.id === this.selectedItemId);
    }

    public clearSelectedItemId() {
        this._selectedItemId = null;
    }

    public getIsItemSelected(id: number) {
        return this._selectedItemId === id;
    }

    public setSelectedItemId(id: number) {
        this._selectedItemId = id;
    }

    public deleteItem(id: number) {
        if (this.selectedItemId === id) {
            this.clearSelectedItemId();
        }
        this.toDoList = this.toDoList.filter((item) => item.id !== id);
    }

    public addItem({ text, description }: { text: string; description: string }) {
        const itemIds = this.toDoList.map((toDoListItem) => toDoListItem.id);
        const newItemId = itemIds.length > 0 ? Math.max(...itemIds) + 1 : 0;
        const sanitizedText = text.trim();
        const sanitizedDescription = description.trim();
        this.toDoList.push({
            id: newItemId,
            text: sanitizedText,
            description: sanitizedDescription,
        });
        this.itemInputFormControl.reset();
        this.descriptionInputFormControl.reset();
    }

    public isLoading = true;

    public itemInputFormControl = new FormControl('', [Validators.required, noWhitespaceValidator]);
    public descriptionInputFormControl = new FormControl('');

    ngOnInit() {
        setTimeout(() => (this.isLoading = false), 1000);
    }
}
