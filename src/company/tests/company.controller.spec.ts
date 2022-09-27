import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import CreateCompanyDTO from "../dto/create-company.dto";
import { CompanyController } from "../company.controller";
import CompanyService from "../company.service";
import ShowQueryDTO from "../dto/show-query.dto";


describe('CompanyController', () => {
    let controller: CompanyController;
    let service: CompanyService;

    const mockCompany = {
        name: "teste",
        cnpj: "000000000000",
        address: "teste",
        phone: "00000000",
        qty_motorcycles: 10,
        qty_cars: 10,
        id: 4,
        created_at: "2022-09-26T22:24:22.786Z",
        updated_at: "2022-09-26T22:24:22.786Z"
    };

    const mockUser = {
        id: 3,
        email: "marcosnicolaslopes@panevale.com.br",
        name: "Marcos Nicolas Gustavo Lopes",
        password: "$2a$06$ngFvunevLT59wekbHimhIO4dmHVLsuDQ2yErNJItGQYew3qGsS6sC",
        created_at: "2022-09-25T17:41:51.158Z",
        updated_at: "2022-09-25T17:41:51.158Z",
        deleted_at: null
    }

    const mockCountInOutPark = {
        cnpj: "000000000000",
        in: "0",
        out: "0"
    };

    const mockCountInOutParkPerHour = {
        cnpj: "88279101000194",
        hora: 13,
        qty_in: "1",
        qty_out: "1"
    };

    const mockCountVehicleParkInPerPeriodByCnpj= {
        cnpj: "88279101000194",
        qty_in: "11"
    }

    const mockFrequencyVehicleCompanyByCnpj = {
        cnpj: "88279101000194",
        board: "JKG-0950",
        frequency: "2"
    };

    const mockCompanyById = { 
        id: 1,
        name: "Juan e Giovanni Marketing Ltda",
        cnpj: "88279101000194",
        address: "Rua Jaru",
        phone: "1126357107",
        qty_motorcycles: 20,
        qty_cars: 30,
        created_at: "2022-09-25T13:55:27.809Z",
        updated_at: "2022-09-25T13:55:27.809Z",
        park: [
            {
                id: 1,
                vehicleId: 1,
                companyId: 1,
                created_at: "2022-09-25T16:46:00.490Z",
                updated_at: "2022-09-25T23:21:31.048Z",
                deleted_at: null,
                vehicle: {
                    id: 1,
                    brand: "Renault",
                    model: "Clio Tech Run 1.0 16v 70cv 5p",
                    color: "Preto",
                    board: "JNS-1537",
                    type: "carro"
                }
            }
        ]
    }

    const mockCountInOutParkByCnpj = {
        in: "11",
        out: "4"
    }

    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

    const mockCompanyService = {
        getAll: jest.fn().mockResolvedValueOnce([mockCompany]),
        getCountInOutPark: jest.fn().mockResolvedValueOnce([mockCountInOutPark]),
        getCountInOutParkPerHour: jest.fn().mockResolvedValueOnce([mockCountInOutParkPerHour]),
        getCountVehicleParkInPerPeriodByCnpj: jest.fn().mockResolvedValueOnce([mockCountVehicleParkInPerPeriodByCnpj]),
        getFrequencyVehicleCompanyByCnpj: jest.fn().mockResolvedValueOnce([mockFrequencyVehicleCompanyByCnpj]),
        showById: jest.fn().mockResolvedValueOnce(mockCompanyById),
        getCountInOutParkByCnpj: jest.fn().mockResolvedValueOnce(mockCountInOutParkByCnpj),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn().mockResolvedValueOnce(mockResponse)
    };

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[PassportModule.register({defaultStrategy: 'jwt'})],
            controllers: [CompanyController],
            providers: [
                {
                    provide: CompanyService,
                    useValue: mockCompanyService,
                },
            ]
        }).compile();

        controller = module.get<CompanyController>(CompanyController);
        service = module.get<CompanyService>(CompanyService);
    });


    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllCompany',() => {
        it('should get all company', async () => {
            const result = await controller.getAll(mockUser as any);

            expect(service.getAll).toHaveBeenCalled();
            expect(result).toEqual([mockCompany]);
        });
    });

    describe('getCountInOutPark',() => {
        it('should count in and out in the park', async () => {
            const result = await controller.getCountInOutPark(mockUser as any);

            expect(service.getCountInOutPark).toHaveBeenCalled();
            expect(result).toEqual([mockCountInOutPark]);
        });
    });

    describe('getCountInOutParkPerHour',() => {
        it('should count in and out in the park per hour', async () => {
            const result = await controller.getCountInOutParkPerHour(mockUser as any);

            expect(service.getCountInOutParkPerHour).toHaveBeenCalled();
            expect(result).toEqual([mockCountInOutParkPerHour]);
        });
    });

    describe('getCountVehicleParkInPerPeriodByCnpj',() => {
        it('should count in and out in the park per period by cnpj', async () => {
            const params = '88279101000194';
            const query: ShowQueryDTO = {
                startDate: '2022-09-23',
                endDate: '2022-09-25'
            } 

            const result = await controller.getCountVehicleParkInPerPeriodByCnpj(params,query,mockUser as any);

            expect(service.getCountVehicleParkInPerPeriodByCnpj).toHaveBeenCalled();
            expect(result).toEqual([mockCountVehicleParkInPerPeriodByCnpj]);
        });
    });

    describe('getFrequencyVehicleCompanyByCnpj',() => {
        it('should return frequency vehicle by cnpj', async () => {
            const params = '88279101000194';
            const result = await controller.getFrequencyVehicleCompanyByCnpj(params,mockUser as any);

            expect(service.getFrequencyVehicleCompanyByCnpj).toHaveBeenCalled();
            expect(result).toEqual([mockFrequencyVehicleCompanyByCnpj]);
        });
    });

    describe('companyById',() => {
        it('should return company by id', async () => {
            const params = 1;
            const result = await controller.show(params,mockUser as any);

            expect(service.showById).toHaveBeenCalled();
            expect(result).toEqual(mockCompanyById);
        });
    });

    describe('countInOutParkByCnpj',() => {
        it('should return count in and out in the park by cnpj', async () => {
            const params = '88279101000194';
            const result = await controller.getCountInOutParkByCnpj(params,mockUser as any);

            expect(service.getCountInOutParkByCnpj).toHaveBeenCalled();
            expect(result).toEqual(mockCountInOutParkByCnpj);
        });
    });

    describe('create', () => {
        it('should create a company', async () => {
            const newCompany: CreateCompanyDTO = {
                name: "teste",
                cnpj: "000000000000",
                address: "teste",
                phone: "00000000",
                qty_motorcycles: 10,
                qty_cars: 10
            }

            mockCompanyService.create = jest.fn().mockResolvedValueOnce(mockCompany);

            const result = await controller.create(newCompany as any, mockUser as any);
            
            expect(service.create).toHaveBeenCalled();
            expect(result).toEqual(mockCompany);
        });
    });

    describe('updateCompany', () => {
        it('should update company by ID', async () => {
            const company = {...mockCompany, name: 'test01'};
            const updateCompany = {name: 'test01'};

            mockCompanyService.update = jest.fn().mockResolvedValueOnce(company);

            const result = await controller.update(company.id, updateCompany as any, mockUser as any);

            expect(service.update).toHaveBeenCalled();
            expect(result).toEqual(company);
            expect(result.name).toEqual(company.name);
        });
    });

    describe('deleteCompany', () => {
        it('should delete company by ID', async () => {
            const result = await controller.delete(mockCompany.id, mockUser as any, mockResponse);
            
            expect(service.delete).toHaveBeenCalled();
   
            expect(result).toBe(mockResponse);
        });
    });
});