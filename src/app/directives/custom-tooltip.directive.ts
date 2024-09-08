import { Directive, ElementRef, HostListener, Input, Renderer2, OnDestroy } from '@angular/core';

@Directive({
    selector: '[appCustomTooltip]',
})
export class CustomTooltipDirective implements OnDestroy {
    @Input() tooltipText: string | null = null;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    private _tooltipEl: HTMLElement | null = null;
    private _offset = 10;

    private _addTooltip() {
        if (!this.tooltipText) {
            return;
        }

        this._tooltipEl = this.renderer.createElement('span') as HTMLElement;
        this.renderer.appendChild(this._tooltipEl, this.renderer.createText(this.tooltipText));
        this.renderer.appendChild(document.body, this._tooltipEl);

        const host = this.el.nativeElement.getBoundingClientRect();
        const tooltip = this._tooltipEl.getBoundingClientRect();

        const top = host.bottom + this._offset;
        const left = host.left + (host.width - tooltip.width) / 2;

        this._tooltipEl.classList.add('tooltip');
        this.renderer.setStyle(this._tooltipEl, 'top', `${top}px`);
        this.renderer.setStyle(this._tooltipEl, 'left', `${left}px`);
    }

    private _removeTooltip() {
        this.renderer.removeChild(this.el.nativeElement, this._tooltipEl);
        this._tooltipEl = null;
    }

    @HostListener('mouseenter') onMouseEnter() {
        if (!this.tooltipText) {
            return;
        }

        this._addTooltip();
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (!this.tooltipText) {
            return;
        }

        this._removeTooltip();
    }

    ngOnDestroy() {
        this._removeTooltip();
    }
}
