import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';
import { Role } from 'src/module/role/entities/role.entity';
import { FORBIDDEN_ACCESS } from 'src/util/message';
import { DataSource } from 'typeorm';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const roleRepository = this.dataSource.getRepository(Role);

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid Token');
    }

    const query = roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .andWhere('role.name = :name', { name: user.role });

    // // check user permission
    const targetMethod = request.method;
    const targetPath: string = request.route.path;
    let allowAll = false;
    let isExist;
    // Find the permissions in the database

    query.getOne().then((role) => {
      const userPermissions = role.permissions || [];
      isExist = userPermissions.find((permission) => {
        return (
          targetPath.includes(permission.apiPath) &&
          permission.method === targetMethod
        );
      });
      console.log(isExist);
    });

    // // let all role use auth API
    if (
      targetPath.startsWith('/api/v1/auth') ||
      targetPath.startsWith('/api/v1/files/') ||
      targetPath.startsWith('/api/v1/mail')
    )
      allowAll = true;

    if (!isExist && user.role !== 'ADMIN' && !allowAll)
      throw new ForbiddenException(FORBIDDEN_ACCESS);

    // append data to request: request.user
    return user;
  }
}
