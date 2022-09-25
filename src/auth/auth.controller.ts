import { SignupRequestDto } from './dto/signup.request.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SigninRequestDto } from './dto/signin.request.dto';
import { IsSignupRequestDto } from './dto/is-signup.request.dto';
import { UserAuthGuard } from 'src/common/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinRequestDto: SigninRequestDto) {
    return this.authService.signin(signinRequestDto);
  }

  @Post('signup')
  signup(@Body() signupRequestDto: SignupRequestDto) {
    return this.authService.signup(signupRequestDto);
  }

  @Get()
  isSignup(@Body() signupRequestDto: IsSignupRequestDto) {
    return this.authService.isSignup(signupRequestDto);
  }

  @UseGuards(UserAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    return this.authService.deleteUser(request.user);
  }
}
