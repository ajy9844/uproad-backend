import { AdvertisementEntity } from './advertisement.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AdvertisementRepository extends Repository<AdvertisementEntity> {}
