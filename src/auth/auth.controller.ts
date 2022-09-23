import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SigninRequestDto } from './dto/signin.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signin(@Body() signinRequestDto: SigninRequestDto) {
    return this.authService.signin(signinRequestDto);
  }
}
