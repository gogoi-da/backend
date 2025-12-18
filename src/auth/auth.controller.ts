import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDocs, SignupDocs, SigninDocs, RefreshDocs } from './docs';
import { SignupDto, SigninDto, RefreshDto } from './dto';

@Controller('auth')
@AuthDocs.Controller
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @SignupDocs
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @SigninDocs
  signin(@Body() dto: SigninDto) {
    console.log(dto);
    return this.authService.signin(dto);
  }

  @Post('refresh')
  @RefreshDocs
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }
}
