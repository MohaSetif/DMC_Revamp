import React, { useState, useEffect, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { PageProps } from '@/types';
import MapComponent from '../../../Components/Map';

interface Medication {
  id: number;
  uniqid: string;
  user_id: number;
  pharmacist_id: number | null;
  phone: string;
  address: string;
  description: string;
  image: string;
  status: StatusType;
  pharmacist_lat: number | null;
  pharmacist_lon: number | null;
}

interface Role {
  name: string;
}

type StatusType = 'في طور الانتظار' | 'موجود';

const statusClasses: Record<StatusType, string> = {
  'في طور الانتظار': 'border border-yellow-200 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'موجود': 'border border-green-200 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

function renderStatus(status: StatusType) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[status]}`}>
      {status}
    </span>
  );
}

interface MedicationListProps extends PageProps {
  medications: Medication[];
  user_role: Role;
}

export default function MedicationList({ auth, medications, user_role }: MedicationListProps) {
  const [activeMapId, setActiveMapId] = useState<number | null>(null);

  const { data, setData, put, processing } = useForm({
    medicationId: 0,
    status: '' as StatusType,
  });

  useEffect(() => {
    if (data.status && data.medicationId !== 0) {
      put(route('medications.updateStatus', data.medicationId), {
        preserveState: true,
        preserveScroll: true,
      });
    }
  }, [data.status, data.medicationId]);

  const handleStatusUpdate = (medicationId: number, newStatus: StatusType) => {
    setData({ medicationId, status: newStatus });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight text-right">قائمة الأدوية</h2>}
    >
      <Head title="Medication List" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2">الإجراءات</th>
                      <th className="px-4 py-2">الحالة</th>
                      <th className="px-4 py-2">الوصفة الطبية</th>
                      <th className="px-4 py-2">الوصف</th>
                      <th className="px-4 py-2">العنوان</th>
                      <th className="px-4 py-2">رقم الهاتف</th>
                      <th className="px-4 py-2">رقم التعريف</th>
                      <th className="px-4 py-2">الخريطة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map((medication) => (
                      <React.Fragment key={medication.id}>
                        <tr className="border-b dark:border-gray-700">
                          <td className="px-4 py-2">
                            {medication.status === 'في طور الانتظار' && user_role.name === 'Pharmacist' && (
                              <PrimaryButton
                                className="mr-4"
                                onClick={() => handleStatusUpdate(medication.id, 'موجود')}
                                disabled={processing}
                              >
                                قبول
                              </PrimaryButton>
                            )}
                          </td>
                          <td className="px-4 py-2">{renderStatus(medication.status)}</td>
                          <td className="px-4 py-2 flex items-center justify-center">
                            <img
                              src={`/prescription_image/${medication.image}`}
                              alt={medication.description}
                              className="h-20 w-auto rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2">{medication.description}</td>
                          <td className="px-4 py-2">{medication.address}</td>
                          <td className="px-4 py-2">{medication.phone}</td>
                          <td className="px-4 py-2 font-semibold">{medication.uniqid}</td>
                          <td className="px-4 py-2">
                            {medication.status === 'موجود' && (
                              <div className="flex items-center">
                                <a
                                  href={`https://www.google.com/maps?q=${5},${36}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 inline-block ml-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M13.82 6.76a2.5 2.5 0 1 1-4.12 2.82L8.3 10.3a.75.75 0 0 1-1.06 0L4.3 8.59A2.5 2.5 0 1 1 6.41 6.5L7.89 8h4.22l1.48-1.5zM10 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                                    />
                                  </svg>
                                  عرض على خرائط جوجل
                                </a>
                              </div>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
