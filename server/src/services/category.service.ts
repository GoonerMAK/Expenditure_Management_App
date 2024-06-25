import * as categoryRepository from '../repositories/category.repository.js';

export const createCategory = async (category_name: string) => {
    try {
        const category = await categoryRepository.createCategory(category_name);
        return category;
    } catch (error) {
        throw new Error(`Failed to create category: ${error}`);
    }
};

export const updateCategory = async (id: string, category_name?: string) => {
    try {
        const updatedCategory = await categoryRepository.updateCategory(id, category_name);
        if (!updatedCategory) {
            throw new Error(`Category with id ${id} not found`);
        }
        return updatedCategory;
    } catch (error) {
        throw new Error(`Failed to update category: ${error}`);
    }
};

export const deleteCategory = async (id: string) => {
    try {
        const deletedCategory = await categoryRepository.deleteCategory(id);
        if (!deletedCategory) {
            throw new Error(`Category with id ${id} not found`);
        }
        return deletedCategory;
    } catch (error) {
        throw new Error(`Failed to delete category: ${error}`);
    }
};

export const getAllCategories = async () => {
    try {
        const categories = await categoryRepository.getAllCategories();
        return categories;
    } catch (error) {
        throw new Error(`Failed to fetch categories: ${error}`);
    }
};

export const getCategoryById = async (id: string) => {
    try {
        const category = await categoryRepository.getCategoryById(id);
        if (!category) {
            throw new Error(`Category with id ${id} not found`);
        }
        return category;
    } catch (error) {
        throw new Error(`Failed to fetch category: ${error}`);
    }
};
