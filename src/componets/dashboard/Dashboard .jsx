import Sidebar from "./Sidebar";
import Navdashhboard from "./Navdash";
import { Outlet } from "react-router-dom";
import { ResponsiveNav } from "./Sidebar";

function Dashboard() {
    return (
        <div className="dashboard-layout flex">
            <ResponsiveNav /> {/* Mobile menu and sidebar toggle */}
            <Sidebar /> {/* Sidebar remains visible on larger screens */}
            <div className="main-content flex-1">
                <Navdashhboard />
                <Outlet /> {/* This renders HomeScreen, CalculatorScreen, etc. */}
            </div>
        </div>
    );
}

export default Dashboard;
