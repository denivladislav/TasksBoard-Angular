import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroupDirective } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToDoListService } from '../../services';
import { ToDoListItemComponent } from '../to-do-list-item';
import { SharedModule } from '../../modules';
import { STATUS_OPTIONS, ToDoListItem } from '../../services/to-do-list-service/to-do-list.service.types';
import { ALL_SELECT_OPTION, ItemSelectOption } from './to-do-list.component.types';
import { ToDoCreateItemComponent } from '../to-do-create-item';
import { EMPTY, map, Observable, combineLatest, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        MatInputModule,
        MatSelectModule,
        ToDoListItemComponent,
        ToDoCreateItemComponent,
        SharedModule,
    ],
    templateUrl: './to-do-list.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
    private _selectedOptionSubject = new BehaviorSubject<ItemSelectOption>(ALL_SELECT_OPTION);

    public itemSelectOptions: ItemSelectOption[] = [ALL_SELECT_OPTION, ...Object.values(STATUS_OPTIONS)];

    public filteredToDoList$: Observable<ToDoListItem[] | null> = EMPTY;
    public selectedOption$ = this._selectedOptionSubject.asObservable();

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,

        public toDoListService: ToDoListService,
    ) {}

    public get selectedItemId() {
        return this._router.url.split('/').pop();
    }

    public getIsItemSelected(item: ToDoListItem): boolean {
        return item.id === this.selectedItemId;
    }

    public getIsItemChecked(item: ToDoListItem): boolean {
        return item.status === STATUS_OPTIONS.completed;
    }

    public setIsEditing(isEditing: boolean) {
        this.toDoListService.setIsEditing(isEditing);
    }

    public setSelectedOption(option: ItemSelectOption) {
        this._selectedOptionSubject.next(option);
    }

    public toggleItemStatus(item: ToDoListItem) {
        this.toDoListService.toggleItemStatus(item);
    }

    public cancelEditing(formDirective: FormGroupDirective) {
        this.setIsEditing(false);
        formDirective.resetForm();
    }

    public deleteItem(id: string) {
        this.toDoListService.deleteItem(id);
        this._router.navigate(['/'], { relativeTo: this._route });
    }

    public goToItem(id: string) {
        this._router.navigate([id], { relativeTo: this._route });
    }

    ngOnInit() {
        this.toDoListService.getToDoList();
        this.filteredToDoList$ = combineLatest([this.toDoListService.toDoList$, this.selectedOption$]).pipe(
            map(([items, selectedOption]: [ToDoListItem[], ItemSelectOption]) => {
                if (!items) {
                    return null;
                }

                if (selectedOption === ALL_SELECT_OPTION) {
                    return items;
                }

                return items.filter((item) => item.status === selectedOption);
            }),
        );
    }
}
