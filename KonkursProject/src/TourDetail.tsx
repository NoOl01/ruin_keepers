import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


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
                <div className="lg:ml-6 mt-4 lg:mt-0">
                    <h1 className="text-3xl font-semibold">{tour.name}</h1>
                    <p className="text-lg mt-2">{tour.description}</p>
                    <p className="mt-4">Place: {tour.place}</p>
                    <p className="text-xl mt-2">Price: ${tour.price}</p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-8">Points of Interest</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {tour.points.map((point) => (
                    <div key={point.id} className="border rounded-lg p-4 shadow-md">
                        <img src={`${point.image}`} alt={point.name} className="w-full h-48 object-cover rounded-md"/>
                        <h3 className="text-xl font-semibold mt-4">{point.name}</h3>
                        <p>{point.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourDetail;
