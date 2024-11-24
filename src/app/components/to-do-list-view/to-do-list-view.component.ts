import { Component, OnInit } from '@angular/core';
import { ToDoListItemDescriptionComponent } from '../to-do-list-item-description';
import { NavigationEnd, Router } from '@angular/router';
import { ToDoListItem, ToDoListService } from '../../services';
import { ToDoEditItemComponent } from '../to-do-edit-item/to-do-edit-item.component';
import { EMPTY, filter, map, Observable, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-to-do-list-view',
    standalone: true,
    imports: [CommonModule, ToDoListItemDescriptionComponent, ToDoEditItemComponent],
    templateUrl: './to-do-list-view.component.html',
    styleUrl: './to-do-list-view.component.scss',
})
export class ToDoListViewComponent implements OnInit {
    public selectedItem$: Observable<ToDoListItem | undefined> = EMPTY;

    constructor(
        private _router: Router,
        public toDoListService: ToDoListService,
    ) {}

    public get selectedItemId() {
        return this._router.url.split('/').pop();
    }

    ngOnInit() {
        this.selectedItem$ = this._router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            startWith(this._router.url),
            map(() => this.selectedItemId),
            switchMap((id) =>
                this.toDoListService.toDoList$.pipe(map((items) => items.find((item) => item.id === id))),
            ),
        );
    }
}
