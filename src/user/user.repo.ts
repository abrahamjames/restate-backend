import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUsers(
    page?: number,
    size?: number,
    search?: string,
  ): Promise<User[]> {
    const query = this.createQueryBuilder('user');
    if (search) {
      query.andWhere(
        'LOWER(user.first_name) LIKE LOWER(:search) OR LOWER(user.last_name) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
      //   query.orWhere('LOWER(user.last_name) LIKE LOWER(:search)');
    }

    query.skip(page ?? 0);
    query.take(size ?? 0);

    const users = await query.getMany();

    return users;
  }
}
