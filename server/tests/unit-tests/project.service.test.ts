import * as projectService from '../../src/services/project.service.js';
import * as projectRepository from '../../src/repositories/project.repository.js';

jest.mock('../../src/repositories/project.repository.js');


describe('Project Service', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });



  describe('createProject', () => {
    it('should create a project successfully', async () => {
      const data = {
        project_name: 'New Project',
        description: 'Project Description',
        category_id: 'cat-1',
        category_name: 'Category A',
        start_date: new Date('2024-08-01'),
        end_date: new Date('2024-12-31'),
        created_by_id: 'user-1'
      };
      const mockProject = { id: '1', ...data };

      (projectRepository.createProject as jest.Mock).mockResolvedValue(mockProject);

      const result = await projectService.createProject(
        data.project_name,
        data.description,
        data.category_id,
        data.category_name,
        data.start_date,
        data.end_date,
        data.created_by_id
      );

      expect(result).toEqual(mockProject);
      expect(projectRepository.createProject).toHaveBeenCalledWith(
        data.project_name,
        data.description,
        data.category_id,
        data.category_name,
        data.start_date,
        data.end_date,
        data.created_by_id
      );
    });

    it('should throw an error if creation fails', async () => {
      (projectRepository.createProject as jest.Mock).mockRejectedValue('Database error');

      await expect(projectService.createProject(
        'New Project', 'Project Description', 'cat-1', 'Category A', new Date(), new Date(), 'user-1'
      )).rejects.toThrow('Failed to create project: Database error');
    });
  });



  describe('updateProject', () => {
    it('should update a project successfully', async () => {
      const id = '1';
      const data = {
        project_name: 'Updated Project',
        description: 'Updated Description',
        category_id: 'cat-2',
        category_name: 'Category B',
        start_date: new Date('2024-09-01'),
        end_date: new Date('2025-01-01'),
        created_by_id: 'user-2'
      };
      const mockProject = { id, ...data };

      (projectRepository.updateProject as jest.Mock).mockResolvedValue(mockProject);

      const result = await projectService.updateProject(
        id,
        data.project_name,
        data.description,
        data.category_id,
        data.category_name,
        data.start_date,
        data.end_date,
        data.created_by_id
      );

      expect(result).toEqual(mockProject);
      expect(projectRepository.updateProject).toHaveBeenCalledWith(
        id,
        data.project_name,
        data.description,
        data.category_id,
        data.category_name,
        data.start_date,
        data.end_date,
        data.created_by_id
      );
    });

    it('should throw an error if the project does not exist', async () => {
      const id = '1';

      (projectRepository.updateProject as jest.Mock).mockResolvedValue(null);

      await expect(projectService.updateProject(id))
        .rejects
        .toThrow(`Project with id ${id} not found`);
    });

    it('should throw an error if update fails', async () => {
      const id = '1';

      (projectRepository.updateProject as jest.Mock).mockRejectedValue('Database error');

      await expect(projectService.updateProject(id))
        .rejects
        .toThrow('Failed to update project: Database error');
    });
  });



  describe('deleteProject', () => {
    it('should delete a project successfully', async () => {
      const id = '1';
      const mockProject = { id, project_name: 'Deleted Project' };

      (projectRepository.deleteProject as jest.Mock).mockResolvedValue(mockProject);

      const result = await projectService.deleteProject(id);

      expect(result).toEqual(mockProject);
      expect(projectRepository.deleteProject).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the project does not exist', async () => {
      const id = '1';

      (projectRepository.deleteProject as jest.Mock).mockResolvedValue(null);

      await expect(projectService.deleteProject(id))
        .rejects
        .toThrow(`Project with id ${id} not found`);
    });

    it('should throw an error if deletion fails', async () => {
      const id = '1';

      (projectRepository.deleteProject as jest.Mock).mockRejectedValue('Database error');

      await expect(projectService.deleteProject(id))
        .rejects
        .toThrow('Failed to delete project: Database error');
    });
  });



  describe('getAllProjects', () => {
    it('should return all projects successfully', async () => {
      const mockProjects = [
        { id: '1', project_name: 'Project A' },
        { id: '2', project_name: 'Project B' }
      ];

      (projectRepository.getAllProjects as jest.Mock).mockResolvedValue(mockProjects);

      const result = await projectService.getAllProjects();

      expect(result).toEqual(mockProjects);
      expect(projectRepository.getAllProjects).toHaveBeenCalled();
    });

    it('should throw an error if fetching projects fails', async () => {
      (projectRepository.getAllProjects as jest.Mock).mockRejectedValue('Database error');

      await expect(projectService.getAllProjects())
        .rejects
        .toThrow('Failed to fetch projects: Database error');
    });
  });



  describe('getProjectById', () => {
    it('should return project by id successfully', async () => {
      const id = '1';
      const mockProject = { id, project_name: 'Project A' };

      (projectRepository.getProjectById as jest.Mock).mockResolvedValue(mockProject);

      const result = await projectService.getProjectById(id);

      expect(result).toEqual(mockProject);
      expect(projectRepository.getProjectById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the project does not exist', async () => {
      const id = '1';

      (projectRepository.getProjectById as jest.Mock).mockResolvedValue(null);

      await expect(projectService.getProjectById(id))
        .rejects
        .toThrow(`Project with id ${id} not found`);
    });

    it('should throw an error if fetching the project fails', async () => {
      const id = '1';

      (projectRepository.getProjectById as jest.Mock).mockRejectedValue('Database error');

      await expect(projectService.getProjectById(id))
        .rejects
        .toThrow('Failed to fetch project: Database error');
    });
  });

  
});
