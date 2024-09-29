import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../../components/toast/toast.component';
import { ToastType } from './toast.service.types';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private _toast = inject(MatSnackBar);

    public addToast(toastType: ToastType) {
        const customClass = `snackbar__${toastType}`;

        this._toast.openFromComponent(ToastComponent, {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
            data: {
                toastType,
            },
            panelClass: [customClass],
        });
    }
}
