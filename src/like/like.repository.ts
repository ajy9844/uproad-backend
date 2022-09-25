import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeRepository extends Repository<LikeEntity> {}
