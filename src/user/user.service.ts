import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async findOne(account_address: string) {
    return this.userRepository.findOne({
      where: { account_address },
    });
  }

  async save(user: UserEntity) {
    await this.userRepository.save(user);
  }
}
