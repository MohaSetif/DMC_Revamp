import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import EmailSmsOneTimePasscodes from './EmailSmsOneTimePasscodes';
import MultifactorAuthentication from './MultifactorAuthentication';
import UserToPharmacists from './UserToPharmacists';
import DoctorProfileCard from './DoctorProfileCard';
import MedicationForm from './MedicationForm';

const Card: React.FC<{ title: string, icon: IconProp, description: string, index: number }> = ({ title, icon, description, index }) => {
  const iconScrollTrigger = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsVisible(true);
        }, 500);
      } else {
        setIsVisible(false);
      }
    });

    if (iconScrollTrigger.current) {
      observer.observe(iconScrollTrigger.current);
    }

    return () => {
      if (iconScrollTrigger.current) {
        observer.unobserve(iconScrollTrigger.current);
      }
    };
  }, []);

  return (
    <div className="flex mb-10 w-[70rem]">
      {index === 0 && <DoctorProfileCard />}
      {index === 1 && <UserToPharmacists />}
      {index === 2 && <MedicationForm />}
      {index === 3 && <EmailSmsOneTimePasscodes />}
      {index === 4 && <MultifactorAuthentication />}
      <div className="relative flex flex-col items-end w-full max-w-2xl">
        <div className="flex gap-10">
          <h1 className="text-slate-900 dark:text-white font-shubbak-semi-bold text-3xl flex justify-center items-center">{title}</h1>
          <div className="relative">
            <div
              className={`absolute rounded-full bg-gray-400/70 dark:bg-blue-400/30 transition-all duration-500
                ${isVisible ? 'opacity-100 backdrop-blur-md' : 'opacity-0'}`}
              style={{
                width: '70px',
                height: '70px',
                zIndex: 1,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(15px)',
              }}
            ></div>
            <FontAwesomeIcon
              ref={iconScrollTrigger}
              icon={icon}
              size="2xl"
              className={`p-4 relative z-20 transition-all duration-500 ${isVisible ? 'text-white' : ''}`}
            />
          </div>
        </div>
        <div className="p-12 w-full flex justify-end">
          <p className="text-slate-900 dark:text-white text-right text-4xl leading-[1.5]">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
