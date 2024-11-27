import {
    LOCALIZED_STATUS_OPTIONS,
    ToDoListItemStatus,
} from '../../services/to-do-list-service/to-do-list.service.types';

export const ALL_SELECT_OPTION = 'ALL' as const;

export const LOCALIZED_SELECT_OPTIONS = {
    [ALL_SELECT_OPTION]: $localize`All`,
    ...LOCALIZED_STATUS_OPTIONS,
};

export type AllSelectOption = typeof ALL_SELECT_OPTION;

export type ItemSelectOption = AllSelectOption | ToDoListItemStatus;
