import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import DMC_BlueLogo from "../../../public/img/DMC_nav_logo.png";
import DMC_WhiteLogo from "../../../public/img/168608548544536747.png"
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import ToggleButton from '@/Components/ToggleButton';
import { PageProps, User } from '@/types';

export default function Authenticated({ user, usertype, header, children }: PropsWithChildren<{ user: User, usertype?: string, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen text-right bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img
                                    src={DMC_BlueLogo}
                                    alt="DMC_logo"
                                    height="45"
                                    width="45"
                                    className="m-6 dark:hidden"
                                    />
                                    <img
                                    src={DMC_WhiteLogo}
                                    alt="DMC_logo"
                                    height="45"
                                    width="45"
                                    className="m-6 hidden dark:block"
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:justify-center flex-grow">
                            <div className="flex space-x-8 sm:-my-px">
                                <NavLink href={route('medications.index')} active={route().current('medications.index')}>
                                    صيدليتنا
                                </NavLink>
                                <NavLink href={route('doctors.index')} active={route().current('doctors.index')}>
                                    أطباؤنا
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    الصفحة الرئيسية
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <ToggleButton/>
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={usertype === 'Doctor' ? route('doctor.build_profile') : route('profile.edit')}>الصفحة الشخصية</Dropdown.Link>
                                        <Dropdown.Link href={usertype === 'Doctor' ? route('doctor.appoint_list') : route('appointment.for_user')}>مواعيدك</Dropdown.Link>
                                        <Dropdown.Link href={usertype === 'Pharmacist' ? route('pharmacist.medic_list') : route('medication.for_user')}>طلبات الأدوية</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            الخروج
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            الصفحة الرئيسية
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('doctors.index')} active={route().current('doctors.index')}>
                            أطباؤنا
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('medications.index')} active={route().current('medications.index')}>
                            صيدليتنا
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t text-right border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1 text-right">
                            <ResponsiveNavLink href={usertype === 'Doctor' ? route('doctor.build_profile') : route('profile.edit')}>الصفحة الشخصية</ResponsiveNavLink>
                            <Dropdown.Link href={usertype === 'Doctor' ? route('doctor.appoint_list') : route('appointment.for_user')}>مواعيدك</Dropdown.Link>
                            <Dropdown.Link href={usertype === 'Pharmacist' ? route('pharmacist.medic_list') : route('medication.for_user')}>طلبات الأدوية</Dropdown.Link>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                الخروج
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}