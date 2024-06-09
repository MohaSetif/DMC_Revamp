import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

const Card: React.FC<{ title: string, icon: IconProp, description: string }> = ({ title, icon, description }) => {
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
    <div className='relative mb-10'>
      <div className='flex justify-end items-center gap-10'>
        <h1 className='text-white font-bold text-2xl'>{title}</h1>
        <div className='relative'>
          <div
            className={`absolute rounded-full bg-blue-400/50 transition-all duration-500
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
            size='2xl'
            className={`p-4 relative z-20 transition-all duration-500 ${isVisible ? 'text-white' : ''}`}
          />
        </div>
      </div>
      <div className='p-12 w-[64rem] flex justify-end'>
        <p className='text-white text-right text-4xl leading-[1.5]'>{description}</p>
      </div>
    </div>
  );
};

export default Card;
