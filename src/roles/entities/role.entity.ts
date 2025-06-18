import * as per from 'src/permissions/const';

export class Role {
  id: string;
  name: string;
  permissions: string[];
}

export class SuperAdminRole extends Role {
  constructor() {
    super();
    this.id = 'super_admin';
    this.name = 'Super Admin';
    this.permissions = per.ALL_ACTIONS;
  }
}
export class MonitoringRole extends Role {
  constructor() {
    super();
    this.id = 'monitoring';
    this.name = 'Monitoring';
    this.permissions = per.MonitoringPermissions;
  }
}

export class OperatorRole extends Role {
  constructor() {
    super();
    this.id = 'operator';
    this.name = 'Operator';
    this.permissions = per.OperatorPermissions;
  }
}
