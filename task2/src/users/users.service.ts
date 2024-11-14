import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private usersRep: Repository<UserEntity>) { }

  async getProblems() {
    const problems = await this.usersRep.update({ problems: true }, { problems: false });
    return {
      'was problems': problems.affected
    };
  }

}
