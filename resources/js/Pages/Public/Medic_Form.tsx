import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import Toast from '@/Components/Toast';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import medic from "../../../../public/svg/undraw_medical_care_movn.svg"

interface FormData {
  phone: string;
  address: string;
  description: string;
  image: File | null;
}

function Medic_Form({ auth }: PageProps) {
  const [toasts, setToasts] = useState<{ message: string, type: 'success' | 'error' }[]>([]);
  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    phone: '',
    address: '',
    description: '',
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setData(name as keyof FormData, type === 'file' ? files?.[0] || null : value);
  };

  const sendTelegramNotification = async () => {
    const token = '5704695476:AAHMUEHa87c9viRmufJttQDFxTdoQb4vkB4';
    const chatId = '-1001927809781';
    const message = 'يوجد دواء جديد في موقعنا';
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      console.log('Telegram message sent successfully');
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('medications.store'), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: async () => {
        addToast({ message: '.تم الطلب بنجاح , يرجى تفقد صندوق الرسائل من حين لاخر', type: 'success' });
        await sendTelegramNotification();
      },
      onError: () => {
        addToast({ message: '.حدث خطأ، يرجى المحاولة مرة أخرى', type: 'error' });
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

  return (
    <AuthenticatedLayout
      user={auth.user}
      usertype={auth.usertype}
    >
      <Head title="البحث عن دواء" />
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
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <img src={medic} alt="medic_pic" className="w-full h-auto" />
              </div>
              <div className="w-full md:w-1/2 md:pl-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-right">هل تبحث عن دواء ؟</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-right">
                  اذا كنت تبحث عن دواء و لم تجده ما عليك سوى التسجيل
                  و وضع دوائك هنا و سنقوم بالبحث عنه
                  من خلال شبكة تواصلنا مع الصيدليات
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right">رقم الهاتف</label>
                      <TextInput
                        type="text"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <InputError message={errors.phone} className="mt-2" />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right">البلدية</label>
                      <TextInput
                        type="text"
                        id="address"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <InputError message={errors.address} className="mt-2" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right">
                      اسم الدواء مع أي اضافات
                    </label>
                    <TextInput
                      type="text"
                      id="description"
                      name="description"
                      value={data.description}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <InputError message={errors.description} className="mt-2" />
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right">
                      صورة واضحة للوصفة الطبية (ordonnance)
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100"
                    />
                    <InputError message={errors.image} className="mt-2" />
                  </div>

                  <div className="flex justify-end">
                    <PrimaryButton className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={processing}>
                      تأكيد
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Medic_Form;