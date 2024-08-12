import * as financialDataService from '../../src/services/financial-data.service.js';
import * as financialDataRepository from '../../src/repositories/financial-data.repository.js';

jest.mock('../../src/repositories/financial-data.repository.js');



describe('Financial Data Service', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });


  describe('createFinancialData', () => {
    it('should create financial data successfully', async () => {
      const data = {
        year: 2024,
        month: 8,
        expenditure: 1234,
        initial_budget: 5123,
        revised_budget: 4123,
        project_id: '1',
        project_name: 'Project A'
      };
      const mockFinancialData = { id: '1', ...data };

      (financialDataRepository.createFinancialData as jest.Mock).mockResolvedValue(mockFinancialData);

      const result = await financialDataService.createFinancialData(
        data.year,
        data.month,
        data.expenditure,
        data.initial_budget,
        data.revised_budget,
        data.project_id,
        data.project_name
      );

      expect(result).toEqual(mockFinancialData);
      expect(financialDataRepository.createFinancialData).toHaveBeenCalledWith(
        data.year,
        data.month,
        data.expenditure,
        data.initial_budget,
        data.revised_budget,
        data.project_id,
        data.project_name
      );
    });

    it('should throw an error if creation fails', async () => {
      (financialDataRepository.createFinancialData as jest.Mock).mockRejectedValue('Database error');

      await expect(financialDataService.createFinancialData(
        2024, 8, 1000, 5000, 4000, '1', 'Project A'
      )).rejects.toThrow('Failed to create financial data: Database error');
    });
  });



  describe('updateFinancialData', () => {
    it('should update financial data successfully', async () => {
      const id = '1';
      const data = {
        year: 2024,
        month: 8,
        expenditure: 2234,
        initial_budget: 5523,
        revised_budget: 4333,
        project_id: '2',
        project_name: 'Project B'
      };
      const mockFinancialData = { id, ...data };

      (financialDataRepository.updateFinancialData as jest.Mock).mockResolvedValue(mockFinancialData);

      const result = await financialDataService.updateFinancialData(
        id,
        data.year,
        data.month,
        data.expenditure,
        data.initial_budget,
        data.revised_budget,
        data.project_id,
        data.project_name
      );

      expect(result).toEqual(mockFinancialData);
      expect(financialDataRepository.updateFinancialData).toHaveBeenCalledWith(
        id,
        data.year,
        data.month,
        data.expenditure,
        data.initial_budget,
        data.revised_budget,
        data.project_id,
        data.project_name
      );
    });

    it('should throw an error if the financial data does not exist', async () => {
      const id = '1';

      (financialDataRepository.updateFinancialData as jest.Mock).mockResolvedValue(null);

      await expect(financialDataService.updateFinancialData(id))
        .rejects
        .toThrow(`Financial data with id ${id} not found`);
    });

    it('should throw an error if update fails', async () => {
      const id = '1';

      (financialDataRepository.updateFinancialData as jest.Mock).mockRejectedValue('Database error');

      await expect(financialDataService.updateFinancialData(id))
        .rejects
        .toThrow('Failed to update financial data: Database error');
    });
  });



  describe('deleteFinancialData', () => {
    it('should delete financial data successfully', async () => {
      const id = '1';
      const mockFinancialData = { id, year: 2024, month: 8 };

      (financialDataRepository.deleteFinancialData as jest.Mock).mockResolvedValue(mockFinancialData);

      const result = await financialDataService.deleteFinancialData(id);

      expect(result).toEqual(mockFinancialData);
      expect(financialDataRepository.deleteFinancialData).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the financial data does not exist', async () => {
      const id = '1';

      (financialDataRepository.deleteFinancialData as jest.Mock).mockResolvedValue(null);

      await expect(financialDataService.deleteFinancialData(id))
        .rejects
        .toThrow(`Financial data with id ${id} not found`);
    });

    it('should throw an error if deletion fails', async () => {
      const id = '1';

      (financialDataRepository.deleteFinancialData as jest.Mock).mockRejectedValue('Database error');

      await expect(financialDataService.deleteFinancialData(id))
        .rejects
        .toThrow('Failed to delete financial data: Database error');
    });
  });



  describe('getAllFinancialData', () => {
    it('should return all financial data successfully', async () => {
      const mockFinancialData = [
        { id: '1', year: 2024, month: 8 },
        { id: '2', year: 2024, month: 9 }
      ];

      (financialDataRepository.getAllFinancialData as jest.Mock).mockResolvedValue(mockFinancialData);

      const result = await financialDataService.getAllFinancialData();

      expect(result).toEqual(mockFinancialData);
      expect(financialDataRepository.getAllFinancialData).toHaveBeenCalled();
    });

    it('should throw an error if fetching financial data fails', async () => {
      (financialDataRepository.getAllFinancialData as jest.Mock).mockRejectedValue('Database error');

      await expect(financialDataService.getAllFinancialData())
        .rejects
        .toThrow('Failed to fetch financial data: Database error');
    });
  });



  describe('getFinancialDataById', () => {
    it('should return financial data by id successfully', async () => {
      const id = '1';
      const mockFinancialData = { id, year: 2024, month: 8 };

      (financialDataRepository.getFinancialDataById as jest.Mock).mockResolvedValue(mockFinancialData);

      const result = await financialDataService.getFinancialDataById(id);

      expect(result).toEqual(mockFinancialData);
      expect(financialDataRepository.getFinancialDataById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the financial data does not exist', async () => {
      const id = '1';

      (financialDataRepository.getFinancialDataById as jest.Mock).mockResolvedValue(null);

      await expect(financialDataService.getFinancialDataById(id))
        .rejects
        .toThrow(`Financial data with id ${id} not found`);
    });

    it('should throw an error if fetching the financial data fails', async () => {
      const id = '1';

      (financialDataRepository.getFinancialDataById as jest.Mock).mockRejectedValue('Database error');

      await expect(financialDataService.getFinancialDataById(id))
        .rejects
        .toThrow('Failed to fetch financial data: Database error');
    });
  });


});
