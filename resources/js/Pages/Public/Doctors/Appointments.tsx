// resources/js/Pages/DoctorAppointment.tsx

import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import MapComponent from '@/Components/Map';

interface Doctor {
  name: string;
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

interface DoctorAppointmentProps extends PageProps {
  doctor: Doctor;
  time: Time | "";
}

export default function Appointments({ auth, doctor, time }: DoctorAppointmentProps) {
  const { data, setData, post, processing, errors } = useForm({
    doctor: doctor.name,
    name: '',
    age: '',
    phone: '',
    latitude: '',
    longitude: '',
    localisation: '',
    time: '',
    description: '',
  });

  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('command.store'));
  };

  const handleLocationUpdate = (lat: number, lon: number) => {
    setData('latitude', lat.toString());
    setData('longitude', lon.toString());
    setMapCenter([lon, lat]);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">حجز موعد مع الطبيب</h2>}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <InputLabel htmlFor="doctor" value="الطبيب" />
                  <TextInput
                    id="doctor"
                    type="text"
                    name="doctor"
                    value={data.doctor}
                    className="mt-1 block w-full"
                    disabled
                  />
                </div>

                <div>
                  <InputLabel htmlFor="name" value="اسم و لقب المريض" />
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('name', e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="age" value="العمر" />
                  <TextInput
                    id="age"
                    type="text"
                    name="age"
                    value={data.age}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('age', e.target.value)}
                  />
                  <InputError message={errors.age} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="phone" value="رقم الهاتف" />
                  <TextInput
                    id="phone"
                    type="tel"
                    name="phone"
                    value={data.phone}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('phone', e.target.value)}
                  />
                  <InputError message={errors.phone} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="map" value="قم بتحديد موقعك آليا هنا" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <InputLabel htmlFor="latitude" value="خط العرض" />
                    <TextInput
                      id="latitude"
                      type="text"
                      name="latitude"
                      value={data.latitude}
                      className="mt-1 block w-full"
                      onChange={(e) => setData('latitude', e.target.value)}
                    />
                    <InputError message={errors.latitude} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="longitude" value="خط الطول" />
                    <TextInput
                      id="longitude"
                      type="text"
                      name="longitude"
                      value={data.longitude}
                      className="mt-1 block w-full"
                      onChange={(e) => setData('longitude', e.target.value)}
                    />
                    <InputError message={errors.longitude} className="mt-2" />
                  </div>
                </div>

                <div>
                  <InputLabel htmlFor="localisation" value="في حالة لم تعمل الخريطة ضع رابط الموقع هنا الموقع بالتحديد" />
                  <TextInput
                    id="localisation"
                    type="text"
                    name="localisation"
                    value={data.localisation}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('localisation', e.target.value)}
                  />
                  <InputError message={errors.localisation} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="time" value="الوقت الذي يناسبك" />
                  {time === "" ? (
                    <TextInput
                      id="time"
                      type="text"
                      name="time"
                      value={data.time}
                      className="mt-1 block w-full"
                      onChange={(e) => setData('time', e.target.value)}
                    />
                  ) : (
                    <select
                      id="time"
                      name="time"
                      value={data.time}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                      onChange={(e) => setData('time', e.target.value)}
                    >
                      <option value="">اختر الوقت</option>
                      <option value={`السبت : ${time.saturday}`}>السبت : {time.saturday}</option>
                      <option value={`الأحد : ${time.sunday}`}>الأحد : {time.sunday}</option>
                      <option value={`الاثنين : ${time.monday}`}>الاثنين : {time.monday}</option>
                      <option value={`الثلاثاء : ${time.tuesday}`}>الثلاثاء : {time.tuesday}</option>
                      <option value={`الأربعاء : ${time.wednesday}`}>الأربعاء : {time.wednesday}</option>
                      <option value={`الخميس : ${time.thursday}`}>الخميس : {time.thursday}</option>
                      <option value={`الجمعة : ${time.friday}`}>الجمعة : {time.friday}</option>
                    </select>
                  )}
                  <InputError message={errors.time} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="description" value="وصف الحالة" />
                  <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                    rows={3}
                    onChange={(e) => setData('description', e.target.value)}
                  ></textarea>
                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                  <PrimaryButton className="w-full" disabled={processing}>
                    {processing ? 'جاري التأكيد...' : 'تأكيد الطلب'}
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}