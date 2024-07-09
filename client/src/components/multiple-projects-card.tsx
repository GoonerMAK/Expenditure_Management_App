import { Button } from './ui/button';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  project_name: string;
  description: string;
  category_id: string;
  start_date: string;
  end_date: string;
  created_by_id: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  category_name: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  age: number | null;
  gender: string | null;
  nationality: string | null;
  role_id: string;
  created_at: string;
  updated_at: string;
}

const ShowProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: Category }>({});
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  const [loading, setLoading] = useState(true);


  function formatDate(dateString: string | undefined | null) {
    if (!dateString) return 'Not specified';
  
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    const date = new Date(dateString);
  
    return date.toLocaleDateString('en-GB', options);
  }
    

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>('http://localhost:4000/api/projects', { withCredentials: true });
        const fetchedProjects = response.data;

        const categoryIds = fetchedProjects.map(project => project.category_id);

        const categoryRequests = categoryIds.map(categoryId =>
          axios.get<Category>(`http://localhost:4000/api/categories/${categoryId}`)
        );

        const categoryResponses = await Promise.all(categoryRequests);
        const fetchedCategories = categoryResponses.reduce((acc, response) => {
          acc[response.data.id] = response.data;
          return acc;
        }, {} as { [key: string]: Category });


        const userIds = fetchedProjects.map(project => project.created_by_id);

        const userRequests = userIds.map(userId =>
          axios.get<User>(`http://localhost:4000/api/users/${userId}`)
        );

        const userResponses = await Promise.all(userRequests);
        const fetchedUsers = userResponses.reduce((acc, response) => {
          acc[response.data.id] = response.data;
          return acc;
        }, {} as { [key: string]: User });

        setProjects(fetchedProjects);
        setCategories(fetchedCategories);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
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
                Category: {categories[project.category_id]?.category_name || 'Loading...'}
              </p>
              <p className="text-sm text-muted-foreground">
                Created by: {users[project.created_by_id]?.name || 'Loading...'}
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
