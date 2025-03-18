
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './componets/landingpage/Landingpage';
// import {  toast } from 'react-toastify';
import ReactDOM from "react-dom/client";
import Login from './componets/authentication/Login';
import Layout from './componets/Layout/Layout';
import Register from './componets/authentication/Register';
import Loader from './componets/loader/Loader';
import Dashboard from './componets/dashboard/Dashboard ';
import Demo from './componets/request/Demo';
import Thankyoupage from './componets/request/Thanks';
import Otp from './componets/authentication/Otp';
import HomeScreen from './componets/dashboard/home';
import CalculatorScreen from './componets/dashboard/Calculator';
import AllEmployees from './componets/dashboard/AllEmployees';


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/" element={<Layout />}>
          <Route path="demo" element={<Demo />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<HomeScreen />} />
          <Route path="calculator" element={<CalculatorScreen />} />
          <Route path="allemployees" element={<AllEmployees />} />
        </Route>
        <Route path="/demo" element={<Demo />} />
        <Route path="/thanks" element={<Thankyoupage />} />
        <Route path="/otp/:email" element={<Otp />} />


      </Routes>

    </BrowserRouter>
  )
}

export default App



//  Nested routes inside Layout
//  <Route element={<Layout />;

//   <Route path="/demo" element={<Demo />} />
// </Route>