import { JwtStrategy } from './../common/jwt/jwt.strategy';
import { JWTService } from 'src/common/jwt/jwt.service';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, JwtService, JWTService],
})
export class AuthModule {}
