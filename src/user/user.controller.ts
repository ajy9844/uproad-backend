import { UserAuthGuard } from '../common/guard/auth.guard';
import { UserService } from './user.service';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserAuthGuard)
  @Patch()
  updateUser(
    @Body() updateUserRequestDto: UpdateUserRequestDto,
    @Req() request,
  ) {
    return this.userService.updateUser(updateUserRequestDto, request.user);
  }
}
