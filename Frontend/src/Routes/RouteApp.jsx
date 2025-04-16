import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "../App.css";
import Home from '../Langing/Home';
import Login from '../components/Pages/Login';
import Admin from '../components/Pages/Admin';
// import Splash from '../components/Cursor/Splash';
import Neo from '../components/Cursor/Neo';
import Adminlay from '../components/Layout/Adminlay';
import Dashboard from '../components/Admin/Adminpages/Dashboard';
import Addmember from '../components/Admin/Adminpages/Addmember';
import ClientAtt from '../components/Admin/Adminpages/ClientAtt';
import Equipment from '../components/Admin/Adminpages/Equipment';
import Reports from '../components/Admin/Adminpages/Reports';
import Fees from '../components/Admin/Adminpages/Fees';
import Clientlay from '../components/Layout/Clientlay';
import Attendance from '../components/Client/Clientpages/Attandance';
import Payment from '../components/Client/Clientpages/Payment';
import Addtrainer from '../components/Admin/Adminpages/Addtrainer';
import AProgram from '../components/Admin/Adminpages/AProgram';
import CReports from '../components/Client/Clientpages/CReports';
import Bmicalcu from '../components/Client/Clientpages/Bmicalcu';
import CDashboard from '../components/Client/Clientpages/CDashboard';
import Userdetails from '../components/Client/Clientpages/Userdetails';
import TrainerAtt from '../components/Admin/Adminpages/TrainerAtt';
import Announcement from '../components/Admin/Adminpages/Announcement';
import CAnnouncement from '../components/Client/Clientpages/CAnnouncement';
import About from "../components/Pages/About";

const RouteApp = () => {
    return (
        <>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/about" element={<About />} />

                    {/* Admin Routes */}
                    <Route path="/admindas" element={<Adminlay />}>
                        <Route index element={<Dashboard />} /> 
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path='traineratt' element={<TrainerAtt />} />
                        <Route path="clientatt" element={<ClientAtt />} />
                        <Route path="addmember" element={<Addmember />} />
                        <Route path="addtrainer" element={<Addtrainer />} />
                        <Route path="fees" element={<Fees />} />
                        <Route path="report" element={<Reports />} />
                        <Route path="equip" element={<Equipment />} />
                        <Route path="program" element={<AProgram />} />
                        <Route path="announce" element={<Announcement />} />
                    </Route>

                    {/* Client Routes */}
                    <Route path="/clientdas" element={<Clientlay />}>
                        <Route index element={<CDashboard />} />  
                        <Route path='dashboard' element={<CDashboard />} />  
                        <Route path="editprofile" element={<Userdetails />} />
                        <Route path="attendance" element={<Attendance />} />
                        <Route path="payment" element={<Payment />} />
                        <Route path="report" element={<CReports />} />
                        <Route path="message" element={<CAnnouncement />} />
                        <Route path="bmicalculator" element={<Bmicalcu />} />
                    </Route>
                </Routes>

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    theme="colored"
                    transition={Bounce}
                    draggable
                />
                {/* <Splash /> */}
                <Neo/>
                
            </div>
        </>
    );
};

export default RouteApp;
