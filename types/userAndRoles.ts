export const Role = {
  ADMIN: 'ADMIN',
  HOD: 'HOD',
  FACULTY: 'FACULTY',
  USER: 'USER',
} as const;

export type RoleType = keyof typeof Role;

export interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  role: RoleType;
}
