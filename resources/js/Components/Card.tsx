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
    <div className="flex flex-col mb-[10rem] md:mb-[15rem] w-full md:w-[70rem]">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="md:w-1/2 relative z-30">
          {index === 0 && <DoctorProfileCard />}
          {index === 1 && <UserToPharmacists />}
          {index === 2 && <MedicationForm />}
          {index === 3 && <EmailSmsOneTimePasscodes />}
          {index === 4 && <MultifactorAuthentication />}
        </div>
        <div className="relative flex flex-col items-end md:items-end md:w-[32rem]">
          <div className="flex items-center justify-end gap-4 md:gap-10">
            <h1 className="text-p mt-4 font-shubbak-semi-bold text-2xl md:text-3xl">{title}</h1>
            <div className="relative flex justify-center items-center">
              <div
                className={`absolute rounded-full bg-gray-400/70 dark:bg-blue-400/30 transition-all duration-500
${isVisible ? 'opacity-100 backdrop-blur-md' : 'opacity-0'}`}
                style={{
                  width: '50px',
                  height: '50px',
                  zIndex: 1,
                  filter: 'blur(15px)',
                }}
              ></div>
              <FontAwesomeIcon
                ref={iconScrollTrigger}
                icon={icon}
                size="lg"
                className={`p-2 md:p-4 relative z-20 transition-all duration-500 ${isVisible ? 'text-white' : ''}`}
              />
            </div>
          </div>
          <div className="p-4 md:p-6 w-full flex justify-end">
            <p className="text-p text-right text-lg md:text-2xl leading-[1.5]">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;