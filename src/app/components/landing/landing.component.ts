import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ROUTE_CHILDREN_TOKENS, ROUTE_TOKENS } from '../../app.routes';
import { CommonModule } from '@angular/common';
import { capitalize } from '../../utils';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
})
export class LandingComponent {
    public routeTokens = Object.values(ROUTE_TOKENS);

    public routes = this.routeTokens.map((route) => ({
        name: route,
        path: route === 'backlog' ? `${route}/${ROUTE_CHILDREN_TOKENS.TASKS}` : route,
    }));

    constructor(private _router: Router) {}

    public get currentTab() {
        return this._router.url.split('/').find((path) => (this.routeTokens as string[]).includes(path));
    }

    public getIsRouteSelected(route: string): boolean {
        return this.currentTab === route;
    }

    public capitalize = capitalize;
}
