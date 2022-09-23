import { UserService } from './../../user/user.service';
import { JwtPayload } from './jwt.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
    return user;
  }
}
