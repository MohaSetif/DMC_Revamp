import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import MapComponent from '@/Components/Map2';
import Toast from '@/Components/Toast';

interface DoctorInfo {
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

interface Location {
  lat: number;
  lon: number;
}

interface DoctorAppointmentProps extends PageProps {
  doctor_info: DoctorInfo;
  doctor_id: number;
  time: Time | '';
}

export default function Appointments({ auth, doctor_info, doctor_id, time }: DoctorAppointmentProps) {
  const [toasts, setToasts] = useState<{ message: string, type: 'success' | 'error' }[]>([]);
  const [location, setLocation] = useState<Location>({ lat: 0, lon: 0 });
  const { data, setData, post, processing, errors } = useForm({
    doctor_id: doctor_id,
    user_id: auth.user.id,
    name: '',
    age: '',
    phone: '',
    latitude: 0,
    longitude: 0,
    localisation: '',
    time: '',
    description: '',
  });

  const mapRef = useRef<{ setLocation: (lat: number, lon: number) => void } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('appointment.store'), {
      onSuccess: () => {
        addToast({ message: '.تم الحجز بنجاح، يرجى التحقق من جدول المواعيد', type: 'success' });
      },
      onError: () => {
        addToast({ message: '.حدث خطأ أثناء الحجز، يرجى المحاولة مرة أخرى', type: 'error' });
      }
    });
  };

  const addToast = (toast: { message: string, type: 'success' | 'error' }) => {
    setToasts(prevToasts => {
      if (prevToasts.length >= 3) {
        return [...prevToasts.slice(1), toast];
      }
      return [...prevToasts, toast];
    });
  };

  const removeToast = (index: number) => {
    setToasts(prevToasts => prevToasts.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (lat: number, lon: number) => {
    setData('longitude', lon);
    setData('latitude', lat);
    setLocation({ lat, lon });
  };

  const handleFindLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          setData('latitude', latitude);
          setData('longitude', longitude);
          mapRef.current?.setLocation(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Unable to retrieve your location. ';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'You denied the request for geolocation.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'The request to get user location timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
              break;
          }
          alert(errorMessage + ' Please select manually on the map.');
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocation is not supported by your browser. Please select manually on the map.');
    }
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      usertype={auth.usertype}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">حجز موعد مع الطبيب</h2>}
    >
      <div className="py-12">
        <div className="fixed top-4 right-4 z-50">
          {toasts.map((toast, index) => (
            <Toast
              key={index}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(index)}
            />
          ))}
        </div>
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
                    value={doctor_info.name}
                    className="mt-1 block w-full"
                    disabled
                  />
                </div>

                <div>
                  <InputLabel htmlFor="name" value="اسم ولقب المريض" />
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
                    type="number"
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
                  <MapComponent 
                    ref={mapRef}
                    onLocationSelect={handleLocationSelect}
                    height={500}
                    width={1165}
                    initialLat={location.lat}
                    initialLon={location.lon}
                  />
                  <PrimaryButton type="button" onClick={handleFindLocation} className="mt-4">
                    تحديد الموقع
                  </PrimaryButton>
                  {location.lat !== 0 && location.lon !== 0 && (
                    <p className="mt-2">
                      الموقع المحدد: {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <InputLabel htmlFor="latitude" value="خط العرض" />
                    <TextInput
                      id="latitude"
                      type="number"
                      name="latitude"
                      value={data.latitude}
                      className="mt-1 block w-full"
                      onChange={(e) => setData('latitude', parseFloat(e.target.value))}
                    />
                    <InputError message={errors.latitude} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="longitude" value="خط الطول" />
                    <TextInput
                      id="longitude"
                      type="number"
                      name="longitude"
                      value={data.longitude}
                      className="mt-1 block w-full"
                      onChange={(e) => setData('longitude', parseFloat(e.target.value))}
                    />
                    <InputError message={errors.longitude} className="mt-2" />
                  </div>
                </div>

                <div>
                  <InputLabel htmlFor="localisation" value="في حالة عدم عمل الخريطة، ضع رابط الموقع هنا" />
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
                  <select
                    id="time"
                    name="time"
                    value={data.time}
                    className="mt-1 block w-full text-right border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                    onChange={(e) => setData('time', e.target.value)}
                  >
                    <option value="">اختر الوقت</option>
                    {time && (
                      <>
                        <option value={`السبت : ${time.saturday}`}>السبت : {time.saturday}</option>
                        <option value={`الأحد : ${time.sunday}`}>الأحد : {time.sunday}</option>
                        <option value={`الاثنين : ${time.monday}`}>الاثنين : {time.monday}</option>
                        <option value={`الثلاثاء : ${time.tuesday}`}>الثلاثاء : {time.tuesday}</option>
                        <option value={`الأربعاء : ${time.wednesday}`}>الأربعاء : {time.wednesday}</option>
                        <option value={`الخميس : ${time.thursday}`}>الخميس : {time.thursday}</option>
                        <option value={`الجمعة : ${time.friday}`}>الجمعة : {time.friday}</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <InputLabel htmlFor="description" value="وصف الحالة" />
                  <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 text-black dark:text-white dark:bg-gray-900 rounded-md block w-full"
                    rows={3}
                    onChange={(e) => setData('description', e.target.value)}
                  ></textarea>
                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                  <PrimaryButton className="w-28" disabled={processing}>
                    {processing ? 'جارٍ التأكيد...' : 'تأكيد الطلب'}
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
