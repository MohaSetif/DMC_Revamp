import React from 'react';

interface Doctor_Card {
  id: number;
  name: string;
  speciality: string;
  image: string;
}

function ProfileCard({ doctor, doctor_name }: { doctor: Doctor_Card, doctor_name: String }) {
  return (
    <div key={doctor.id} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-md rounded-lg overflow-hidden">
      <div className="relative pb-2/3">
        <img
          src={`/storage/${doctor.image}`}
          alt={doctor.name}
          className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-end mb-4">
          <div className="mr-4">
            <h2 className="text-xl text-gray-500 font-semibold">{doctor_name} :الاسم</h2>
            <p className="text-gray-500 text-sm">الاختصاص: {doctor.speciality}</p>
          </div>
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-blue-500">
            <img
              src={`/storage/${doctor.image}`}
              alt={doctor.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="text-left">
          <a
            href={`/doctors/${doctor.id}`}
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            ...المزيد
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard;