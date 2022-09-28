import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordEntity } from './keyword.entity';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';

@Module({
  imports: [TypeOrmModule.forFeature([KeywordEntity])],
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
