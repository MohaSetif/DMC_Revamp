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
          <div className="col-lg-8">
            <div className="card mb-4">
                <div className="card-body">
                  <div className="profile_info row">
                    <div className="col-sm-3">
                      <p className="mb-0">الاسم</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {doctor.name}
                      </p>
                    </div>
                  </div>
                  <hr/>
                  <div>
                    <div className="col-sm-3">
                      <p className="mb-0">مكان العمل</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{doctor.work_place} </p>
                    </div>
                  </div>
                  <hr/>
                  <div>
                    <div className="col-sm-3">
                      <p className="mb-0">سعر الحصة</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"> {doctor.price}</p>
                    </div>
                  </div>
                </div>
            <div className="col-md-12">
                {/* <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4"><span className="time  font-italic me-1">الوقت المتاح</span>
                      </p>
                      
                      <div className="table-responsive">
                            <table className="table ">
                              <thead>
                                <tr>
                                  <th>السبت</th>
                                  <th>الأحد</th>
                                  <th>الاثنين</th>
                                  <th>الثلاثاء</th>
                                  <th>الأربعاء</th>
                                  <th>الخميس</th>
                                  <th>الجمعة</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                @if($time== '')
                                  <h3>لا توجد أوقات متاحة</h3>
                                @else
                                  <td>{time.saturday}</td>
                                  <td>{time.sunday}</td>
                                  <td>{time.monday}</td>
                                  <td>{time.tuesday}</td>
                                  <td>{time.wednesday}</td>
                                  <td>{time.thursday}</td>
                                  <td>{time.friday}</td>
                                @endif
                                </tr>
                             </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
            </div>
            {/* Reviews section */}
            <div className="posts card mb-4 mb-lg-0 my-4">
              {/* ... (reviews content) */}
            </div>
            <div className="d-flex justify-content-center mb-2">
                <a href={`/appointments/${doctor.id}`} className="bg-red-600 border border-red-500 text-white px-4 mx-2">حجز</a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Doctor_Profile;