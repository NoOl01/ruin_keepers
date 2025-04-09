import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Modal from "./Components/Modal.tsx";


interface Point {
    id: number;
    name: string;
    description: string;
    image: string;
}

interface Tour {
    id: number;
    name: string;
    description: string;
    place: string;
    price: number;
    image: string;
    points: Point[];
}

const TourDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [tour, setTour] = useState<Tour | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`../api/v1/tours/${id}`)
            .then((response) => {
                console.log(response.data.data)
                setTour(response.data.data)
            })
            .catch((error) => console.error("Error fetching tour details:", error));
    }, [id]);

    if (!tour) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col lg:flex-row">
                <img src={`${tour.image}`} alt={tour.name} className="w-full lg:w-1/2 h-64 object-cover rounded-md"/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:ml-6 mt-4 lg:mt-0">
                    <div>
                        <h1 className="text-3xl font-semibold">{tour.name}</h1>
                        <p className="text-lg mt-2">{tour.description}</p>
                        <p className="mt-4">Place: {tour.place}</p>
                        <p className="text-xl mt-2">Price: ${tour.price}</p>
                    </div>
                    <div className="ml-0 mt-5 md:ml-10 md:mt-0 lg:ml-20 lg:mt-0">
                        <button onClick={() => setModalOpen(true)} className="bg-black pl-10 pr-10 pt-2 pb-2 rounded-3xl text-amber-400 text-xl cursor-pointer">хочу записаться</button>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-8">Точки интереса</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {tour.points.map((point) => (
                    <div key={point.id} className="border rounded-lg p-4 shadow-md">
                        <img src={`${point.image}`} alt={point.name} className="w-full h-48 object-cover rounded-md"/>
                        <h3 className="text-xl font-semibold mt-4">{point.name}</h3>
                        <p>{point.description}</p>
                    </div>
                ))}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="flex flex-col justify-center items-center gap-8 w-11/12 m-auto">
                    <div className="w-full flex flex-col gap-4">
                        <p>Имя</p>
                        <input className="shadow-lg rounded-3xl w-full p-4" type="text"/>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <p>Почта</p>
                        <input className="shadow-lg rounded-3xl w-full p-4" type="email"/>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <p>Количество участников</p>
                        <input className="shadow-lg rounded-3xl w-full p-4" type="number"/>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <p>Пожелания или вопросы</p>
                        <textarea className="shadow-lg rounded-3xl w-full p-4 h-20 resize-none"/>
                    </div>
                    <div className="w-full flex gap-4">
                        <input type="checkbox"/>
                        <p>Возможность получения обеда</p>
                    </div>
                    <div className="w-full flex gap-4">
                        <input type="checkbox"/>
                        <p>Хотите получать уведомления о новых мероприятиях?</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TourDetail;
