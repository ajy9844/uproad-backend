import { ArticleRepository } from './../article/article.repository';
import { ArticleEntity } from 'src/article/entity/article.entity';
import { SignupRequestDto } from './dto/signup.request.dto';
import { UserRepository } from 'src/user/user.repository';
import { IsSignupRequestDto } from './dto/is-signup.request.dto';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JWTService } from 'src/common/jwt/jwt.service';
import { UserEntity } from 'src/user/user.entity';
import { SigninRequestDto } from './dto/signin.request.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleRepository,
  ) {}

  async signin(signinRequestDto: SigninRequestDto) {
    const { account_address } = signinRequestDto;

    const user = await this.userService.findOne(account_address);

    const accessToken = await this.jwtService.createJwtToken({
      sub: user.account_address,
    });

    return { accessToken: accessToken };
  }

  async signup(signupRequestDto: SignupRequestDto) {
    const { account_address, nickname } = signupRequestDto;

    const userEntity = new UserEntity();
    userEntity.account_address = account_address;
    userEntity.nickname = nickname;

    await this.userService.save(userEntity);

    const accessToken = await this.jwtService.createJwtToken({
      sub: userEntity.account_address,
    });

    return { accessToken: accessToken };
  }

  async isSignup(isSignupRequestDto: IsSignupRequestDto) {
    const { account_address } = isSignupRequestDto;

    const user = await this.userService.findOne(account_address);

    if (!user) {
      return false;
    }
    return true;
  }

  async deleteUser(user: UserEntity) {
    await this.userRepository.softRemove(user);
    await this.articleRepository.softRemove(user);
  }
}
