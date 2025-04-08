import "./App.css"
import subsctract from "./assets/subsctrac.png"
import logot from "./assets/logot.svg"
import NearestTour from "./Components/NearestTour.tsx";



export default function About() {
    return (
        <div className="relative w-full overflow-hidden bg-white">


            <img className="w-full h-auto object-cover" src={subsctract} alt="" />


            <div className="absolute top-[900px] left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10 text-center px-10 pt-40 max-w-xl w-full">
                <p className="font-bold text-3xl md:text-4xl mb-4">О НАС</p>
                <img src={logot} alt="логотип" className="mx-auto  mb-1" />
                <p className=" md:text-lg leading-relaxed text-xl">
                    это независимое волонтёрское движение, которое заботится об архитектурном наследии
                    в Калининградской области, а в особенности — о руинах кирх и замков.
                </p>
            </div>


            <div className="relative z-10 mt-[200px] text-center">
                <p className="text-xl">Ближайшее Событие</p>
            </div>
            <div className="w-120 h-120 bg-purple-200 absolute top-[1300px] -right-64 z-50 rounded-full Circle" >

            </div>
            <NearestTour></NearestTour>
        </div>
    );
}
