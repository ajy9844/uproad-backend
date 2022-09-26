import { AdvertisementEntity } from './advertisement.entity';
import { UserEntity } from 'src/user/user.entity';
import { UpdateAdvertisementRequestDto } from './dto/update.advertisement.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdvertisementRepository } from './advertisement.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(AdvertisementEntity)
    private readonly advertisementRepository: AdvertisementRepository,
  ) {}

  async updateAdvertisement(
    id: number,
    user: UserEntity,
    updateAdvertisementRequestDto: UpdateAdvertisementRequestDto,
  ) {
    const ad = await this.advertisementRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (ad.user.id !== user.id) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    const { title, link } = updateAdvertisementRequestDto;

    const advertisementEntity = new AdvertisementEntity();
    advertisementEntity.title = title;
    advertisementEntity.link = link;

    await this.advertisementRepository.update(id, advertisementEntity);
  }

  getAdvertisement(id: number) {
    return this.advertisementRepository.findOne({
      where: { id },
    });
  }
}
