export const STATUS_OPTIONS = {
    inProgress: 'In progress',
    completed: 'Completed',
} as const;

export type ToDoListItemStatus = (typeof STATUS_OPTIONS)[keyof typeof STATUS_OPTIONS];

export interface ToDoListItem {
    id: number;
    name: string;
    status: ToDoListItemStatus;
    description?: string;
}
