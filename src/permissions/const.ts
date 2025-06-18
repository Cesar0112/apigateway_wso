import * as actions from './actions.types';

// Acciones posibles por recurso
// Para evitar duplicados en tiempo de desarrollo, puedes usar as const y un Set para validar duplicados en tiempo de compilación y ejecución:

export const CAMERA_ACTIONS: actions.CameraAction[] = [
  actions.CameraAction.Add,
  actions.CameraAction.Update,
  actions.CameraAction.Delete,
  actions.CameraAction.AssignToStructure,
  actions.CameraAction.OpenWebPage,
  actions.CameraAction.CheckConnection,
  actions.CameraAction.Search,
  actions.CameraAction.AddAutoRule,
  actions.CameraAction.ConfigureRecording,
  actions.CameraAction.AddAnalytics,
];
export const DEPLOY_ACTIONS: actions.DeployAction[] = [
  actions.DeployAction.Add,
  actions.DeployAction.Update,
  actions.DeployAction.Delete,
  actions.DeployAction.AssignCamera,
  actions.DeployAction.DeleteCamera,
  actions.DeployAction.InfoCamera,
  actions.DeployAction.View,
];

export const SECTOR_ACTIONS: actions.SectorAction[] = [
  actions.SectorAction.GOTO,
  actions.SectorAction.Update,
  actions.SectorAction.ControlPTZ,
];

export const PATH_ACTIONS: actions.PathAction[] = [
  actions.PathAction.Create,
  actions.PathAction.UpdatePosition,
  actions.PathAction.DeletePosition,
];

export const RECORDING_ACTIONS: actions.RecordingAction[] = [
  actions.RecordingAction.Record,
  actions.RecordingAction.Statistics,
];

export const VIEW_ACTIONS: actions.ViewAction[] = [
  actions.ViewAction.Create,
  actions.ViewAction.Select,
  actions.ViewAction.Rename,
  actions.ViewAction.Delete,
  actions.ViewAction.AddCamera,
  actions.ViewAction.RemoveCamera,
  actions.ViewAction.ClearCameras,
  actions.ViewAction.SwapCameras,
  actions.ViewAction.SearchCamera,
];

export const ROLE_ACTIONS: actions.RoleAction[] = [
  actions.RoleAction.Add,
  actions.RoleAction.Update,
  actions.RoleAction.Delete,
  actions.RoleAction.Get,
];

export const SERVER_ACTIONS: actions.ServerAction[] = [
  actions.ServerAction.Add,
  actions.ServerAction.Update,
  actions.ServerAction.Delete,
  actions.ServerAction.AssignToStructure,
  actions.ServerAction.AssignCamera,
  actions.ServerAction.CheckConnection,
  actions.ServerAction.ManageAutoRule,
  actions.ServerAction.ManageSubsystem,
];

export const STRUCTURE_ACTIONS: actions.StructureAction[] = [
  actions.StructureAction.Add,
  actions.StructureAction.Update,
  actions.StructureAction.Delete,
  actions.StructureAction.Get,
];

export const FORENSIC_ACTIONS: actions.ForensicAction[] = [
  actions.ForensicAction.Motion,
  actions.ForensicAction.Face,
  actions.ForensicAction.Plate,
  actions.ForensicAction.Object,
];

export const EVENT_ACTIONS: actions.EventAction[] = [
  actions.EventAction.Filter,
];

export const LOG_ACTIONS: actions.LogAction[] = [actions.LogAction.Search];

export const USER_ACTIONS: actions.UserAction[] = [
  actions.UserAction.Add,
  actions.UserAction.Update,
  actions.UserAction.Delete,
  actions.UserAction.AssignRole,
  actions.UserAction.ChangePassword,
  actions.UserAction.Activate,
  actions.UserAction.Deactivate,
  actions.UserAction.Filter,
];
export const AUTO_RULE_ACTIONS: actions.AutoRuleAction[] = [
  actions.AutoRuleAction.AddAutoRuleToAnalytics,
  actions.AutoRuleAction.UpdateAutoRuleToAnalytics,
  actions.AutoRuleAction.DeleteAutoRuleToAnalytics,
];
export const ALL_ACTIONS = [
  ...CAMERA_ACTIONS,
  ...DEPLOY_ACTIONS,
  ...AUTO_RULE_ACTIONS,
  ...SECTOR_ACTIONS,
  ...PATH_ACTIONS,
  ...RECORDING_ACTIONS,
  ...VIEW_ACTIONS,
  ...ROLE_ACTIONS,
  ...SERVER_ACTIONS,
  ...STRUCTURE_ACTIONS,
  ...FORENSIC_ACTIONS,
  ...EVENT_ACTIONS,
  ...LOG_ACTIONS,
  ...USER_ACTIONS,
];
export const MonitoringPermissions = [
  ...LOG_ACTIONS,
  ...CAMERA_ACTIONS,
  ...DEPLOY_ACTIONS,
  ...VIEW_ACTIONS,
];
export const OperatorPermissions = [
  ...LOG_ACTIONS,
  ...CAMERA_ACTIONS,
  ...DEPLOY_ACTIONS,
  ...VIEW_ACTIONS,
  ...RECORDING_ACTIONS,
  ...FORENSIC_ACTIONS,
];
