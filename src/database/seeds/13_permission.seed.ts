import { Logger } from '@nestjs/common';
import { Permission } from 'src/module/permissions/entities/permission.entity';
import { Role } from 'src/module/role/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { generatePermissions } from '../jsonData/permission';

const entityList: string[] = [
  'area',
  'application',
  'mail',
  'club',
  'comment',
  'court',
  'event',
  'member',
  'permission',
  'post',
  'role',
  'user',
  'sportType',
  'transaction',
  'vinslot',
  'wallet',
];

export class PermissionSeeder implements Seeder {
  private readonly logger = new Logger(PermissionSeeder.name);

  async run(dataSource: DataSource): Promise<any> {
    const permissionRepository = dataSource.getRepository(Permission);
    const roleRepository = dataSource.getRepository(Role);

    const countPermission: number = (await permissionRepository.find()).length;
    const allRoles = await roleRepository.find();

    if (countPermission === 0) {
      if (allRoles.length === 0) {
        this.logger.error('No Role found for seeding Permission');
        return;
      }
      const permissionRawData = generatePermissions(entityList);
      const adminRole = allRoles.find((role) => role.id === 4);
      const permissionDbData = permissionRawData.map((permission) => {
        return {
          ...permission,
          roles: [adminRole],
        };
      });

      await permissionRepository.insert(permissionDbData);
      this.logger.log('Run seeding complete');
    }
  }
}
