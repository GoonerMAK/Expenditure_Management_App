import * as roleRepository from '../repositories/role.repository.js';

export const createRole = async (role_name: string) => {
    try {
        const role = await roleRepository.createRole(role_name);
        return role;
    } catch (error) {
        throw new Error(`Failed to create role: ${error}`);
    }
};

export const updateRole = async (id: string, role_name?: string) => {
    try {
        const updatedRole = await roleRepository.updateRole(id, role_name);
        if (!updatedRole) {
            throw new Error(`Role with id ${id} not found`);
        }
        return updatedRole;
    } catch (error) {
        throw new Error(`Failed to update role: ${error}`);
    }
};

export const deleteRole = async (id: string) => {
    try {
        const deletedRole = await roleRepository.deleteRole(id);
        if (!deletedRole) {
            throw new Error(`Role with id ${id} not found`);
        }
        return deletedRole;
    } catch (error) {
        throw new Error(`Failed to delete role: ${error}`);
    }
};

export const getAllRoles = async () => {
    try {
        const roles = await roleRepository.getAllRoles();
        return roles;
    } catch (error) {
        throw new Error(`Failed to fetch roles: ${error}`);
    }
};

export const getRoleById = async (id: string) => {
    try {
        const role = await roleRepository.getRoleById(id);
        if (!role) {
            throw new Error(`Role with id ${id} not found`);
        }
        return role;
    } catch (error) {
        throw new Error(`Failed to fetch role: ${error}`);
    }
};
