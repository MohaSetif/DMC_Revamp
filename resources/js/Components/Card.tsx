import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Card: React.FC<{ title: string, icon: IconProp, description: string }> = ({ title, icon, description }) => {
  return (
    <div className='backdrop-blur-md top-0 z-[-2] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,140,198,0.3),rgba(3,11,19))] border border-gray-700 rounded-xl m-5 p-5'>
      <div className='flex justify-center items-center mb-4 bg-gray-600/25 rounded-full h-10 w-10 border border-gray-600'>
        <FontAwesomeIcon icon={icon} height="200" />
      </div>
      <h1 className='text-white font-bold text-2xl'>{title}</h1>
      <p className='text-white'>{description}</p>
    </div>
  );
}

export default Card;