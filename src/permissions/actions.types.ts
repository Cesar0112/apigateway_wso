// Archivo: permissions.actions.types.ts
// Enums de acciones para cada recurso del sistema

export enum MonitoringAction {
  Add = 'add',
  Update = 'update',
  Delete = 'delete',
  AddAutoRule = 'add_auto_rule',
  AddAnalytics = 'add_analytics',
  ConfigureRecording = 'configure_recording',
  AssignToStructure = 'assign_to_structure',
  OpenWebPage = 'open_web_page',
  CheckConnection = 'check_connection',
  Search = 'search',
  Monitor = 'select_monitor',
  Control = 'control',
  Presentation = 'presentation',
}
export enum AutoRuleAction {
  AddAutoRuleToAnalytics = 'add_auto_rule_to_analytics',
  UpdateAutoRuleToAnalytics = 'update_auto_rule_to_analytics',
  DeleteAutoRuleToAnalytics = 'delete_auto_rule_to_analytics',
}
export enum SectorAction {
  GOTO = 'go_to',
  Update = 'update',
  ControlPTZ = 'control_ptz',
}

export enum PathAction {
  Create = 'create',
  UpdatePosition = 'update_position',
  DeletePosition = 'delete_position',
}

export enum RecordingAction {
  /*Configure = 'configure',
  View = 'view',*/
  Statistics = 'statistics',
  Play = 'playing',
}

export enum ViewAction {
  Create = 'create',
  Select = 'select',
  Rename = 'rename',
  Delete = 'delete',
  AddCamera = 'add_camera',
  RemoveCamera = 'remove_camera',
  ClearCameras = 'clear_cameras',
  SwapCameras = 'swap_cameras',
  SearchCamera = 'search_camera',
}

export enum EventAction {
  Filter = 'filter',
}

export enum LogAction {
  Search = 'search',
}
export enum SessionAction {
  View = 'internal_session_view',
  Delete = 'internal_session_delete',
}

export enum UserAction {
  Create = 'internal_user_mgt_create',
  Update = 'internal_user_mgt_update',
  Delete = 'internal_user_mgt_delete',
  AssignRole = 'assign_role',
  ChangePassword = 'change_password',
  Activate = 'activate',
  Deactivate = 'deactivate',
  Filter = 'filter',
  List = 'internal_user_mgt_list',
  View = 'internal_user_mgt_view',
}
//Estos permisos no están todavía asignados a nada en wintelli web ya que los roles no se gestionan
export enum RoleAction {
  Add = 'internal_role_mgt_create',
  Update = 'internal_role_mgt_update',
  Delete = 'internal_role_mgt_delete',
  View = 'internal_role_mgt_view',
}

export enum ServerAction {
  Add = 'add',
  Update = 'update',
  Delete = 'delete',
  AssignToStructure = 'assign_servers_to_structure',
  AssignCamera = 'assign_camera_to_server',
  CheckConnection = 'check_connection_of_server',
  ManageAutoRule = 'manage_auto_rule',
  ManageSubsystem = 'manage_subsystem',
}
//Estos permisos faltan asignarse a la lista de RFs
export enum StructureAction {
  Add = 'add',
  Update = 'update',
  Delete = 'delete',
  Get = 'get',
}

export enum ForensicAction {
  Motion = 'motion',
  Face = 'face',
  Plate = 'plate',
  Object = 'object',
}

export enum DeployAction {
  Add = 'add',
  Update = 'update',
  Delete = 'delete',
  AssignCamera = 'assign_camera',
  DeleteCamera = 'delete_camera',
  View = 'view',
  InfoCamera = 'info_camera',
}
