import { inject, Injectable } from '@angular/core';
import { STATUS_OPTIONS, ToDoListItem, ToDoListItemStatus } from './to-do-list.service.types';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, switchMap, take, throwError, withLatestFrom } from 'rxjs';
import { ToastService } from '../toast-service';
import { ApiService } from '../api-service';

@Injectable({
    providedIn: 'root',
})
export class ToDoListService {
    private _api = inject(ApiService);
    private _toDoListSubject = new BehaviorSubject<ToDoListItem[]>([]);
    private _isLoadingSubject = new BehaviorSubject<boolean>(false);
    private _isEditingSubject = new BehaviorSubject<boolean>(false);
    private _defaultId = '0';

    public toDoList$ = this._toDoListSubject.asObservable();
    public isLoading$ = this._isLoadingSubject.asObservable();
    public isEditing$ = this._isEditingSubject.asObservable();

    constructor(private _toastService: ToastService) {}

    // ДОБАВИТЬ ОТПИСКИ!!!!
    public getItemIds(items: ToDoListItem[]) {
        return items.map((item) => item.id);
    }

    public setItemStatus(item: ToDoListItem, status: ToDoListItemStatus) {
        item.status = status;
    }

    public setIsEditing(isEditing: boolean) {
        this._isEditingSubject.next(isEditing);
    }

    public toggleItemStatus(item: ToDoListItem) {
        if (item.status === STATUS_OPTIONS.completed) {
            this.patchItem({ ...item, status: STATUS_OPTIONS.inProgress });
        } else {
            this.patchItem({ ...item, status: STATUS_OPTIONS.completed });
        }
    }

    public getToDoList() {
        this._isLoadingSubject.next(true);

        this._api
            .getItems()
            .pipe(catchError(this.handleHttpError))
            .subscribe((items) => {
                this._toDoListSubject.next(items);
                this._isLoadingSubject.next(false);
            });
    }

    public addItem({ name, description }: Omit<ToDoListItem, 'id' | 'status'>) {
        this._isLoadingSubject.next(true);

        this._toDoListSubject
            .pipe(
                take(1),
                map((items) =>
                    this.getItemIds(items).length > 0
                        ? (Math.max(...this.getItemIds(items).map((id) => parseInt(id))) + 1).toString()
                        : this._defaultId,
                ),
                switchMap((id) =>
                    this._api
                        .addItem({
                            id,
                            name: name.trim(),
                            description: description?.trim(),
                            status: STATUS_OPTIONS.inProgress,
                        })
                        .pipe(
                            withLatestFrom(this._toDoListSubject),
                            map(([newItem, items]) => [...items, newItem]),
                        ),
                ),
                catchError(this.handleHttpError),
            )
            .subscribe((items) => {
                this._toDoListSubject.next(items);
                this._isLoadingSubject.next(false);
                this._toastService.addToast({
                    message: 'Todo was added!',
                    toastType: 'positive',
                });
            });
    }

    public patchItem(payload: Required<Pick<ToDoListItem, 'id'>> & Partial<ToDoListItem>) {
        this._isLoadingSubject.next(true);

        this._api
            .patchItem(payload)
            .pipe(
                switchMap((patchedItem) =>
                    this._toDoListSubject.pipe(
                        take(1),
                        map((items) => items.map((item) => (item.id === patchedItem.id ? patchedItem : item))),
                    ),
                ),
                catchError(this.handleHttpError),
            )
            .subscribe((items) => {
                this._toDoListSubject.next(items);
                this._isLoadingSubject.next(false);
                this._toastService.addToast({
                    message: 'Todo was updated!',
                    toastType: 'info',
                });
            });
    }

    public deleteItem(id: string) {
        this._isLoadingSubject.next(true);

        this._api
            .deleteItem({ id })
            .pipe(
                switchMap(() =>
                    this._toDoListSubject.pipe(
                        take(1),
                        map((items) => items.filter((item) => item.id !== id)),
                    ),
                ),
                catchError(this.handleHttpError),
            )
            .subscribe((items) => {
                this._toDoListSubject.next(items);
                this._isLoadingSubject.next(false);
                this._toastService.addToast({
                    message: 'Todo was deleted!',
                    toastType: 'negative',
                });
            });
    }

    public handleHttpError(err: HttpErrorResponse): Observable<never> {
        console.error(err);

        const message = 'Something went wrong. Try again';
        this._toastService.addToast({
            message,
            toastType: 'error',
        });
        this._isLoadingSubject.next(false);
        return throwError(() => new Error(message));
    }
}
