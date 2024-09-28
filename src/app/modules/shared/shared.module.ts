import { NgModule } from '@angular/core';
import { CustomTooltipDirective } from '../../directives/custom-tooltip.directive';

@NgModule({
    declarations: [CustomTooltipDirective],
    exports: [CustomTooltipDirective],
})
export class SharedModule {}
