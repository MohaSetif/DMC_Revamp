import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import profile_svg from "../../../../public/svg/undraw_profile_re_4a55.svg";

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      usertype={auth.usertype}
    >
      <Head title="الصفحة الشخصية" />
      <div className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-4 sm:p-8 flex items-center justify-center">
                <img 
                  src={profile_svg} 
                  alt="profile_svg" 
                  className="w-full max-w-md h-auto"
                />
              </div>
              <div className="md:w-1/2 p-4 sm:p-8">
                <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}