import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@/types';

interface Doctor {
  id: number;
  name: string;
  phone: string;
  speciality: string;
  work_place: string;
  price: number;
  who: string;
  image: string;
}

interface PageProps extends InertiaPageProps {
  doctors: Doctor[];
}

function DoctorsList({ auth, doctors }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">أطباؤنا</h2>}
    >
      <Head title="أطباؤنا" />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Doctors List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor: Doctor) => (
            <div key={doctor.id} className="bg-white shadow-md rounded-lg p-6">
              <img
                src={`/storage/${doctor.image}`}
                alt={doctor.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
              <p className="text-gray-600 mb-2">Speciality: {doctor.speciality}</p>
              <p className="text-gray-600 mb-2">Work Place: {doctor.work_place}</p>

              <a href={`/doctors/${doctor.id}`}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition-colors"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default DoctorsList;