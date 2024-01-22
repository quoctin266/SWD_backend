import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RolesService } from 'src/module/role/roles.service';
import { IUser } from 'src/module/users/dto/users.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private rolesService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_KEY'),
    });
  }

  // payload is data from access token
  async validate(payload: IUser) {
    const { id, username, email, role } = payload;
    const permissions = (await this.rolesService.findOneByName(role))
      .permissions;

    // run handleRequest() in jwt auth guard with this as user parameter
    return { id, username, email, role, permissions };
  }
}
