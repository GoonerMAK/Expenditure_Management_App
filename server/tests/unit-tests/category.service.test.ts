import * as categoryService from '../../src/services/category.service.js';
import * as categoryRepository from '../../src/repositories/category.repository.js';

jest.mock('../../src/repositories/category.repository.js');

describe('Category Service', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });



  describe('createCategory', () => {
    it('should create a category successfully', async () => {
      const category_name = 'New Category';
      const mockCategory = { id: '1', category_name };

      (categoryRepository.createCategory as jest.Mock).mockResolvedValue(mockCategory);

      const result = await categoryService.createCategory(category_name);

      expect(result).toEqual(mockCategory);
      expect(categoryRepository.createCategory).toHaveBeenCalledWith(category_name);
    });

    it('should throw an error if the creation fails', async () => {
      const category_name = 'New Category';
      (categoryRepository.createCategory as jest.Mock).mockRejectedValue('Database error');

      await expect(categoryService.createCategory(category_name))
        .rejects
        .toThrow('Failed to create category: Database error');
    });
  });



  describe('updateCategory', () => {
    it('should update a category successfully', async () => {
      const id = '1';
      const category_name = 'Updated Category';
      const mockCategory = { id, category_name };

      (categoryRepository.updateCategory as jest.Mock).mockResolvedValue(mockCategory);

      const result = await categoryService.updateCategory(id, category_name);

      expect(result).toEqual(mockCategory);
      expect(categoryRepository.updateCategory).toHaveBeenCalledWith(id, category_name);
    });

    it('should throw an error if the category does not exist', async () => {
      const id = '1';
      const category_name = 'Updated Category';

      (categoryRepository.updateCategory as jest.Mock).mockResolvedValue(null);

      await expect(categoryService.updateCategory(id, category_name))
        .rejects
        .toThrow(`Category with id ${id} not found`);
    });

    it('should throw an error if the update fails', async () => {
      const id = '1';
      const category_name = 'Updated Category';

      (categoryRepository.updateCategory as jest.Mock).mockRejectedValue('Database error');

      await expect(categoryService.updateCategory(id, category_name))
        .rejects
        .toThrow('Failed to update category: Database error');
    });
  });



  describe('deleteCategory', () => {
    it('should delete a category successfully', async () => {
      const id = '1';
      const mockCategory = { id, category_name: 'Deleted Category' };

      (categoryRepository.deleteCategory as jest.Mock).mockResolvedValue(mockCategory);

      const result = await categoryService.deleteCategory(id);

      expect(result).toEqual(mockCategory);
      expect(categoryRepository.deleteCategory).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the category does not exist', async () => {
      const id = '1';

      (categoryRepository.deleteCategory as jest.Mock).mockResolvedValue(null);

      await expect(categoryService.deleteCategory(id))
        .rejects
        .toThrow(`Category with id ${id} not found`);
    });

    it('should throw an error if the deletion fails', async () => {
      const id = '1';

      (categoryRepository.deleteCategory as jest.Mock).mockRejectedValue('Database error');

      await expect(categoryService.deleteCategory(id))
        .rejects
        .toThrow('Failed to delete category: Database error');
    });
  });



  describe('getAllCategories', () => {
    it('should return all categories successfully', async () => {
      const mockCategories = [
        { id: '1', category_name: 'Category a' },
        { id: '2', category_name: 'Category b' }
      ];

      (categoryRepository.getAllCategories as jest.Mock).mockResolvedValue(mockCategories);

      const result = await categoryService.getAllCategories();

      expect(result).toEqual(mockCategories);
      expect(categoryRepository.getAllCategories).toHaveBeenCalled();
    });

    it('should throw an error if fetching categories fails', async () => {
      (categoryRepository.getAllCategories as jest.Mock).mockRejectedValue('Database error');

      await expect(categoryService.getAllCategories())
        .rejects
        .toThrow('Failed to fetch categories: Database error');
    });
  });



  describe('getCategoryById', () => {
    it('should return a category by id successfully', async () => {
      const id = '1';
      const mockCategory = { id, category_name: 'Category a' };

      (categoryRepository.getCategoryById as jest.Mock).mockResolvedValue(mockCategory);

      const result = await categoryService.getCategoryById(id);

      expect(result).toEqual(mockCategory);
      expect(categoryRepository.getCategoryById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the category does not exist', async () => {
      const id = '1';

      (categoryRepository.getCategoryById as jest.Mock).mockResolvedValue(null);

      await expect(categoryService.getCategoryById(id))
        .rejects
        .toThrow(`Category with id ${id} not found`);
    });

    it('should throw an error if fetching the category fails', async () => {
      const id = '1';

      (categoryRepository.getCategoryById as jest.Mock).mockRejectedValue('Database error');

      await expect(categoryService.getCategoryById(id))
        .rejects
        .toThrow('Failed to fetch category: Database error');
    });
  });


});
