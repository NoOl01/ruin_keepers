import "./App.css";
import subsctract from "./assets/subsctrac.png";
import logot from "./assets/logot.svg";
import NearestTour from "./Components/NearestTour.tsx";
import news from "./assets/News.svg";
import {useState, useEffect} from "react";
import {motion} from "framer-motion";


const LoadingSpinner = () => (
    <div className="spinner">
        <div className="lds-dual-ring"></div>
    </div>
);

export default function About() {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="relative w-full overflow-hidden bg-white">
            <motion.img
                className="w-full h-auto object-cover"
                src={subsctract}
                alt=""
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1.5}}
            />

            <div
                className="absolute top-[900px] left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10 text-center px-10 pt-40 max-w-xl w-full">
                <motion.p
                    className="font-bold text-3xl md:text-4xl mb-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, delay: 1}}
                >
                    О НАС
                </motion.p>
                <motion.img
                    src={logot}
                    alt="логотип"
                    className="mx-auto mb-1"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 1, delay: 1.5}}
                />
                <motion.p
                    className="md:text-lg leading-relaxed text-xl"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, delay: 2}}
                >
                    это независимое волонтёрское движение, которое заботится об архитектурном наследии
                    в Калининградской области, а в особенности — о руинах кирх и замков.
                </motion.p>
            </div>

            <motion.div
                className="relative z-10 mt-[300px] text-center"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1, delay: 2.5}}
            >
                <p className="text-4xl font-bold">Ближайшее Событие</p>
            </motion.div>

            <motion.div
                className="w-120 h-120 bg-purple-200 absolute top-[1300px] -right-64 z-50 rounded-full Circle"
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{duration: 2, delay: 2.8}}
            ></motion.div>

            <motion.div
                className="w-220 h-220 bg-purple-200 absolute top-[2300px] -left-160 z-50 rounded-full Circle"
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{duration: 2, delay: 3.2}}
            ></motion.div>

            <NearestTour/>

            <motion.div
                className="w-full flex justify-center flex-col items-center mt-24"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1, delay: 3.5}}
            >
                <h2 className="text-6xl font-extrabold">НОВОСТИ С НАМИ</h2>

                <motion.img
                    src={news}
                    className="mt-20"
                    alt=""
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, delay: 4}}
                />
            </motion.div>

            <div className="w-full flex h-80 justify-center items-center mt-20">
                <div className="w-1/2 h-full bg-[#FFCD61] ">
                    <p className="font-extrabold text-4xl">Присоидиняйтесь
                        к хранителям </p>
                </div>
            </div>

        </div>
    );
}
