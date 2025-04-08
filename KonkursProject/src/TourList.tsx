import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {baseUrl} from "./BaseUrl";


interface Tour {
    ID: number;
    Name: string;
    Image: string;
    Place: string;
    Price: number;
}

const TourList: React.FC = () => {
    const [tours, setTours] = useState<Tour[]>([]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/tours/all`)
            .then((response) => setTours(response.data.result))
            .catch((error) => console.error("Error fetching tours:", error));

    }, []);
    console.log(tours)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (

                <div key={tour.ID} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">


                    <img src={`${baseUrl}${tour.Image}`} alt={tour.Name}
                         className="w-full h-48 object-cover rounded-md"/>
                    <div>{`${baseUrl}/${tour.Image}`}</div>

                    <h3 className="text-xl font-semibold mt-4">{tour.Name}</h3>
                    <p>{tour.Place}</p>
                    <p className="text-lg text-gray-600">Price: ${tour.Price}</p>
                    <Link to={`/tour/${tour.ID}`} className="text-blue-500 hover:underline mt-4 block">View
                        Details</Link>
                </div>
            ))}
        </div>
    );
};

export default TourList;
