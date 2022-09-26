import { AdvertisementService } from './advertisement.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserAuthGuard } from 'src/common/guard/auth.guard';
import { UpdateAdvertisementRequestDto } from './dto/update.advertisement.request.dto';

@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @UseGuards(UserAuthGuard)
  @Patch(':id')
  updateAdvertisement(
    @Param('id') id: number,
    @Req() request,
    @Body() updateAdvertisementRequestDto: UpdateAdvertisementRequestDto,
  ) {
    return this.advertisementService.updateAdvertisement(
      id,
      request.user,
      updateAdvertisementRequestDto,
    );
  }

  @Get(':id')
  getAdvertisement(@Param('id') id: number) {
    return this.advertisementService.getAdvertisement(id);
  }
}
