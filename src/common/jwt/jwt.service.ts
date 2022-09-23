import { JwtPayload } from './jwt.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async createJwtToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: await this.configService.get('JWT_SECRET'),
      expiresIn: await this.configService.get('JWT_EXPIRE'),
    });
  }

  async splitAuthorization(authorization: string): Promise<string> {
    return authorization.split('Bearer ').at(-1) as string;
  }

  async verify(token: string): Promise<JwtPayload> {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
