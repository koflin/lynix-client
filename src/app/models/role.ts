import { MetadataEntity } from './base/metadata';

export interface Role extends MetadataEntity {
  id: string;
  name: string;
  permissions: Permission[];
}

export enum Permission {
  ORDER_VIEW = 'order_view',
  ORDER_EDIT = 'order_edit',

  PROCESS_VIEW = 'process_view',
  PROCESS_EXECUTE = 'process_execute',
  PROCESS_ASSIGN = 'process_assign',

  MANUAL_VIEW = 'manual_view',

  TEMPLATE_VIEW = 'template_view',
  TEMPLATE_EDIT = 'template_edit',

  USER_VIEW = 'user_view',
  USER_EDIT = 'user_edit',

  ROLE_VIEW = 'role_view',
  ROLE_EDIT = 'role_edit',

  STATISTIC_VIEW = 'statistic_view',

  TOOL_EDIT = 'tool_edit',

  TESTING_VIEW = 'testing_view'
}
