import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';
import { IUser } from '../users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createRefreshToken() {
    const payload = {
      sub: 'refresh token',
      iss: 'from nest server',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const checkPW = await this.usersService.checkPassword(
        user.password,
        pass,
      );
      if (checkPW === true) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result: IUser = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role.name,
        };

        return result;
      }
    }
    return null;
  }

  async login(user: IUser) {
    const { id, username, email, role } = user;
    const payload = {
      sub: 'login token',
      iss: 'from nest server',
      id,
      username,
      email,
      role,
    };

    // generate new refresh token and update it to database
    const resfreshToken = this.createRefreshToken();
    await this.usersService.updateUserToken(resfreshToken, id);

    return {
      accessToken: this.jwtService.sign(payload),
      resfreshToken,
      user: {
        id,
        username,
        email,
        role,
      } as IUser,
    } as LoginResponse;
  }

  async processNewToken(refreshToken: string) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_KEY'),
      });

      // find user with current token and update new token for user
      const user = await this.usersService.findOneByToken(refreshToken);
      if (!user) throw new BadRequestException('Invalid refresh token');

      const { id, username, email, role } = user;

      return await this.login({ id, username, email, role: role.name });
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async clearToken(user: IUser) {
    await this.usersService.updateUserToken('', user.id);

    return null;
  }
}
