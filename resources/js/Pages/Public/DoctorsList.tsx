import React, { Suspense } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@/types';
import Loader from '@/Components/ui/Loader';
import ProfileCard from '@/Components/ui/ProfileCard';

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
  doctorNames: String[];
}

const DoctorsList: React.FC<PageProps> = ({ auth, doctors, doctorNames }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      usertype={auth.usertype}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">أطباؤنا</h2>}
    >
      <Head title="أطباؤنا" />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-2">
          {doctors.map((doctor: Doctor, index) => (
            <Suspense key={doctor.id} fallback={<Loader />}>
              <ProfileCard doctor={doctor} doctor_name={doctorNames[index]} />
            </Suspense>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DoctorsList;
