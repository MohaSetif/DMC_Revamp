import React from 'react';

interface Appointment {
  id: number;
  name: string;
  age: number;
  phone: string;
  latitude: number;
  longitude: number;
  localisation: string;
  time: string;
  description: string;
  status: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg p-6 transition duration-300 ease-in-out hover:shadow-xl">
      <div className="text-right">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{appointment.name}</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold ml-2">العمر:</span> {appointment.age}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold ml-2">رقم الهاتف:</span> {appointment.phone}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold ml-2">الوقت:</span> {appointment.time}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold ml-2">الوصف:</span> {appointment.description}
          </p>
          <p className="text-sm">
            <span className="font-semibold ml-2">الحالة:</span>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'مؤكد':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'ملغي':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'قيد الانتظار':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

export default AppointmentCard;