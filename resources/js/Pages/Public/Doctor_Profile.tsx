import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { faClock, faDollarSign, faMapMarkerAlt, faStar, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Doctor {
  id: number;
  name: string;
  image: string;
  speciality: string;
  slug: string;
  work_place: string;
  price: number;
  who: string;
}

interface Time {
  saturday: string | null;
  sunday: string | null;
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
}

interface Review {
  id: number;
  rating: number;
  username: string;
  comment: string;
  createdAt: string;
}

interface Props extends PageProps {
  doctor: Doctor;
  time: Time | null;
  reviews: Review[] | null;
  doctor_name: string;
  ratings: number;
  totalUser: number;
  userHasReview: boolean;
}

const Doctor_Profile: React.FC<Props> = ({ auth, doctor, doctor_name, time, ratings, reviews, totalUser, userHasReview }) => {
  const { data, setData, post, processing, errors } = useForm({
    rating: 0,
    comment: '',
  });

  const renderStars = (rating: number, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'} ${interactive ? 'cursor-pointer' : ''}`}
        onClick={() => interactive && setData('rating', index + 1)}
      />
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('doctor.review', doctor.id), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{doctor_name}</h2>}
    >
      <Head title={doctor_name} />

      <div className="py-2 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <div className="p-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <div className="relative h-0 pb-[125%] md:pb-[150%]">
                      <img 
                        src={`/storage/${doctor.image}`} 
                        alt={doctor_name} 
                        className="absolute inset-0 w-96 h-96 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                      <div className="text-right">
                        <div className="flex justify-between items-start mb-4">
                          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{doctor_name}</h1>
                          <div className="flex items-center bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                            <span className="font-bold text-blue-800 dark:text-blue-200">{Math.round(ratings * 10) / 10}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex text-right items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                            <FontAwesomeIcon icon={faUserMd} className="text-blue-500 text-xl mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">التخصص</p>
                              <p className="font-semibold ml-[6.5rem] text-gray-800 dark:text-gray-200">{doctor.speciality}</p>
                            </div>
                          </div>
                          <div className="flex text-right items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 text-xl mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">مكان العمل</p>
                              <p className="font-semibold text-gray-800 dark:text-gray-200">{doctor.work_place}</p>
                            </div>
                          </div>
                          <div className="flex text-right items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                            <FontAwesomeIcon icon={faDollarSign} className="text-green-500 text-xl mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">سعر الحصة</p>
                              <p className="font-semibold ml-[13rem] text-gray-800 dark:text-gray-200">{doctor.price} دينار</p>
                            </div>
                          </div>
                        </div>
                      </div>

                    <div className="mt-6">
                      <Link
                        href={`/appointments/${doctor.id}`}
                        className="block w-full md:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                      >
                        حجز موعد
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">الأوقات المتاحة</h2>
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day) => (
                          <th key={day} scope="col" className="px-6 py-3">{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {time ? (
                        <tr className="bg-white dark:bg-gray-800">
                          {['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                            <td key={day} className="px-6 py-4">
                              {time[day as keyof Time] ? (
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faClock} className="text-green-500 mr-2" />
                                  <span>{time[day as keyof Time]}</span>
                                </div>
                              ) : (
                                <span className="text-red-500">غير متاح</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ) : (
                        <tr className="bg-white dark:bg-gray-800">
                          <td colSpan={7} className="px-6 py-4 text-center">لا توجد أوقات متاحة</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">التقييمات والتعليقات</h2>
                  
                  <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                    <div className="flex-grow lg:w-2/3">
                      {reviews && reviews.length > 0 ? (
                        <div className="space-y-6">
                          {reviews.map((review) => (
                            <div key={review.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                                    {review.username.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{review.username}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.createdAt}</p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <div className="flex mr-2">
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className="text-2xl font-bold text-yellow-500">{review.rating.toFixed(1)}</span>
                                </div>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">لا توجد تقييمات</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">ابدأ بإضافة تقييم جديد.</p>
                        </div>
                      )}
                    </div>

                    {!userHasReview && (
                      <div className="lg:w-1/3">
                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md">
                          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">أضف تقييمك</h3>
                          <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">التقييم</label>
                              <div className="flex space-x-1">
                                {renderStars(data.rating, true)}
                              </div>
                            </div>
                            <div>
                              <label htmlFor="comment" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">التعليق</label>
                              <textarea
                                id="comment"
                                value={data.comment}
                                onChange={(e) => setData('comment', e.target.value)}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
                                rows={4}
                                placeholder="أخبرنا عن تجربتك..."
                              ></textarea>
                            </div>
                            <button
                              type="submit"
                              disabled={processing}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                            >
                              {processing ? 'جاري الإرسال...' : 'إرسال التقييم'}
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Doctor_Profile;
