import "./App.css"
import subsctract from "./assets/subsctrac.png"
import logot from "./assets/logot.svg"


export default function About(){


    return (
        <>
            <div className="w-full h-full">
                <img className="h-full" src={subsctract} alt=""/>
            </div>

            <div className="w-full bg-inherit justify-center flex">
                <p className="bg-inherit">О нас</p>
                <img  src={logot} alt=""/>
            </div>

        </>

    )
}