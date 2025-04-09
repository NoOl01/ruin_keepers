import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import './style.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/navigation";
import axios from "axios";

interface Tour {
    id: number;
    name: string;
    description: string;
    place: string;
    price: number;
    max_members: number;
    image: string;
}

const TourList: React.FC = () => {
    const [tours, setTours] = useState<Tour[]>([]);

    useEffect(() => {
        axios.get("../api/v1/tours").then(r => setTours(r.data.data));
    }, []);

    return (
        <div className=" flex flex-col justify-center items-center gap-8 mt-20">
            <h1 className="text-4xl font-bold">Все туры</h1>
            <div className="w-11/12">
                <Swiper
                    spaceBetween={90}
                    modules={[Navigation]}
                    className="w-11/12 !pl-[40px] !pr-[40px] sm:!pl-[80px] sm:!pr-[80px] min-h-[480px] sm:min-h-[450px] !flex items-center"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            navigation: false,
                        },
                        640: {
                            slidesPerView: 1,
                            navigation: true,
                        },
                        1150: {
                            slidesPerView: 2,
                        },
                        1690: {
                            slidesPerView: 3,
                        },
                    }}>
                    {tours.map((tour, index) => (
                        <SwiperSlide
                            key={tour.id}
                            className="bg-gradient-to-b from-white to-[#FFE1A2] !h-[490px]  md:!h-[430px] lg:!h-[430px] !flex flex-col justify-center items-center gap-8
                            border rounded-lg pt-10 pb-10"
                        >
                            <p className="font-bold text-4xl">{`ТУР ${index + 1}`}</p>
                            <div className="grid grid-cols1 md:grid-cols-2 w-11/12 grid-flow-row-dense">
                                <img className="max-w-40" src={`..${tour.image}`} alt={tour.name}/>
                                <div className="flex flex-col justify-between items-start md:items-end gap-3 text-xl">
                                    <p className="w-[150px] overflow-hidden whitespace-nowrap text-nowrap">цена: {tour.price}</p>
                                    <p className="w-[150px] overflow-hidden whitespace-nowrap text-nowrap">место: {tour.place}</p>
                                </div>
                            </div>
                            <p className="w-[300px] sm:w-[400px] overflow-hidden whitespace-nowrap text-nowrap text-xl sm:text-3xl md:text-4xl h-fit pb-[40px] text-center">{tour.name}</p>
                            <button className="bg-black pl-10 pr-10 pt-2 pb-2 rounded-3xl text-amber-400 text-sm sm:text-xl">хочу записаться</button>
                            <Link to={`/tour/${tour.id}`}>подробнее</Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TourList;
