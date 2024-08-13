import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';

interface Doctor {
    speciality: string;
    work_place: string;
    price: number;
    who: string;
    image: File | null;
}

interface Shift {
    day: string;
    start_time: string;
    end_time: string;
}

interface FormData extends Doctor {
    shifts: Shift[];
}

interface BuildProfileProps extends PageProps {
    doctor: Doctor;
    shifts: Record<string, { start_time: string; end_time: string }>;
}

const daysOfWeek_arabic = ['الأحد', 'الإثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت'];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Build_Profile: React.FC<BuildProfileProps> = ({ auth, doctor, shifts }) => {
    const initialShifts = daysOfWeek.map(day => ({
        day: day.toLowerCase(),
        start_time: shifts[day.toLowerCase()]?.start_time || '09:00',
        end_time: shifts[day.toLowerCase()]?.end_time || '18:00'
    }));

    const [currentImage, setCurrentImage] = useState<string | null>(null);

    useEffect(() => {
        if (doctor.image) {
            setCurrentImage(`/storage/${doctor.image}`);
        }
    }, [doctor.image]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file)
            const reader = new FileReader()
            reader.onloadend = () =>{
                setCurrentImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    };

    const { data, setData, post, processing, errors } = useForm<FormData>({
      ...doctor,
      shifts: initialShifts,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof FormData, value);
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof FormData, value);
    };

    const handleShiftChange = (day: string, field: 'start_time' | 'end_time', value: string) => {
        setData('shifts', data.shifts.map(shift => 
            shift.day === day ? { ...shift, [field]: value } : shift
        ));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form data before submission:', data);
        post(route('doctor.update_profile'), {
            preserveState: true,
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            usertype={auth.usertype}
        >
            <Head title="معلوماتي الشخصية" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-3xl text-gray-900 dark:text-white font-bold mb-8">الصفحة الشخصية</h1>
                            <form onSubmit={handleSubmit} encType='multipart/form-data' className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="speciality" className="block text-sm font-medium text-gray-700 dark:text-gray-300">التخصص</label>
                                        <TextInput
                                            type="text"
                                            id="speciality"
                                            name="speciality"
                                            value={data.speciality}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        {errors.speciality && <div className="text-red-500 text-sm mt-1">{errors.speciality}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="work_place" className="block text-sm font-medium text-gray-700 dark:text-gray-300">مكان العمل</label>
                                        <TextInput
                                            type="text"
                                            id="work_place"
                                            name="work_place"
                                            value={data.work_place}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        {errors.work_place && <div className="text-red-500 text-sm mt-1">{errors.work_place}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">سعر التشخيص</label>
                                        <TextInput
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={data.price}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 self-end">صورتك</label>
                                        {currentImage && (
                                            <img 
                                                className="mr-12 inset-0 h-40 w-40 object-cover mb-2" 
                                                src={currentImage} 
                                                alt="Current profile" 
                                            />
                                        )}
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-indigo-50 file:text-indigo-700
                                            hover:file:bg-indigo-100
                                            dark:file:bg-gray-700 dark:file:text-gray-200"
                                        />
                                        {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="who" className="block text-sm font-medium text-gray-700 dark:text-gray-300">معلوماتك الشخصية</label>
                                    <textarea
                                        id="who"
                                        name="who"
                                        value={data.who}
                                        onChange={handleTextareaChange}
                                        rows={4}
                                        className="mt-1 block w-full text-right rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    {errors.who && <div className="text-red-500 text-sm mt-1">{errors.who}</div>}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">أوقات الفراغ</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ direction: 'rtl' }}>
                                        {data.shifts.map((shift, index) => (
                                            <div key={shift.day} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">{daysOfWeek_arabic[index]}</h4>
                                                <div className="space-y-2">
                                                    <div>
                                                        <label htmlFor={`start_time_${shift.day}`} className="block text-sm font-medium text-gray-600 dark:text-gray-400">من</label>
                                                        <TextInput 
                                                            type="time" 
                                                            id={`start_time_${shift.day}`}
                                                            value={shift.start_time}
                                                            onChange={(e) => handleShiftChange(shift.day, 'start_time', e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor={`end_time_${shift.day}`} className="block text-sm font-medium text-gray-600 dark:text-gray-400">إلى</label>
                                                        <TextInput 
                                                            type="time" 
                                                            id={`end_time_${shift.day}`}
                                                            value={shift.end_time}
                                                            onChange={(e) => handleShiftChange(shift.day, 'end_time', e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={processing}>
                                        {processing ? '...جاري الحفظ' : 'حفظ التعديلات'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Build_Profile;