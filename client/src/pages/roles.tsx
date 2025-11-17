import Sidebar from '../components/sidebar';
import Header from '../components/header';
import UserRoles from '../components/users-roles';

const Role = () => {

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[300px_1fr]">
      <Sidebar/>
      <div className="flex flex-col">
        <Header/>
        <UserRoles/>
      </div>
    </div>
  );
};

export default Role;
