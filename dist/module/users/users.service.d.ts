import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { RolesService } from '../role/roles.service';
import { Member } from '../members/entities/member.entity';
import { Club } from '../clubs/entities/club.entity';
import { UserFilterDto } from './dto/filter-user.dto';
import { Wallet } from '../wallets/entities/wallet.entity';
export declare const hashPassword: (password: string) => Promise<string>;
export declare class UsersService {
    private usersRepository;
    private rolesService;
    private membersRepository;
    private clubsRepository;
    private walletsRepository;
    constructor(usersRepository: Repository<User>, rolesService: RolesService, membersRepository: Repository<Member>, clubsRepository: Repository<Club>, walletsRepository: Repository<Wallet>);
    checkPassword(hash: string, password: string): Promise<boolean>;
    updateUserToken(refreshToken: string, userId: number): Promise<import("typeorm").UpdateResult>;
    registerUser(registerUserDTO: RegisterUserDto): Promise<import("typeorm").ObjectLiteral>;
    create(createUserDto: CreateUserDto): Promise<import("typeorm").ObjectLiteral>;
    findList(queryObj: UserFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            role: string;
            id: number;
            username: string;
            email: string;
            password: string;
            address: string;
            phone: string;
            dob: Date;
            isActive: boolean;
            refreshToken: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        role: string;
        id: number;
        username: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        dob: Date;
        isActive: boolean;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneByToken(refreshToken: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
