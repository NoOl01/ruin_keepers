import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

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
  points?: TourPoint[];
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
      .get<APIResponse>('../api/v1/tours/nearest')
      .then((response) => {
        if (response.data.status === 'ok' && response.data.data?.tour) {
          setTour(response.data.data.tour);
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
    return <div className="flex justify-center">{error}</div>;
  }

  const formattedPrice = tour?.price ? tour.price.toString().replace(/[^0-9]/g, '') : 'Неизвестная цена';

  const startDate = tour?.start_at ? new Date(tour.start_at) : new Date(); // если start_at не существует, используется текущая дата
  const endDate = tour?.end_at ? new Date(tour.end_at) : new Date(); // аналогично для end_at

  const formattedStartDate = startDate.toLocaleDateString();
  const formattedEndDate = endDate.toLocaleDateString();

  return (
    <div className="flex pt-32 flex-col justify-center items-center bg-white w-full">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold">{tour?.name}</h1>
      </motion.div>

      <div className="flex justify-center w-full">
        <motion.div
          className="w-1/3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={tour?.image} alt="Tour" className="rounded-md shadow-lg" />
        </motion.div>

        <div className="flex w-1/3 flex-col justify-center items-center ml-10 gap-10">
          <motion.p
            className="text-2xl mb-4 p-10 bg-[#F8F8F8] rounded-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {tour?.description}
          </motion.p>

          <motion.div
            className="mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="font-semibold text-lg">Время: {formattedStartDate} - {formattedEndDate}</p>
          </motion.div>

          <motion.div
            className="mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <p className="font-semibold text-lg">Цена: {formattedPrice}</p>
          </motion.div>

          <motion.button
            className="bg-[#FFCF3F] text-black py-4 px-10 rounded-3xl hover:bg-orange-400 transition-colors"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Хочу записаться
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default NearestTour;
