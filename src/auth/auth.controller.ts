import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.send('register.user.auth', registerUserDto)
    .pipe(
      catchError( error => {
        throw new RpcException(error);
      })
    )
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.send('login.user.auth', loginUserDto)
    .pipe(
      catchError( error => {
        throw new RpcException(error);
      })
    )
  }

  @UseGuards( AuthGuard)
  @Get('verify')
  verifyUser( @User() user: CurrentUser, @Token() token: string) {

    //return this.authService.send('verify.user.auth', {})
    return {user, token}
  }
}
