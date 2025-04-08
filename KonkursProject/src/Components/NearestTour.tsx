import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface APIResponse {
  status: string;
  data: {
    tour: NearestTourData;
  };
  message: string | null;
}

interface NearestTourData {
  name: string;
  description: string;
  place: string;
  price: number;
  max_members: number;
  image: string;
  start_at: string;
  end_at: string;
  points?: TourPoint[];  // Делаем поле points необязательным
}

interface TourPoint {
  name: string;
  image: string;
}

const NearestTour: React.FC = () => {
  const [tour, setTour] = useState<NearestTourData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
        .get<APIResponse>('../api/v1/tours/nearest')  // Убедитесь, что API-адрес правильный
        .then((response) => {
          if (response.data.status === 'ok' && response.data.data?.tour) {
            setTour(response.data.data.tour);  // Извлекаем данные из tour
            setLoading(false);
          } else {
            setError('Ошибка при получении данных');
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Ошибка при получении данных о туре');
          setLoading(false);
        });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Форматируем цену
  const formattedPrice = tour?.price ? tour.price.toString().replace(/[^0-9]/g, '') : 'Неизвестная цена';

  // Форматируем даты
const startDate = tour?.start_at ? new Date(tour.start_at) : new Date(); // если start_at не существует, используется текущая дата
const endDate = tour?.end_at ? new Date(tour.end_at) : new Date(); // аналогично для end_at

  const formattedStartDate = startDate.toLocaleDateString();
  const formattedEndDate = endDate.toLocaleDateString();


 return (
  <div className="flex pt-32 flex-col justify-center items-center bg-white w-full">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold">{tour?.name}</h1>
    </div>

    <div className="flex justify-center w-full">
      <div className="w-1/3">
        <img src={tour?.image} alt="Tour" className="rounded-md shadow-lg"/>
      </div>

      <div className="flex w-2/3 flex-col justify-center items-start ml-10">
        <p className="text-lg mb-4">{tour?.description}</p>

        <div className="mb-2">
          <p className="font-semibold text-lg">Время: {formattedStartDate} - {formattedEndDate}</p>
        </div>
        <div className="mb-2">
          <p className="font-semibold text-lg">Цена: {formattedPrice}</p>
        </div>
      </div>
    </div>

    <div className="mt-8">
      <button className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-400 transition-colors">
        Хочу записаться
      </button>
    </div>
  </div>
);
};

export default NearestTour;
// <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto flex">
//   {/* Левая часть с картинкой */}
//   <div className="w-1/2 pr-4">
//     <img src={tour?.image} alt="Tour" className="w-full h-full object-cover rounded-lg"/>
//   </div>
//
//   {/* Правая часть с текстом и кнопками */}
//   <div className="w-1/2 pl-4 flex flex-col justify-between">
//     <h2 className="text-3xl font-semibold mb-4">{tour?.name}</h2>
//     <p className="text-lg text-gray-600 mb-6">{tour?.description}</p>
//
//     <div className="mb-4">
//       <p className="text-md text-gray-500">Place: {tour?.place}</p>
//       <p className="text-md text-gray-500">Price: ${formattedPrice}</p>
//       <p className="text-md text-gray-500">Max Participants: {tour?.max_members}</p>
//       <p className="text-md text-gray-500">
//         Dates: {formattedStartDate} - {formattedEndDate}
//       </p>
//     </div>
//
//     <div className="flex justify-between">
//       <button className="bg-yellow-400 text-white py-2 px-6 rounded-lg shadow-md hover:bg-yellow-500">
//         Записаться
//       </button>
//       <button
//           className="bg-transparent border-2 border-yellow-400 text-yellow-400 py-2 px-6 rounded-lg shadow-md hover:bg-yellow-400 hover:text-white">
//         Подробнее
//       </button>
//     </div>
//   </div>
// </div>