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

const InfoItem: React.FC<{ icon: React.ReactNode; text: string | number }> = ({ icon, text }) => (
  <div className="flex items-end justify-end text-gray-600 dark:text-gray-300 space-x-2">
    <span className="ml-2 text-sm sm:text-base">{text}</span>
    <span>{icon}</span>
  </div>
);

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
      usertype={auth.usertype}
    >
      <Head title={doctor_name} />

      <div className="py-2 rtl">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-4 sm:p-8">
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
                    <span className="text-xl sm:text-2xl font-bold text-yellow-500">{ratings}</span>
                    <div className="flex">
                      {renderStars(ratings)}
                    </div>
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">({totalUser} تقييم)</span>
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
                  
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg mt-8">
            <div className="p-4 sm:p-8">
              <div className="mt-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">الأوقات المتاحة</h2>
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                  <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        {['الجمعة', 'الخميس', 'الأربعاء', 'الثلاثاء', 'الاثنين', 'الأحد', 'السبت'].map((day) => (
                          <th key={day} scope="col" className="px-6 py-3">{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {time ? (
                        <tr className="bg-white dark:bg-gray-900">
                          {['friday', 'thursday', 'wednesday', 'tuesday', 'monday', 'sunday', 'saturday'].map((day) => (
                            <td key={day} className="px-6 py-4">
                              {time[day as keyof Time] ? (
                                <div className="flex items-center justify-end">
                                  <span>{time[day as keyof Time]}</span>
                                  <FontAwesomeIcon icon={faClock} className="text-green-500 ml-2" />
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
              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">التقييمات والتعليقات</h2>
                
                <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-reverse lg:space-x-8">
                  <div className="flex-grow lg:w-2/3">
                    {reviews && reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg ml-4">
                                  {review.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{review.username}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{review.createdAt}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className="text-2xl font-bold text-yellow-500 ml-2">{review.rating.toFixed(1)}</span>
                                <div className="flex">
                                  {renderStars(review.rating)}
                                </div>
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
                    <div className="lg:w-1/3 flex justify-end items-start">
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
    </AuthenticatedLayout>
  );
};

export default Doctor_Profile;