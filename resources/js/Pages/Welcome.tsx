import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { TracingBeam } from "../Components/ui/tracing-beam";
import CustomButton from '@/Components/CustomButton';
import Card from '@/Components/Card';
import Blob from '@/Components/Blob';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserDoctor, faLocationDot, faCapsules, faKey } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react/jsx-runtime';
import ToggleButton from '@/Components/ToggleButton';
import DMC_BlueLogo from "../../../public/img/DMC_nav_logo.png"
import DMC_WhiteLogo from "../../../public/img/168608548544536747.png"
import Footer from '@/Components/Footer';
import AnimationSquare from '@/Components/AnimationSquare';
import AnimationSquare2 from '@/Components/AnimationSquare2';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {

  const details = [
    {
      title: "كيف أسجل عند طبيب؟",
      description: "اختر الطبيب الذي تريده من صفحة الأطباء، بعد ذلك اختر الموعد المناسب",
      icon: faUserDoctor
    },
    {
      title: "الموقع الجغرافي",
      description: "مع Google Maps، لن تضطر أبدا إلى إدخال عنانك الكامل",
      icon: faLocationDot
    },
    {
      title: "الأدوية النادرة",
      description: "من خلال هذا الموقع، لن تضطر أبدا للبحث من صيدلية إلى أخرى من أجل الأدوية النادرة، أطلب واحدا و انتظر الرد من الصيادلة أنفسهم",
      icon: faCapsules
    },
    {
      title: "الرقم السري",
      description: "بعد أن يقوم المستخدم بالتسجيل، سيصل إليه إشعار فيه الرقم السري الخاص به",
      icon: faKey
    },
    {
      title: "التحقيق متعدد العوامل",
      description: "بعد أن يتم إعلام المستخدم بالرقم السري، عليه أن يستعملها من أجل ملء خانات التحقق من الهوية",
      icon: faUser
    }
  ];

  return (
    <>
      <Head title="Welcome" />
      <div className="relative h-full w-full bg-page font-shubbak-light overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:100px_80px]"></div>
        <div className="absolute left-0 top-[-10%] h-[800px] w-[800px] md:h-[1000px] md:w-[1000px] rounded-full bg-bg_circle"></div>        
        <div className="relative z-10 min-h-screen flex flex-col items-center selection:bg-[#2036ff] selection:text-white">
          <div className="relative w-full px-4 lg:max-w-7xl">
            <header className="py-5 flex justify-between items-center">
              <div className="container mx-auto">
                <nav className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={DMC_BlueLogo}
                      alt="DMC_logo"
                      height="60"
                      width="60"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <ToggleButton/>
                    {auth.user ? (
                      <Link
                        href={route('dashboard')}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                      >
                        الصفحة الرئيسية
                      </Link>
                    ) : (
                      <>
                        <Link
                          href={route('login')}
                          className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                          أدخل
                        </Link>
                        <Link
                          href={route('register')}
                          className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                          سجل
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            </header>
            <main className="flex items-center justify-center min-h-screen w-full mt-[-4rem]">
              <div className="overflow-hidden z-10">
                <AnimationSquare />
              </div>
              <div className="flex flex-col items-center justify-center z-20 text-center text-xl md:text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-2xl">
                <span className='text-5xl md:text-8xl font-shubbak-semi-bold text-p'>Digital Med Care</span>
                <div className="my-2 md:my-4"></div>
                <span className="mb-4 md:mb-12 block animate-text-gradient bg-gradient-to-r bg-[200%_auto] bg-clip-text leading-tight text-transparent from-slate-600 via-slate-400 to-slate-400">
                  رعــايـــة طــــبـــيــة رقمــيـــة متــقــــدمــــة
                </span>
                <CustomButton text='تعرف أكثر' />
              </div>
              <div className="overflow-hidden z-10">
                <AnimationSquare2 />
              </div>
            </main>
            <div className='b-auto'>
              <div id="explanation" className="block">
                <TracingBeam className="mt-12 md:mt-[4rem]">
                  {details.map((detail, index) => (
                    <Fragment key={index}>
                      <Card title={detail.title} description={detail.description} icon={detail.icon} index={index} />
                    </Fragment>
                  ))}
                  <Blob />
                </TracingBeam>
              </div>
              <Footer/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
