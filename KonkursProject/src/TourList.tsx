import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import './style.css';

interface Tour {
    ID: number;
    Name: string;
    Image: string;
    Place: string;
    Price: number;
}

const TourList: React.FC = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    useEffect((): void => {
        const mockTours: Tour[] = [
            {
                ID: 1,
                Name: 'dwadafwgfa',
                Image: 'dawdawgfea',
                Place: 'jklfawlkjfaw',
                Price: 500,
            },
            {
                ID: 2,
                Name: 'r32gers',
                Image: 'kugdjthsge',
                Place: '2t3hrthjdt',
                Price: 3333,
            },
            {
                ID: 3,
                Name: '3gwae5',
                Image: 'afwe451313r',
                Place: 'jklfawlkjfaw',
                Price: 53313,
            },
            {
                ID: 4,
                Name: '12498yiudafwgfa',
                Image: 'fakhjofea',
                Place: '423891ilhufaw',
                Price: 501240,
            }
        ]
        setTours(mockTours);
    }, [])

    return (
        <div className=" flex flex-col justify-center items-center gap-8 mt-20">
            <h1 className="text-4xl font-bold">Все туры</h1>
            <div className="w-11/12">
                <Swiper
                    navigation={true}
                    slidesPerView={3}
                    spaceBetween={90}
                    modules={[Navigation]}
                    className="w-11/12 !pl-[80px] !pr-[80px] min-h-[450px] !flex items-center">
                    {tours.map((tour, index) => (
                        <SwiperSlide
                            key={tour.ID}
                            className="bg-gradient-to-b from-white to-[#FFE1A2] !h-[430px] !flex flex-col justify-center items-center gap-8
                            border rounded-lg p-4 pt-10 pb-10"
                        >
                            <p className="font-bold text-4xl">{`ТУР ${index + 1}`}</p>
                            <div className="flex justify-between w-10/12">
                                <img src={tour.Image} alt={tour.Name}/>
                                <div className="flex flex-col justify-between gap-3 text-xl">
                                    <p>цена: {tour.Price}</p>
                                    <p>место: {tour.Place}</p>
                                    <p>время: {tour.Price}</p>
                                </div>
                            </div>
                            <p className="text-4xl">{tour.Name}</p>
                            <Link to={`tour/${tour.ID}`} className="bg-black pl-10 pr-10 pt-2 pb-2 rounded-3xl text-amber-400 text-xl">хочу записаться</Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TourList;
