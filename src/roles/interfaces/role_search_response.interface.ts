export interface RoleSearchResponse {
  itemsPerPage: number;
  Resources: Resource[];
  schemas: string[];
  startIndex: number;
  totalResults: number;
}

export interface Resource {
  audience: Audience;
  displayName: string;
  meta: Meta;
  permissions: Permission[];
  groups: Group[];
  id: string;
  associatedApplications: AssociatedApplication[];
  users: User[];
}

interface Audience {
  display: string;
  type: string;
  value: string;
}

interface Meta {
  location: string;
}

export interface Permission {
  display: string;
  value: string;
  $ref: string;
}

interface Group {
  display: string;
  value: string;
  $ref: string;
}

interface AssociatedApplication {
  value: string;
  $ref: string;
}

interface User {
  display: string;
  value: string;
  $ref: string;
}
