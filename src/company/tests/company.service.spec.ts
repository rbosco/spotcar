import {Test, TestingModule} from '@nestjs/testing';
import { CompanyRepository } from '../company.repository';
import CompanyService from '../company.service';
import ShowQueryDTO from '../dto/show-query.dto';

describe('CompanyService', () => {
    let service;
    let repository;

    const mockCountInOutPark = {
        cnpj: "000000000000",
        in: "0",
        out: "0"
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

    const mockCountInOutParkByCnpj = {
        in: "11",
        out: "4"
    }

    const mockCountInParkPerHour = {
        cnpj: '000000000000',
        hour: '14',
        qty_in: '10'
    }

    const mockCountOutParkPerHour = {
        cnpj: '000000000000',
        hour: '14',
        qty_out: '10'
    }

    const mockCompanyRepository = {
        getCountInOutPark: jest.fn().mockResolvedValueOnce([mockCountInOutPark]),
        getCountInOutParkByCnpj: jest.fn().mockResolvedValueOnce(mockCountInOutParkByCnpj),
        getCountInParkPerHour: jest.fn().mockResolvedValueOnce([mockCountInParkPerHour]),
        getCountOutParkPerHour: jest.fn().mockResolvedValueOnce([mockCountOutParkPerHour]),
        getCountVehicleParkInPerPeriodByCnpj: jest.fn().mockResolvedValueOnce([mockCountVehicleParkInPerPeriodByCnpj]),
        getFrequencyVehicleCompanyByCnpj: jest.fn().mockResolvedValueOnce([mockFrequencyVehicleCompanyByCnpj])
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CompanyService,
                {
                    provide: CompanyRepository,
                    useValue: mockCompanyRepository
                }
            ],
        }).compile();
        
        service = await module.get<CompanyService>(CompanyService);
        repository = await module.get<CompanyRepository>(CompanyRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getCountInOutPark',() => {
        it('should count in and out in the park', async () => {
            const result = await service.getCountInOutPark();
            
            expect(repository.getCountInOutPark).toHaveBeenCalled();
            expect(result).toEqual([mockCountInOutPark]);
        });
    });

    describe('getCountInOutParkByCnpj',() => {
        it('should return count in and out in the park by cnpj', async () => {
            const result = await service.getCountInOutParkByCnpj();

            expect(repository.getCountInOutParkByCnpj).toHaveBeenCalled();
            expect(result).toEqual(mockCountInOutParkByCnpj);
        });
    });

    describe('getCountVehicleParkInPerPeriodByCnpj',() => {
        it('should count in and out in the park per period by cnpj', async () => {
            const cnpj = '000000000000';
            const query: ShowQueryDTO = {
                startDate: '2022-09-23',
                endDate: '2022-09-25'
            }
            const result = await service.getCountVehicleParkInPerPeriodByCnpj(cnpj,query);

            expect(repository.getCountVehicleParkInPerPeriodByCnpj).toHaveBeenCalled();
            expect(result).toEqual([mockCountVehicleParkInPerPeriodByCnpj]);
        });
    });

    describe('getFrequencyVehicleCompanyByCnpj',() => {
        it('should return frequency vehicle by cnpj', async () => {
            const cnpj = '000000000000';
            const result = await service.getFrequencyVehicleCompanyByCnpj(cnpj);

            expect(repository.getFrequencyVehicleCompanyByCnpj).toHaveBeenCalled();
            expect(result).toEqual([mockFrequencyVehicleCompanyByCnpj]);
        });
    });

    describe('getCountInParkPerHour',() => {
        it('should return in park per hour', async () => {
            const result = await repository.getCountInParkPerHour();

            expect(repository.getCountInParkPerHour).toHaveBeenCalled();
            expect(result).toEqual([mockCountInParkPerHour]);
        });
    });

    describe('getCountOutParkPerHour',() => {
        it('should return out park per hour', async () => {
            const result = await repository.getCountOutParkPerHour();

            expect(repository.getCountOutParkPerHour).toHaveBeenCalled();
            expect(result).toEqual([mockCountOutParkPerHour]);
        });
    });
});