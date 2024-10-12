import { ToDoListItemStatus } from '../../services/to-do-list-service/to-do-list.service.types';

export const ALL_SELECT_OPTION = 'All' as const;

export type AllSelectOption = typeof ALL_SELECT_OPTION;

export type ItemSelectOption = AllSelectOption | ToDoListItemStatus;
