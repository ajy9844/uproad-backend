import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { KeywordEntity } from './keyword.entity';

@Injectable()
export class KeywordRepository extends Repository<KeywordEntity> {}
