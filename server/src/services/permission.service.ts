import * as permissionRepository from '../repositories/permission.repository.js';

export const createPermission = async (permission_name: string) => {
    try {
        const permission = await permissionRepository.createPermission(permission_name);
        return permission;
    } catch (error) {
        throw new Error(`Failed to create permission: ${error}`);
    }
};

export const updatePermission = async (id: string, permission_name?: string) => {
    try {
        const updatedPermission = await permissionRepository.updatePermission(id, permission_name);
        if (!updatedPermission) {
            throw new Error(`Permission with id ${id} not found`);
        }
        return updatedPermission;
    } catch (error) {
        throw new Error(`Failed to update permission: ${error}`);
    }
};

export const deletePermission = async (id: string) => {
    try {
        const deletedPermission = await permissionRepository.deletePermission(id);
        if (!deletedPermission) {
            throw new Error(`Permission with id ${id} not found`);
        }
        return deletedPermission;
    } catch (error) {
        throw new Error(`Failed to delete permission: ${error}`);
    }
};

export const getAllPermissions = async () => {
    try {
        const permissions = await permissionRepository.getAllPermissions();
        return permissions;
    } catch (error) {
        throw new Error(`Failed to fetch permissions: ${error}`);
    }
};

export const getPermissionById = async (id: string) => {
    try {
        const permission = await permissionRepository.getPermissionById(id);
        if (!permission) {
            throw new Error(`Permission with id ${id} not found`);
        }
        return permission;
    } catch (error) {
        throw new Error(`Failed to fetch permission: ${error}`);
    }
};
