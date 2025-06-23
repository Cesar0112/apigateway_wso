import * as actions from './actions.types';

// Acciones posibles por recurso
// Para evitar duplicados en tiempo de desarrollo, puedes usar as const y un Set para validar duplicados en tiempo de compilación y ejecución:

export const CAMERA_ACTIONS = Object.freeze({
  Add: actions.MonitoringAction.Add,
  Update: actions.MonitoringAction.Update,
  Delete: actions.MonitoringAction.Delete,
  AssignToStructure: actions.MonitoringAction.AssignToStructure,
  OpenWebPage: actions.MonitoringAction.OpenWebPage,
  CheckConnection: actions.MonitoringAction.CheckConnection,
  Search: actions.MonitoringAction.Search,
  AddAutoRule: actions.MonitoringAction.AddAutoRule,
  ConfigureRecording: actions.MonitoringAction.ConfigureRecording,
  AddAnalytics: actions.MonitoringAction.AddAnalytics,
});

export const DEPLOY_ACTIONS = Object.freeze({
  Add: actions.DeployAction.Add,
  Update: actions.DeployAction.Update,
  Delete: actions.DeployAction.Delete,
  AssignCamera: actions.DeployAction.AssignCamera,
  DeleteCamera: actions.DeployAction.DeleteCamera,
  InfoCamera: actions.DeployAction.InfoCamera,
  View: actions.DeployAction.View,
});

export const SECTOR_ACTIONS = Object.freeze({
  GOTO: actions.SectorAction.GOTO,
  Update: actions.SectorAction.Update,
  ControlPTZ: actions.SectorAction.ControlPTZ,
});

export const PATH_ACTIONS = Object.freeze({
  Create: actions.PathAction.Create,
  UpdatePosition: actions.PathAction.UpdatePosition,
  DeletePosition: actions.PathAction.DeletePosition,
});

export const RECORDING_ACTIONS = Object.freeze({
  Play: actions.RecordingAction.Play,
  Statistics: actions.RecordingAction.Statistics,
});

export const VIEW_ACTIONS = Object.freeze({
  Create: actions.ViewAction.Create,
  Select: actions.ViewAction.Select,
  Rename: actions.ViewAction.Rename,
  Delete: actions.ViewAction.Delete,
  AddCamera: actions.ViewAction.AddCamera,
  RemoveCamera: actions.ViewAction.RemoveCamera,
  ClearCameras: actions.ViewAction.ClearCameras,
  SwapCameras: actions.ViewAction.SwapCameras,
  SearchCamera: actions.ViewAction.SearchCamera,
});

export const ROLE_ACTIONS = Object.freeze({
  Add: actions.RoleAction.Add,
  Update: actions.RoleAction.Update,
  Delete: actions.RoleAction.Delete,
  View: actions.RoleAction.View,
});
export const SESSION_ACTIONS = Object.freeze({
  View: actions.SessionAction.View,
  Delete: actions.SessionAction.Delete,
});
export const SERVER_ACTIONS = Object.freeze({
  Add: actions.ServerAction.Add,
  Update: actions.ServerAction.Update,
  Delete: actions.ServerAction.Delete,
  AssignToStructure: actions.ServerAction.AssignToStructure,
  AssignCamera: actions.ServerAction.AssignCamera,
  CheckConnection: actions.ServerAction.CheckConnection,
  ManageAutoRule: actions.ServerAction.ManageAutoRule,
  ManageSubsystem: actions.ServerAction.ManageSubsystem,
});

export const STRUCTURE_ACTIONS = Object.freeze({
  Add: actions.StructureAction.Add,
  Update: actions.StructureAction.Update,
  Delete: actions.StructureAction.Delete,
  Get: actions.StructureAction.Get,
});

export const FORENSIC_ACTIONS = Object.freeze({
  Motion: actions.ForensicAction.Motion,
  Face: actions.ForensicAction.Face,
  Plate: actions.ForensicAction.Plate,
  Object: actions.ForensicAction.Object,
});

export const EVENT_ACTIONS = Object.freeze({
  Filter: actions.EventAction.Filter,
});

export const LOG_ACTIONS = Object.freeze({
  Search: actions.LogAction.Search,
});
export const USER_ACTIONS = Object.freeze({
  Create: actions.UserAction.Create,
  Update: actions.UserAction.Update,
  Delete: actions.UserAction.Delete,
  AssignRole: actions.UserAction.AssignRole,
  ChangePassword: actions.UserAction.ChangePassword,
  Activate: actions.UserAction.Activate,
  Deactivate: actions.UserAction.Deactivate,
  Filter: actions.UserAction.Filter,
});
export const AUTO_RULE_ACTIONS = Object.freeze({
  AddAutoRuleToAnalytics: actions.AutoRuleAction.AddAutoRuleToAnalytics,
  UpdateAutoRuleToAnalytics: actions.AutoRuleAction.UpdateAutoRuleToAnalytics,
  DeleteAutoRuleToAnalytics: actions.AutoRuleAction.DeleteAutoRuleToAnalytics,
});
export const ALL_ACTIONS = [
  ...Object.values(CAMERA_ACTIONS),
  ...Object.values(DEPLOY_ACTIONS),
  ...Object.values(AUTO_RULE_ACTIONS),
  ...Object.values(SECTOR_ACTIONS),
  ...Object.values(PATH_ACTIONS),
  ...Object.values(RECORDING_ACTIONS),
  ...Object.values(VIEW_ACTIONS),
  ...Object.values(ROLE_ACTIONS),
  ...Object.values(SERVER_ACTIONS),
  ...Object.values(STRUCTURE_ACTIONS),
  ...Object.values(FORENSIC_ACTIONS),
  ...Object.values(EVENT_ACTIONS),
  ...Object.values(LOG_ACTIONS),
  ...Object.values(USER_ACTIONS),
  ...Object.values(SESSION_ACTIONS),
];
export const MonitoringPermissions = [
  ...Object.values(LOG_ACTIONS),
  ...Object.values(CAMERA_ACTIONS),
  ...Object.values(DEPLOY_ACTIONS),
  ...Object.values(VIEW_ACTIONS),
];

export const OperatorPermissions = [
  ...Object.values(LOG_ACTIONS),
  ...Object.values(CAMERA_ACTIONS),
  ...Object.values(DEPLOY_ACTIONS),
  ...Object.values(VIEW_ACTIONS),
  ...Object.values(RECORDING_ACTIONS),
  ...Object.values(FORENSIC_ACTIONS),
];
