import { JwtService } from '@nestjs/jwt';
import { JWTService } from './jwt.service';
import { Module } from '@nestjs/common';
// import { JwtUserStrategy } from './jwt.strategy';

@Module({
  providers: [JWTService, JwtService],
  exports: [JWTService],
})
export class JwtModule {}
