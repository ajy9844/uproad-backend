import { Module } from '@nestjs/common';
import { HitService } from './hit.service';
import { HitController } from './hit.controller';

@Module({
  providers: [HitService],
  controllers: [HitController]
})
export class HitModule {}
