import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JWTService } from 'src/common/jwt/jwt.service';
import { UserEntity } from 'src/user/user.entity';
import { SigninRequestDto } from './dto/signin.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
  ) {}

  async signin(signinRequestDto: SigninRequestDto) {
    const { account_address } = signinRequestDto;

    let user = await this.userService.findOne(account_address);
    const userEntity = new UserEntity();
    userEntity.account_address = account_address;

    if (!user) {
      await this.userService.save(userEntity);
      user = await this.userService.findOne(account_address);
    }

    const accessToken = await this.jwtService.createJwtToken({
      sub: user.account_address,
    });

    return { accessToken: accessToken };
  }
}
