import { Controller, Post, UseGuards, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { Response } from 'express';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { SuccessResponse } from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  GET_NEW_TOKEN,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from 'src/util/message';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IUser } from '../users/dto/users.dto';
import { LogoutResponse } from './dto/logout-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  @ResponseMessage(LOGIN_SUCCESS)
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 201,
    type: SuccessResponse,
  })
  @UseGuards(LocalAuthGuard)
  login(@User() user: IUser, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  @ResponseMessage(REGISTER_SUCCESS)
  register(@Body() registerUserDTO: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDTO);
  }

  // @Get('account')
  // @ResponseMessage('Fetch current user info')
  // getAccount(@UserDec() user: UserDTO) {
  //   return user;
  // }

  @Public()
  @Post('refresh')
  @ResponseMessage(GET_NEW_TOKEN)
  @ApiBody({ type: RefreshTokenDto })
  refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.processNewToken(refreshToken);
  }

  @Post('logout')
  @ResponseMessage(LOGOUT_SUCCESS)
  @ApiResponse({
    status: 201,
    type: LogoutResponse,
  })
  logout(@User() user: IUser) {
    return this.authService.clearToken(user);
  }
}
