
import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import About from "./About.tsx";
import Guides from "./Guides.tsx";
import Gallery from "./Gallery.tsx";
import MoreGothRing from "./MoreGothRing.tsx";
import Admin from "./Admin.tsx";

function App() {


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
                <Route path="/" element={<About />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/moregothring" element={<MoreGothRing />} />
                <Route path="/admin" element={<Admin/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
