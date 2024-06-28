import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

interface Doctor {
  id: number,
  name: string;
  image: string;
  speciality: string;
  slug: string;
  work_place: string;
  price: number;
  who: string;
}

interface Time {
  saturday: string;
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

interface Review {
  rating: number;
  userName: string;
  comment: string;
}

interface Props extends PageProps {
  doctor: Doctor;
  time: Time;
  reviews: Review[];
  averageRating: number;
  totalUser: number;
  userHasReview: boolean;
}

const Doctor_Profile: React.FC<Props> = ({ auth, doctor, time, reviews, averageRating, totalUser, userHasReview }) => {
  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{doctor.name}</h2>}
    >
      <Head title={doctor.name} />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="top_profile card-body text-center">
                <img src={`/storage/${doctor.image}`} alt="doctor_image"
                  className="rounded-circle img-fluid container text-center" style={{ width: '200px', height: '170px' }} />
                <h5 className="my-3">{doctor.name}</h5>
                <p className="text-muted mb-1">{doctor.speciality}</p>
                <div className="d-flex justify-content-center mb-2">
                    <a href={`/command/${doctor.id}`} className="btn bg-success command-btn mx-2">حجز</a>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="nabda card-body p-3">
                <h3 className="text-center" style={{ color: '#F74234' }}>نبذة عن الطبيب</h3>
                <hr />
                <p>{doctor.who}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            {/* Doctor info card */}
            <div className="card mb-4">
              {/* ... (doctor info content) */}
            </div>
            {/* Available time card */}
            <div className="col-md-12">
              {/* ... (available time content) */}
            </div>
            {/* Reviews section */}
            <div className="posts card mb-4 mb-lg-0 my-4">
              {/* ... (reviews content) */}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Doctor_Profile;