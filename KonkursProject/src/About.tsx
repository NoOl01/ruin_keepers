import "./App.css"
import logo from "./assets/logot.svg"
import Goth from "./assets/Goth.svg"
import rec from "./assets/rec.svg"
import {Link} from "react-router-dom";
import {useState} from "react";
import SignupPopup from "./PopUp.tsx";
export default function About(){

    const [open, setOpen] = useState(false);
    return (
        <>
       <div className="w-full flex flex-col items-center justify-center  bg-white">

           <div className="w-full h-200 backImg"></div>

            <div className="w-full flex flex-col items-center justify-center  relative gap-4 bg-inherit">
                <h1 className="bg-inherit text-4xl font-bold relative bottom-50">О НАС</h1>
                <img className="bg-inherit relative bottom-50" src={logo} alt=""/>
                <p className="text-2xl text-center w-1/3 relative bottom-50">Это независимое волонтерское движение, которое заботится об архитектурном наследии в Калининградской области, а в особенности — о руинах кирх и замков.</p>

            </div>

           <div className="w-full flex flex-col items-center justify-center  relative bottom-50 gap-4 bg-inherit">
               <img src={Goth} alt=""/>

               <div className={"flex justify-center items-center gap-8 "}>
                   <div className="w-1/3 text-3xl flex flex-col gap-10">
                       <p>
                           В путешествии вы увидите достопримечательности «Готического кольца», познакомитесь с людьми, которые возрождают историческое наследие, услышите много захватывающих рассказов об исторических памятниках, личностях и событиях нашего края, узнаете об идее эстетики руин и работе нашего движения, и, наконец, поймете, почему мы все живем в огромном музее под открытым небом!
                       </p>

                       <p className="font-bold">9:00-19:00</p>
                       <p className="font-bold">Дата: 9 апреля</p>
                       <button  onClick={() => setOpen(true)} className="bg-[#FFCF3F] rounded-4xl h-20">Хочу записаться</button>
                       {open && <SignupPopup onClose={() => setOpen(false)} />}
                       <Link className="text-center" to="/moregothring">Подробнее</Link>
                   </div>
                   <div className="w-1/3">
                       <img src={rec} alt=""/>
                   </div>
               </div>
           </div>



       </div>
        </>
    )
}