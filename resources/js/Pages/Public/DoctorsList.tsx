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

const DoctorsList: React.FC<PageProps> = ({ auth, doctors }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">أطباؤنا</h2>}
    >
      <Head title="أطباؤنا" />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor: Doctor) => (
            <div key={doctor.id} className="bg-white dark:bg-gray-800 border border-gray-600 shadow-md rounded-lg overflow-hidden">
              <div className="relative pb-2/3">
                <img
                  src={`/storage/${doctor.image}`}
                  alt={doctor.name}
                  className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-[3.75rem] w-16 overflow-hidden rounded-full border-2 border-blue-500">
                    <img
                      src={`/storage/${doctor.image}`}
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{doctor.name}</h2>
                    <p className="text-gray-400 text-right text-sm">Speciality: {doctor.speciality}</p>
                    <p className="text-gray-400 text-right text-sm">Work Place: {doctor.work_place}</p>
                  </div>
                </div>
                <a
                  href={`/doctors/${doctor.id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  تعرف أكثر
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default DoctorsList;
