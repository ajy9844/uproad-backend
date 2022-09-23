import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HitEntity } from './hit.entity';

@Injectable()
export class HitRepository extends Repository<HitEntity> {}
