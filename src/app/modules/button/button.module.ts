import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
    declarations: [],
    imports: [CommonModule, ButtonComponent],
    exports: [ButtonComponent],
})
export class ButtonModule {}
