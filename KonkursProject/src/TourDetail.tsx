import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Point {
    ID: number;
    Name: string;
    Description: string;
    Image: string;
}

interface Tour {
    ID: number;
    Name: string;
    Description: string;
    Place: string;
    Price: number;
    Image: string;
    Points: Point[];
}

const TourDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [tour, setTour] = useState<Tour | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/tours/tourById?id=${id}`)
            .then((response) => setTour(response.data.result))
            .catch((error) => console.error("Error fetching tour details:", error));
    }, [id]);

    if (!tour) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col lg:flex-row">
                <img src={`http://localhost:8080${tour.Image}`} alt={tour.Name} className="w-full lg:w-1/2 h-64 object-cover rounded-md" />
                <div className="lg:ml-6 mt-4 lg:mt-0">
                    <h1 className="text-3xl font-semibold">{tour.Name}</h1>
                    <p className="text-lg mt-2">{tour.Description}</p>
                    <p className="mt-4">Place: {tour.Place}</p>
                    <p className="text-xl mt-2">Price: ${tour.Price}</p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-8">Points of Interest</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {tour.Points.map((point) => (
                    <div key={point.ID} className="border rounded-lg p-4 shadow-md">
                        <img src={`http://localhost:8080${point.Image}`} alt={point.Name} className="w-full h-48 object-cover rounded-md" />
                        <h3 className="text-xl font-semibold mt-4">{point.Name}</h3>
                        <p>{point.Description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourDetail;
