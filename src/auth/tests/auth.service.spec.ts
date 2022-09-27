import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import User from "../../user/user.entity";
import { UserService } from "../../user/user.service";
import { Repository } from "typeorm";
import { AuthenticationService } from "../auth.service";
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('AuthenticationService', () => {
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


    const mockUserService = {
        getByEmail: jest.fn().mockResolvedValueOnce(mockUser)
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthenticationService,
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
                    useValue: {}
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
        
        authService = await module.get<AuthenticationService>(AuthenticationService);
        userService = await module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('when creating a cookie', () => {
        it('should return a string', () => {
          const userId = 1;
          expect(
            typeof authService.getCookieWithJwtToken(userId)
          ).toEqual('string')
        })
    })

    describe('when accessing the data of authenticating user', () => {
        it('should attempt to get the user by email', async () => {
          const getByEmailSpy = jest.spyOn(userService, 'getByEmail');
          await authService.getAuthenticatedUser('user@email.com', 'strongPassword');
          expect(getByEmailSpy).toBeCalledTimes(1);
        })
    })

    describe('and the provided password is not valid', () => {
        beforeEach(() => {
          bcryptCompare.mockReturnValue(false);
        });
        it('should throw an error', async () => {
          await expect(
            authService.getAuthenticatedUser('user@email.com', 'strongPassword')
          ).rejects.toThrow();
        })
    })

    describe('and the provided password is valid', () => {
        beforeEach(() => {
          bcryptCompare.mockReturnValue(true);
        });
        describe('and the user is not found in the database', () => {
          beforeEach(() => {
            findUser.mockResolvedValue(undefined);
          })
          it('should throw an error', async () => {
            await expect(
              authService.getAuthenticatedUser('user@email.com', 'strongPassword')
            ).rejects.toThrow();
          })
        })
      })
});