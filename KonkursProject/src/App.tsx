
import './App.css'
import {BrowserRouter, Routes, Route, NavLink, Navigate} from "react-router-dom";
import About from "./About.tsx";

import Gallery from "./Gallery.tsx";
import MoreGothRing from "./MoreGothRing.tsx";

import AdminLogin from "./Admin/AdminLogin.tsx";
import AdminDashboard from "./Admin/AdminDashboard.tsx";
import AdminChangePassword from "./Admin/AdminChangePassword.tsx";
import AdminDelete from "./Admin/AdminDelete.tsx";
import AdminRegister from "./Admin/AdminRegister.tsx";
import AdminCreateTour from "./Admin/AdminCreateTour.tsx";

import TourDetail from "./TourDetail.tsx";
import TourList from "./TourList.tsx";




function App() {
    const token = localStorage.getItem("token")


    return (
        <BrowserRouter>
            <div className="w-full h-20 flex justify-around items-center drop-shadow-2xl">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-500 text-2xl border-b-4 border-yellow-400 pb-1"
                            : "text-black text-2xl"
                    }
                >
                    О нас
                </NavLink>

                <NavLink
                    to="/guides"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-500 text-2xl border-b-4 border-yellow-400 pb-1"
                            : "text-black text-2xl"
                    }
                >
                    Туры
                </NavLink>

                <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-500 text-2xl border-b-4 border-yellow-400 pb-1"
                            : "text-black text-2xl"
                    }
                >
                    Галерея
                </NavLink>

                <div className="w-1/2"></div>
                <p className="text-2xl">+7 (952) 796-03-92</p>
            </div>

            <Routes>

                <Route path="/admin" element={<AdminLogin />} />
                {token ? (
                    <>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/register" element={<AdminRegister />} />
                        <Route path="/admin/change-password" element={<AdminChangePassword />} />
                        <Route path="/admin/delete" element={<AdminDelete />} />
                        <Route path="/admin/tours/create" element={<AdminCreateTour />} />
                        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/admin/login" />} />
                )}



                <Route path="/" element={<About />} />
                <Route path="/guides" element={<TourList/>} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/moregothring" element={<MoreGothRing />} />
                <Route path="/tour/:id" element={<TourDetail />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App
