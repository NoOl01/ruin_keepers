import "./App.css"
import logo from "./assets/logot.svg"

import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import SignupPopup from "./PopUp.tsx";

import news from "./assets/News.svg"
import axios from "axios";
import {baseUrl} from "./BaseUrl.ts";

interface Point {
    ID: number;
    Name: string;
    Description: string;
    Image: string;
}
interface Sheduled_tour {
    ID: number;
    TourID: number;
    StartAt: string;
    EndAt: string;
    Guide: string;

}

interface Tour {
    ID: number;
    Name: string;
    Description: string;
    Place: string;
    Price: number;
    Image: string;
    Points: Point[];
    Sheduled_tour: Sheduled_tour[];
}
export default function About() {


    const [tour, setTour] = useState<Tour | null>(null);

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/tours/nearestTour`)
            .then((response) => setTour(response.data.result))
            .catch((error) => console.error("Error fetching tour details:", error));
    },[]);

    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="w-full flex flex-col items-center justify-center  bg-white">

                <div className="w-full h-200 backImg"></div>

                <div className="w-full flex flex-col items-center justify-center  relative gap-4 bg-inherit">
                    <h1 className="bg-inherit text-4xl font-bold relative bottom-50">О НАС</h1>
                    <img className="bg-inherit relative bottom-50" src={logo} alt=""/>
                    <p className="text-2xl text-center w-1/3 relative bottom-50 p-10 rounded-4xl shadow-inner">Это независимое волонтерское движение,
                        которое заботится об архитектурном наследии в Калининградской области, а в особенности — о
                        руинах кирх и замков.</p>

                </div>

                <div className="w-full flex flex-col items-center justify-center  relative bottom-50 gap-4 bg-inherit">
                    <h1 className="text-6xl p-10 mt-10">{tour?.Name}</h1>
                    <div className={"flex justify-center items-center gap-8 w-full"}>
                        <img className="w-1/2" src={`${baseUrl}/${tour?.Image}`} alt=""/>
                        <div className="flex justify-center flex-col items-center gap-8 w-1/3">
                            <p className="text-2xl text-center">{tour?.Description}</p>
                            <div className="text-center text-xl">
                                <p>{tour?.Sheduled_tour?.map((tour, index) => (
                                    <span key={index}>{tour.StartAt} - {tour.EndAt}</span>
                                ))}</p>


                            </div>

                            <div className="flex flex-col items-center gap-8 w-full">
                                <button onClick={() => setOpen(true)} className="bg-[#FFCF3F] shadow-inner text-xl rounded-4xl h-20 pr-10 pl-10">Хочу
                                    записаться
                                </button>
                                {open && <SignupPopup onClose={() => setOpen(false)}/>}
                                <Link className="text-center text-xl" to="/moregothring">Подробнее</Link>
                            </div>

                        </div>


                    </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 flex-col">
            <h1 className="text-6xl font-bold text-center">Новости с нами</h1>

                    <img src={news} alt=""/>
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center  relative gap-4 bg-inherit mt-20 mb-20">
                <div className=" rounded-2xl bg-[#FFCD61] shadow-inner w-9/12 p-32 flex justify-center items-start gap-8 flex-col">
                    <h1 className="text-6xl font-bold ">Присоидиняйтесь
                        к хранителям </h1>

                    <Link to="/guides" className="bg-black rounded-4xl text-white p-6">Хочу записаться</Link>
                </div>

            </div>

            <div className="w-300 h-300 absolute top-600 right-370 z-0 bg-inherit from-[#FFCD61] via-inherit rounded-full to-white bg-radial"></div>
        </>
    )
}


