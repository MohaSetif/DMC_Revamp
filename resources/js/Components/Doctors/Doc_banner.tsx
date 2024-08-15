import { faDollarSign, faMapMarkerAlt, faStar, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

interface Doctor {
    id: number;
    name: string;
    image: string;
    speciality: string;
    work_place: string;
    price: number;
    who: string;
}

const InfoItem: React.FC<{ icon: React.ReactNode; text: string | number }> = ({ icon, text }) => (
    <div className="flex items-end justify-end text-gray-600 dark:text-gray-300 space-x-2">
      <span className="ml-2 text-sm sm:text-base">{text}</span>
      <span>{icon}</span>
    </div>
);

const renderStars = (rating: number, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'} ${interactive ? 'cursor-pointer' : ''}`}
      />
    ));
};

function Doc_banner({doctor, doctor_name, ratings, nbr_votes}:{doctor: Doctor, doctor_name: string, ratings: number, nbr_votes: number}) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative h-48 bg-gradient-to-l from-blue-500 to-purple-600">
        <img
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        </div>
        <div className="px-4 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <div className="relative -mt-24 sm:-mt-32 mb-6 sm:mb-0 sm:ml-8">
            <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full border-[6px] border-white dark:border-gray-900 overflow-hidden">
                <img
                src={`/storage/${doctor.image}`}
                alt={doctor.name}
                className="h-full w-full object-cover"
                />
            </div>
            </div>
            <div className="text-right sm:text-right flex-grow">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {doctor_name}
            </h1>
            <p className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
                {doctor.speciality}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end items-center mb-6 space-x-2">
                <span className="text-xl sm:text-2xl font-bold text-yellow-500">{ratings.toFixed(2)}</span>
                <div className="flex">
                    {renderStars(ratings)}
                </div>
                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-right">({nbr_votes} تقييمات)</span>
            </div>
            <div className="space-y-3 sm:space-y-4">
                <InfoItem icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} text={doctor.work_place} />
                <InfoItem icon={<FontAwesomeIcon icon={faDollarSign} />} text={`${doctor.price} دج`} />
                <InfoItem icon={<FontAwesomeIcon icon={faUserMd} />} text={doctor.who} />
            </div>
            </div>
        </div>
        </div>
        <div className="flex justify-center items-center px-4 sm:px-6 py-4 sm:py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <a href={`/appointments/${doctor.id}`} className="w-96 flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 sm:px-6 rounded-full transition duration-300 ease-in-out transform shadow-md text-sm sm:text-base">
            احجز موعدا
        </a>
        </div>
    </div>
  )
}

export default Doc_banner
