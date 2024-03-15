import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService, hashPassword } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';
import { IUser } from '../users/dto/users.dto';
import { GoogleAuthDto } from '../users/dto/google-auth.dto';
import { RolesService } from '../role/roles.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
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

  async googleAuth(googleAuthDto: GoogleAuthDto) {
    const { username, email } = googleAuthDto;

    const userExist = await this.usersService.findOneByEmail(email);
    if (!userExist) {
      const roleId = (await this.rolesService.findOneByName('USER')).id;
      const password = await hashPassword('123456a@');

      await this.usersService.create({ email, username, roleId, password });
    }

    const user = await this.usersService.findOneByEmail(email);
    const payload = {
      sub: 'google login token',
      iss: 'from nest server',
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.name,
    };

    // generate new refresh token and update it to database
    const resfreshToken = this.createRefreshToken();
    await this.usersService.updateUserToken(resfreshToken, user.id);

    return {
      accessToken: this.jwtService.sign(payload),
      resfreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.name,
      } as IUser,
    } as LoginResponse;
  }

  googleAuthServer(req: Request) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      user: req.user,
    };
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
