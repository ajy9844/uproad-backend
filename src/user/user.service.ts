import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async updateUser(
    updateUserRequestDto: UpdateUserRequestDto,
    user: UserEntity,
  ) {
    const { id } = user;
    const { nickname, profile_image, description } = updateUserRequestDto;

    const userEntity = new UserEntity();
    userEntity.nickname = nickname;
    userEntity.profile_image = profile_image;
    userEntity.description = description;

    await this.userRepository.update(id, userEntity);
  }

  async findOne(account_address: string) {
    return this.userRepository.findOne({
      where: { account_address },
    });
  }

  async save(user: UserEntity) {
    await this.userRepository.save(user);
  }
}
