import { Routes } from '@angular/router';

export const ROUTE_TOKENS = {
    BACKLOG: 'backlog',
    BOARD: 'board',
} as const;

export const ROUTE_CHILDREN_TOKENS = {
    TASKS: 'tasks',
} as const;

export const routes: Routes = [
    {
        path: '',
        redirectTo: [ROUTE_TOKENS.BACKLOG, ROUTE_CHILDREN_TOKENS.TASKS].join('/'),
        pathMatch: 'full',
    },
    {
        path: ROUTE_TOKENS.BACKLOG,
        loadComponent: () => import('./components/landing/landing.component').then((c) => c.LandingComponent),
        children: [
            {
                path: ROUTE_CHILDREN_TOKENS.TASKS,
                loadComponent: () =>
                    import('./components/to-do-list/to-do-list.component').then((c) => c.ToDoListComponent),
                children: [
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./components/to-do-list-view/to-do-list-view.component').then(
                                (c) => c.ToDoListViewComponent,
                            ),
                    },
                ],
            },
        ],
    },
    {
        path: ROUTE_TOKENS.BOARD,
        loadComponent: () => import('./components/landing/landing.component').then((c) => c.LandingComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./components/board/board.component').then((c) => c.BoardComponent),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/',
    },
];
