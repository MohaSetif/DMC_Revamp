import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };
    
    return (
        <section className={`${className} text-right`} dir="rtl">
            <header>
                <h2 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-gray-100">المعلومات الشخصية</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    هذه صفحتك الشخصية، هنا يمكنك تعديل اسمك فقط.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-4 sm:space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="الاسم" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                        disabled
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="البريد الالكتروني" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        required
                        autoComplete="username"
                        disabled
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            بريدك الإلكتروني غير موثّق.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                اضغط هنا لإعادة إرسال رابط التوثيق.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                تم إرسال رابط توثيق جديد إلى بريدك الإلكتروني.
                            </div>
                        )}
                    </div>
                )}
                
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>حفظ</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">.تم الحفظ</p>
                    </Transition>
                </div> */}
            </form>
        </section>
    );
}