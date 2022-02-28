import { User } from './../entities/user.entity';
export class UserResponse {
  page: number;
  size: number;
  total: number;
  data: User[];
}
