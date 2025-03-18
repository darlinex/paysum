import Sidebar from "./Sidebar";
import Navdashhboard from "./Navdash";
import { Outlet } from "react-router-dom";

function Dashboard() {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Navdashhboard />
                <Outlet /> {/* This renders HomeScreen, CalculatorScreen, etc. */}
            </div>
        </div>
    );
}

export default Dashboard;
