import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { TracingBeam } from "../Components/ui/tracing-beam";
import CustomButton from '@/Components/CustomButton';
import Card from '@/Components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserDoctor, faLocationDot, faCapsules, faKey } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react/jsx-runtime';
import MultifactorAuthentication from '@/Components/MultifactorAuthentication';
import EmailSmsOneTimePasscodes from '@/Components/EmailSmsOneTimePasscodes';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
  const details = [
    {
      title: "كيف أسجل عند طبيب؟",
      description: "اختر الطبيب الذي تريده من صفحة الأطباء، بعد ذلك اختر الموعد المناسب",
      icon: faUserDoctor
    },
    {
      title: "الموقع الجغرافي",
      description: "مع Google Maps، لن تضطر أبدا إلى إدخال عنوانك الكامل",
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
      <div className="relative h-full w-full bg-black">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:100px_80px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        <div className="relative z-10 min-h-screen flex flex-col items-center selection:bg-[#2036ff] selection:text-white">
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
                <CustomButton text='افهم أكثر' section='#explanation' />
              </div>
            </main>
            <div className='b-auto'>
              <div id="explanation" className="block">
                <TracingBeam className="mt-[24rem]">
                  {details.map((detail, index) => (
                    <Fragment key={index}>
                      <Card title={detail.title} description={detail.description} icon={detail.icon} />
                      {index === 3 && <EmailSmsOneTimePasscodes/>}
                      {index === 4 && <MultifactorAuthentication />}
                    </Fragment>
                  ))}
                </TracingBeam>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
