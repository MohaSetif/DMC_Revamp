import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { PageProps } from '@/types';

interface Appointment {
  id: number;
  name: string;
  age: number;
  phone: string;
  time: string;
  description: string;
  status: StatusType;
}

interface Role {
  name: string;
}

type StatusType = 'مؤكد' | 'مرفوض' | 'في طور الانتظار';

const statusClasses: Record<StatusType, string> = {
  'مؤكد': 'border border-green-200 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'مرفوض': 'border border-red-200 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'في طور الانتظار': 'border border-yellow-200 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
};

function renderStatus(status: StatusType) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[status]}`}>
      {status}
    </span>
  );
}

interface DoctorAppointmentsProps extends PageProps {
  appointments: Appointment[];
  user_role: Role;
}

export default function Doctor_Appointments({ auth, appointments, user_role }: DoctorAppointmentsProps) {
  const { data, setData, put, processing } = useForm({
    appointmentId: 0,
    status: '' as StatusType,
  });

  useEffect(() => {
    if (data.status && data.appointmentId !== 0) {
      put(route('appointments.updateStatus', data.appointmentId), {
        preserveState: true,
        preserveScroll: true,
      });
    }
  }, [data.status, data.appointmentId]);

  const handleStatusUpdate = (appointmentId: number, newStatus: StatusType) => {
    setData({ appointmentId, status: newStatus });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight text-right">قائمة المواعيد</h2>}
    >
      <Head title="Doctor Appointments" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2">الحالة</th>
                      <th className="px-4 py-2">الوصف</th>
                      <th className="px-4 py-2">الوقت</th>
                      <th className="px-4 py-2">رقم الهاتف</th>
                      <th className="px-4 py-2">العمر</th>
                      <th className="px-4 py-2">الاسم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b dark:border-gray-700">
                        <td className="px-4 py-2">
                          {appointment.status === 'في طور الانتظار' && user_role.name == 'Doctor' && (
                            <>
                              <PrimaryButton
                                className="mr-4"
                                onClick={() => handleStatusUpdate(appointment.id, 'مؤكد')}
                                disabled={processing}
                              >
                                قبول
                              </PrimaryButton>
                              <PrimaryButton
                                className="bg-red-500 hover:bg-red-400 focus:bg-red-700 focus:hover:bg-red-900"
                                onClick={() => handleStatusUpdate(appointment.id, 'مرفوض')}
                                disabled={processing}
                              >
                                رفض
                              </PrimaryButton>
                            </>
                          )}
                        </td>
                        <td className="px-4 py-2">{renderStatus(appointment.status)}</td>
                        <td className="px-4 py-2">{appointment.description}</td>
                        <td className="px-4 py-2">{appointment.time}</td>
                        <td className="px-4 py-2">{appointment.phone}</td>
                        <td className="px-4 py-2">{appointment.age}</td>
                        <td className="px-4 py-2 font-semibold">{appointment.name}</td>
                      </tr>
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
