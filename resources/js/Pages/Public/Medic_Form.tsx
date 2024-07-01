import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import Toast from '@/Components/Toast';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

interface FormData {
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  description: string;
  image: File | null;
}

function Medic_Form({ auth }: PageProps) {
  const [toasts, setToasts] = useState<{ message: string, type: 'success' | 'error' }[]>([]);
  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    firstname: '',
    lastname: '',
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
      onSuccess: async () => {
        addToast({ message: 'تم الطلب بنجاح , يرجى تفقد صندوق الرسائل من حين لاخر', type: 'success' });
        await sendTelegramNotification();
      },
      onError: () => {
        addToast({ message: 'حدث خطأ، يرجى المحاولة مرة أخرى', type: 'error' });
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
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">البحث عن دواء</h2>}
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
      <div className="formbold-form-wrapper">
        <form onSubmit={handleSubmit} className="text-right">
          <div className="formbold-form-title">
            <h2>هل تبحث عن دواء ؟</h2>
            <p>
              اذا كنت تبحث عن دواء و لم تجده ما عليك سوى التسجيل
              و وضع دوائك هنا و سنقوم بالبحث عنه
              من خلال شبكة تواصلنا مع الصيدليات
            </p>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="firstname" className="formbold-form-label">اللقب</label>
              <TextInput
                type="text"
                id="firstname"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
                className="formbold-form-input"
              />
              <InputError message={errors.firstname} className="mt-2" />
            </div>
            <div>
              <label htmlFor="lastname" className="formbold-form-label">الاسم</label>
              <TextInput
                type="text"
                id="lastname"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
                className="formbold-form-input"
              />
              <InputError message={errors.lastname} className="mt-2" />
            </div>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="phone" className="formbold-form-label">رقم الهاتف</label>
              <TextInput
                type="text"
                id="phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                className="formbold-form-input"
              />
              <InputError message={errors.phone} className="mt-2" />
            </div>
            <div>
              <label htmlFor="address" className="formbold-form-label">البلدية</label>
              <TextInput
                type="text"
                id="address"
                name="address"
                value={data.address}
                onChange={handleChange}
                className="formbold-form-input"
              />
              <InputError message={errors.address} className="mt-2" />
            </div>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="description" className="formbold-form-label">
              اسم الدواء مع أي اضافات
            </label>
            <TextInput
              type="text"
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange}
              className="formbold-form-input"
            />
            <InputError message={errors.description} className="mt-2" />
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="image" className="formbold-form-label">
              صورة واضحة للوصفة الطبية (ordonnance)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="formbold-form-input"
            />
            <InputError message={errors.image} className="mt-2" />
          </div>

          <PrimaryButton className="formbold-btn" disabled={processing}>
            تأكيد
          </PrimaryButton>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}

export default Medic_Form;
