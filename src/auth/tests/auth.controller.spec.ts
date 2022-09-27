import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import User from "../../user/user.entity";
import { UserService } from "../../user/user.service";
import { AuthenticationController } from "../auth.controller";
import * as request from 'supertest';
import { AuthenticationService } from "../auth.service";
import * as bcrypt from 'bcryptjs';

describe('AuthenticationController', () => {
    let app:INestApplication;
    let authService;
    let userService;
    let userData;
    let bcryptCompare: jest.Mock;
    let findUser: jest.Mock;

    const mockConfigService = {
        get(key: string){
            switch(key){
                case 'JWT_EXPIRATION_TIME':
                    return '3600'
            }
        }
    } 

    const mockJwtService = {
        sign: () => ''
    }

    const mockUser = {
        id: 3,
        email: "marcosnicolaslopes@panevale.com.br",
        name: "Marcos Nicolas Gustavo Lopes",
        password: "$2a$06$ngFvunevLT59wekbHimhIO4dmHVLsuDQ2yErNJItGQYew3qGsS6sC",
        created_at: "2022-09-25T17:41:51.158Z",
        updated_at: "2022-09-25T17:41:51.158Z",
        deleted_at: null
    }

    userData = {
    ...mockUser
    }

    const userRepository = {
        create: jest.fn().mockResolvedValue(userData),
        save: jest.fn().mockReturnValue(Promise.resolve())
    }

    const mockUserService = {
        getByEmail: jest.fn().mockResolvedValueOnce(mockUser)
    }


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[PassportModule.register({defaultStrategy: 'jwt'})],
            controllers: [AuthenticationController],
            providers: [
                AuthenticationService,
                {
                    provide: UserService,
                    useValue: mockUserService
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: userRepository
                },
            ],
        }).compile();

        bcryptCompare = jest.fn().mockReturnValue(true);
        (bcrypt.compare as jest.Mock) = bcryptCompare;

        userData = {
            ...mockUser
        }
        findUser = jest.fn().mockResolvedValue(userData);
        const usersRepository = {
            findOne: findUser
        }

        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
      })

      describe('when registering', () => {
        describe('and using invalid data', () => {
            it('should throw an error', () => {
              return request(app.getHttpServer())
                .post('/authentication/register')
                .send({
                  name: mockUser.name
                })
                .expect(400)
            })
        })
    })
});