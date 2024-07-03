import { Button } from './ui/button';
import { Input } from './ui/input';

const ShowProjects = () => {
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
    </main>
  );
};

export default ShowProjects;
