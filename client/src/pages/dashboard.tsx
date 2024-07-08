import Sidebar from '../components/sidebar';
import Header from '../components/header';
import MultipleProjectsCard from '../components/multiple-projects-card';


const Dashboard = () => {

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[300px_1fr]">
      <Sidebar/>
      <div className="flex flex-col">
        <Header/>
        <MultipleProjectsCard/>
      </div>
    </div>
  );
};

export default Dashboard;
