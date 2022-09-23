import { JwtPayload } from './jwt.interface';
import { JWT_AUTH } from './jwt.constant';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, JWT_AUTH) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(payload: JwtPayload) {}
}
