import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { TracingBeam } from "../Components/ui/tracing-beam";
import CustomButton from '@/Components/CustomButton';
import Card from '@/Components/Card';
import doctorIcon from "../../../public/svg/doctor.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserDoctor } from '@fortawesome/free-solid-svg-icons';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    
//   const DoctorIcon = (
//     <div className="flex bg-gray-600/25 rounded-full h-20 w-20 border-2 border-gray-600">
//         <FontAwesomeIcon icon={faUserDoctor} />
//     </div>
//   );

  const details = [
    {
      title: "كيف أسجل عند طبيب؟",
      description: "اختر الطبيب الذي تريده من صفحة الأطباء، بعد ذلك اختر الموعد المناسب",
      icon: faUserDoctor
    },
    {
      title: "الموقع الجغرافي",
      description: "مع Google Maps، لن تضطر أبدا إلى إدخال عنوانك الكامل",
      icon: faUser
    },
    {
        title: "الأدوية النادرة",
        description: "من خلال هذا الموقع، لن تضطر أبدا للبحث من صيدلية إلى أخرى من أجل الدواء الذي تبحث عنه، أدخل و انتظر الرد من الصيادلة أنفسهم",
        icon: faUser
    },
    {
      title: "الرقم السري",
      description: "بعد أن يقوم المستخدم بالتسجيل، سيصل إليه إشعار فيه الرقم السري الخاص به",
      icon: faUser
    },
    {
        title: "التحقيق متعدد العوامل",
        description: "بعد أن يتم إعلام المستخدم بالرقم السري، عليه أن يستعملها من أجل ملء خانات التحقق من الهوية",
        icon: faUser
      }
  ]
//   [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-gray-900 dark:text-white/50">
                <div className="bg-[linear-gradient(to_right,#202330_1px,transparent_1px),linear-gradient(to_bottom,#202330_1px,transparent_1px)] bg-[size:100px_80px] relative min-h-screen flex flex-col items-center selection:bg-[#2036ff] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-5">
                            <nav className="flex justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>                        
                        <main className="block items-center justify-center min-h-32 m-16 p-12">
                            <div className="block text-center text-3xl h-5 font-medium text-gray-900 dark:text-gray-50 sm:text-4xl">
                                <span className='text-8xl'>Digital Med Care</span>
                                <div className="my-4"></div>
                                <span className="mb-12 block animate-text-gradient bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
                                    رعــايـــة طــــبـــيــة رقمــيـــة متــقــــدمــــة
                                </span>
                                <CustomButton text='افهم أكثر' section='#explanation'/>
                            </div>
                        </main>
                        <div className='b-auto'>
                          <TracingBeam className="px-6 mt-[24rem]">
                              <div id="explanation" className="flex flex-wrap max-w-2xl mx-auto antialiased pt-4">
                                  {details.map((detail, index)=> (
                                    <div key={index}>
                                      <Card title={detail.title} description={detail.description} icon={detail.icon} />
                                    </div>
                                  ))}
                              </div>
                          </TracingBeam>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}