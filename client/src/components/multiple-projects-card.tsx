import { Button } from './ui/button';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';

import { useGetProjectsQuery } from '../redux/project-api';
import { useGetUsersQuery } from '../redux/user-api';


const ShowProjects = () => {
  const { data: projects = [], isLoading: projectsLoading } = useGetProjectsQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();


  function formatDate(dateString: Date | undefined | null) {
    if (!dateString) return 'Not specified';
  
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    const date = new Date(dateString);
  
    return date.toLocaleDateString('en-GB', options);
  }

  if (projectsLoading || usersLoading) {
    return <div>Loading...</div>;
  }


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
      </div>
      <form>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search projects..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
      {projects.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no projects
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start analyzing as soon as you add a project.
            </p>
            <Button className="mt-4">Add Project</Button>
          </div>
        </div>
      ) : (
        <div className="flex grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
          {projects.map((project) => (
            <div key={project.id} className="rounded-lg border shadow-sm p-6">
              <div>
              <h3 className="text-lg font-semibold">{project.project_name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
              <p className="text-sm text-muted-foreground">
                Category: {project.category_name || 'Loading...'}
              </p>
              <p className="text-sm text-muted-foreground">
                Created by: {users.find(user => user.id === project.created_by_id)?.name || 'Loading...'}
              </p>
              <p className="text-sm text-muted-foreground">
                Start Date: {formatDate(project.start_date)}
              </p>
              <p className="text-sm text-muted-foreground">
                Created Date: {formatDate(project.created_at)}
              </p>
              <p className="text-sm text-muted-foreground">
                Updated Date: {formatDate(project.updated_at)}
              </p>
              </div>
              <div className="relative top-4 right-4">
                <Link to={`/projects/${project.id}`}>
                  <Button>View</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ShowProjects;
