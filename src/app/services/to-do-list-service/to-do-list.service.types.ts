export const STATUS_OPTIONS = {
    inProgress: 'In progress',
    completed: 'Completed',
} as const;

export const LOCALIZED_STATUS_OPTIONS = {
    [STATUS_OPTIONS.inProgress]: $localize`In progress`,
    [STATUS_OPTIONS.completed]: $localize`Completed`,
};

export const TOAST_MESSAGES = {
    add: $localize`Todo was added!`,
    patch: $localize`Todo was updated!`,
    delete: $localize`Todo was deleted!`,
    error: $localize`Something went wrong. Try again`,
} as const;

export type ToDoListItemStatus = (typeof STATUS_OPTIONS)[keyof typeof STATUS_OPTIONS];

export interface ToDoListItem {
    // WARNING: https://github.com/typicode/json-server/issues/1473
    id: string;
    name: string;
    status: ToDoListItemStatus;
    description?: string;
}
