import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    FormControl,
    Validators,
    ReactiveFormsModule,
    FormGroup,
    FormGroupDirective,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { noWhitespaceValidator } from '../../utils/validators';
import { ButtonComponent } from '../../ui/button/button.component';
import { ToDoListItemDescriptionComponent } from '../to-do-list-item-description/to-do-list-item-description.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { ToDoListService } from '../../services/to-do-list-service/to-do-list.service';
import { ToastService } from '../../services/toast-service/toast.service';

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
        SharedModule,
    ],
    templateUrl: './to-do-list.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
    private _isLoading = true;
    private _isEditing = false;

    constructor(
        private _toDoListService: ToDoListService,
        private _toastService: ToastService,
    ) {}

    public get isLoading() {
        return this._isLoading;
    }

    public get isEditing() {
        return this._isEditing;
    }

    public setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading;
    }

    public setIsEditing(isEditing: boolean) {
        this._isEditing = isEditing;
    }

    public get toDoList() {
        return this._toDoListService.toDoList;
    }

    public get selectedItem() {
        return this._toDoListService.selectedItem;
    }

    public getIsItemSelected(id: number) {
        return this._toDoListService.selectedItemId === id;
    }

    public setSelectedItemId(id: number) {
        this._toDoListService.setSelectedItemId(id);
    }

    public cancelEditing(formDirective: FormGroupDirective) {
        this.setIsEditing(false);
        formDirective.resetForm();
    }

    public deleteItem(id: number) {
        this._toDoListService.deleteItem(id);
        this._toastService.addToast('negative');
    }

    public addItemForm = new FormGroup({
        title: new FormControl('', [Validators.required, noWhitespaceValidator]),
        description: new FormControl(''),
    });

    public editItemForm = new FormGroup({
        title: new FormControl('', [Validators.required, noWhitespaceValidator]),
    });

    public setEditItemFormDefaultValue() {
        this.editItemForm.controls.title.patchValue(this.selectedItem?.title || '');
    }

    public onAddItemFormSubmit(formDirective: FormGroupDirective) {
        this._toDoListService.addItem({
            title: this.addItemForm.value.title!,
            description: this.addItemForm.value.description!,
        });
        this._toastService.addToast('positive');

        formDirective.resetForm();
    }

    public onEditItemFormSubmit(formDirective: FormGroupDirective) {
        this._toDoListService.patchItem({
            title: this.editItemForm.value.title!,
        });
        this._toastService.addToast('info');

        this.setIsEditing(false);
        formDirective.resetForm();
    }

    ngOnInit() {
        setTimeout(() => this.setIsLoading(false), 1000);
    }
}
