import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [MatButtonModule, CommonModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent extends MatButton {
    @Input() title = '';
    @Input() buttonType: 'flat' | 'stroked' = 'flat';
    @Input() type = 'submit';

    @Output() buttonClick = new EventEmitter<Event>();
}
