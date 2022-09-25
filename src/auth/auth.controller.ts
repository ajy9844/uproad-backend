import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SigninRequestDto } from './dto/signin.request.dto';
import { IsSignupRequestDto } from './dto/is-signup.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signin(@Body() signinRequestDto: SigninRequestDto) {
    return this.authService.signin(signinRequestDto);
  }

  @Get()
  isSignup(@Body() signupRequestDto: IsSignupRequestDto) {
    return this.authService.isSignup(signupRequestDto);
  }
}
