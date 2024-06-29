import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Build_Profile: React.FC<BuildProfileProps> = ({ auth, doctor }) => {
    const initialShifts = daysOfWeek.map(day => ({ day, start_time: '09:00', end_time: '18:00' }));
    
    const { data, setData, post, processing, errors } = useForm<FormData>({
        ...doctor,
        shifts: initialShifts,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        setData(name as keyof FormData, type === 'file' ? files?.[0] || null : value);
    };   

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof FormData, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        post(route('doctor.post_building'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">معلوماتك الشخصية</h2>}
        >
            <h1 className="text-3xl font-bold mb-8">Doctor Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">Speciality</label>
                    <input
                        type="text"
                        id="speciality"
                        name="speciality"
                        value={data.speciality}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.speciality && <div className="text-red-500">{errors.speciality}</div>}
                </div>
                <div>
                    <label htmlFor="work_place" className="block text-sm font-medium text-gray-700">Work Place</label>
                    <input
                        type="text"
                        id="work_place"
                        name="work_place"
                        value={data.work_place}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.work_place && <div className="text-red-500">{errors.work_place}</div>}
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.price && <div className="text-red-500">{errors.price}</div>}
                </div>
                <div>
                    <label htmlFor="who" className="block text-sm font-medium text-gray-700">Who</label>
                    <textarea
                        id="who"
                        name="who"
                        value={data.who}
                        onChange={handleTextareaChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.who && <div className="text-red-500">{errors.who}</div>}
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                    {data.image && (
                        <img
                            src={`/storage/${data.image}`}
                            alt={auth.user.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                    )}
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.image && <div className="text-red-500">{errors.image}</div>}
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-700">Weekly Shifts</h3>
                    {data.shifts.map(shift => (
                        <div key={shift.day} className="flex space-x-4 items-center">
                            <div className="max-w-[8rem]">
                                <label htmlFor={`start_time_${shift.day}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{shift.day} Start time:</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <input 
                                        type="time" 
                                        id={`start_time_${shift.day}`} 
                                        name="start_time"
                                        data-day={shift.day}
                                        value={shift.start_time}
                                        onChange={handleChange}
                                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        min="09:00" 
                                        max="18:00" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="max-w-[8rem]">
                                <label htmlFor={`end_time_${shift.day}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{shift.day} End time:</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <input 
                                        type="time" 
                                        id={`end_time_${shift.day}`} 
                                        name="end_time"
                                        data-day={shift.day}
                                        value={shift.end_time}
                                        onChange={handleChange}
                                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        min="09:00" 
                                        max="18:00" 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
};

export default Build_Profile;
