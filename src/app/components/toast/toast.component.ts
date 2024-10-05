import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastData } from '../../services';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
})
export class ToastComponent {
    snackBarRef = inject(MatSnackBarRef);

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ToastData) {}

    public getMessage() {
        switch (this.data.toastType) {
            case 'positive':
                return 'Todo was added!';
            case 'negative':
                return 'Todo was deleted!';
            case 'info':
                return 'Todo was edited!';
            default:
                throw new Error(`Unknown toastType: ${this.data.toastType}`);
        }
    }
}
