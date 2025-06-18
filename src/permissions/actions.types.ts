// Archivo: permissions.actions.types.ts
// Enums de acciones para cada recurso del sistema

export enum CameraAction {
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
  Monitor = 'monitor',
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
  Record = 'record',
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

export enum UserAction {
  Add = 'add',
  Update = 'update',
  Delete = 'delete',
  AssignRole = 'assign_role',
  ChangePassword = 'change_password',
  Activate = 'activate',
  Deactivate = 'deactivate',
  Filter = 'filter',
}

export enum RoleAction {
  Add = 'add',
  Update = 'update',
  Delete = 'delete',
  Get = 'get',
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
