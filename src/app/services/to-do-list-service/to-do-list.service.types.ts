export type ToDoListItemStatus = 'inProgress' | 'completed';

export interface ToDoListItem {
    id: number;
    title: string;
    status: ToDoListItemStatus;
    description?: string;
}
