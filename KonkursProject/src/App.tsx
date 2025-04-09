import './App.css'
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import About from "./About.tsx";
import TourDetail from "./TourDetail.tsx";
import TourList from "./TourList.tsx";
import logo from "./assets/logo.svg";


function App() {

    const handleCopy = () => {
        const phone = '+7 (952) 796-03-92';
        navigator.clipboard.writeText(phone).then(() => {
            alert('Номер скопирован в буфер обмена!');
        });
    }

    return (
        <BrowserRouter>
            <div className="w-full h-20 flex justify-around items-center">
                <div className="flex gap-20 items-center">
                    <img className="size-12" src={logo} alt=""/>

                    <NavLink
                        to="/"
                        className={({isActive}) =>
                                isActive
                                    ? "text-yellow-500 text-2xl border-b-4 border-yellow-400 pb-1"
                                    : "text-black text-2xl"
                            }
                    >
                        О нас
                    </NavLink>

                    <NavLink
                        to="/guides"
                        className={({isActive}) =>
                            isActive
                                ? "text-yellow-500 text-2xl border-b-4 border-yellow-400 pb-1"
                                : "text-black text-2xl"
                        }
                    >
                        Туры
                    </NavLink>
                </div>

                <p className="text-2xl cursor-pointer" onClick={handleCopy}>
                    +7 (952) 796-03-92
                </p>
            </div>

            <Routes>


                <Route path="/" element={<About/>}/>
                <Route path="/guides" element={<TourList/>}/>
                <Route path="/tour/:id" element={<TourDetail/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App
