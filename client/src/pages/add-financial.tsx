import AddFinancialForm from "../components/add-financial-form";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const AddFinancial = () => {

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[300px_1fr]">
          <Sidebar/>
          <div className="flex flex-col">
            <Header/>
            <AddFinancialForm/>
          </div>
        </div>
    );
}

export default AddFinancial;
