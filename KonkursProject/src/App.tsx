
import './App.css'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import About from "./About.tsx";
import Guides from "./Guides.tsx";
import Gallery from "./Gallery.tsx";

function App() {


  return (
    <BrowserRouter>

        <div className="w-full h-20 flex justify-around items-center drop-shadow-2xl">
                <Link className="text-2xl" to={"/"}>О нас</Link>
            <Link className="text-2xl" to={"/guides"}>Гиды</Link>
            <Link className="text-2xl" to={"/gallery"}>Галерея </Link>
            <div className="w-1/2"></div>
            <p className="text-2xl">+7 (952) 796-03-92</p>
        </div>





      <Routes>
        <Route path={"/"} element={<About></About>}></Route>
          <Route path={"/guides"} element={<Guides></Guides>}></Route>
          <Route path={"/gallery"} element={<Gallery></Gallery>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
