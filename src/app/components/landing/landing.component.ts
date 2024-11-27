import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LOCALIZED_ROUTE_TOKENS, ROUTE_CHILDREN_TOKENS, ROUTE_TOKENS } from '../../app.routes';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { capitalize } from '../../utils';
import { Locale, LocaleService } from '../../services';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet, MatButtonToggleModule],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
})
export class LandingComponent {
    public routeTokens = Object.values(ROUTE_TOKENS);

    public routes = this.routeTokens.map((route) => ({
        name: route,
        path: route === 'backlog' ? `${route}/${ROUTE_CHILDREN_TOKENS.TASKS}` : route,
        localizedName: LOCALIZED_ROUTE_TOKENS[route],
    }));

    constructor(
        private _router: Router,
        private _localeService: LocaleService,
    ) {}

    public get locales(): Locale[] {
        return this._localeService.locales;
    }

    public get currentTab(): string | undefined {
        return this._router.url.split('/').find((path) => (this.routeTokens as string[]).includes(path));
    }

    public get localizedTabName(): string | undefined {
        return this.routes.find((route) => route.name === this.currentTab)?.localizedName;
    }

    public get currentLocale(): string | undefined {
        return this._localeService.currentLocale;
    }

    public getIsRouteSelected(route: string): boolean {
        return this.currentTab === route;
    }

    public onLocaleChange(locale: string) {
        this._localeService.onLocaleChange(locale);
    }

    public capitalize = capitalize;
}
