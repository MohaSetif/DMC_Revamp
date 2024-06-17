import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function UserToPharmacists() {
  return (
    <div className='w-full max-w-md h-64 group isolate flex flex-col rounded-2xl border border-card_border bg-card_bg shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] p-4 overflow-hidden'>
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-card_title font-shubbak-semi-bold text-lg mb-2">تحديد تلقائي للموقع</h2>
      </div>
      <div className="relative flex-1 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-from_grad to-to_grad opacity-90 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center"></div>
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <FontAwesomeIcon icon={faLocationDot} className="h-8 w-8 text-gray-500 dark:text-white animate-bounce"/>
        </div>
      </div>
    </div>
  );
}

export default UserToPharmacists;
