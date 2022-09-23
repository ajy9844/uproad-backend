import { AdvertisementEntity } from './advertisement.entity';
import { AdvertisementRepository } from './advertisement.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertisementEntity])],
  providers: [AdvertisementService],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}
