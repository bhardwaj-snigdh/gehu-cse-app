import { RoleType, User } from './userAndRoles';

export default interface Notice {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  issuer: Pick<User, 'name'>;
  audience: RoleType[];
}
