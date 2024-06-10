import React, { useState } from 'react';
import { faPhone, faMessage, faQuran } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faViber } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmailSmsOneTimePasscodes: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
    className="w-96 h-64 group isolate flex flex-col rounded-2xl border border-gray-700 bg-gray-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025]"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
    <div className="relative z-10 flex-none px-6 order-last pb-12">
      <h3 className="text-sm/3 font-medium text-white text-right">رموز المرور لمرة واحدة</h3>
      <p className="mt-2 text-sm text-gray-400 text-right">
        رسالة متضمنة فيها الرقم السري للمستخدم من أجل التحقق من الهوية
      </p>
    </div>
    <div className="pointer-events-none relative flex-auto select-none" style={{ minHeight: '10.25rem' }} aria-hidden="true">
      <div
        className={`absolute inset-x-0 top-0 isolate h-[calc(206/16*1rem)] overflow-hidden pt-6 transition-all duration-500 ${
          isHovering ? 'scale-100 translate-y-[-50px]' : 'translate-y-0 scale-0.5'
        }`}
      >
        <div
          className="phone mx-auto h-56 w-64 rounded-[1.75rem] bg-gray-800 p-1.5"
          style={{
            boxShadow: '0 1px 0 0 rgb(255 255 255 / 0.05) inset, 0px 2px 5px 0 rgb(0 0 0 / 0.40)',
            backgroundImage: 'linear-gradient(180deg, rgb(255 255 255 / 0.05) 0%, rgb(255 255 255 / 0) 67.19%)',
          }}
        >
        <div className="relative h-64 overflow-hidden rounded-[1.75rem] bg-gray-950/50 px-5 pt-3 ring-1 ring-inset ring-black/5">
            <span className="[perspective:1000px]">
              <div
                className={`absolute inset-x-2 top-12 z-20 flex origin-top items-center gap-x-3 rounded-2xl bg-gray-800 p-2 transition-all duration-500 ${
                  isHovering
                    ? 'translate-y-[-25px] scale-1 opacity-1'
                    : 'translate-y-[-150px] scale-0.5 opacity-0.5 blur-2px'
                }`}
                style={{
                  boxShadow: 'rgba(19, 19, 22, 0.6) 0px 6px 12px, rgba(255, 255, 255, 0.03) 0px 1px inset',
                }}
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[1.75rem] bg-gray-700" style={{ boxShadow: '0 1px rgb(255 255 255 / 0.05) inset', backgroundImage: 'radial-gradient(circle at top, rgb(114 233 255 / 0.2), rgb(114 233 255 / 0))' }}>
                  <FontAwesomeIcon icon={faMessage} color='white'/>
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white font-bold">OTP passcode</div>
                  <div className="truncate text-xs text-gray-200">
                    Your security passcode is <span className="text-white">456239</span>
                  </div>
                </div>
                </div>
            </span>
            <div className="mt-6 flex flex-wrap justify-between gap-x-2 gap-y-4 text-center">
              <div className="flex-none">
                <div className="relative size-10 rounded-xl bg-gray-800" style={{ boxShadow: '0 1px rgb(255 255 255 / 0.05) inset' }}>
                  <FontAwesomeIcon icon={faPhone} color='gray' className='mt-3'/>
                </div>
                <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">Phone</div>
              </div>
              <div className="flex-none">
                <div className="relative size-10 rounded-xl bg-gray-800" style={{ boxShadow: '0 1px rgb(255 255 255 / 0.05) inset' }}>
                  <FontAwesomeIcon icon={faQuran} color='gray' className='mt-3'/>
                </div>
                <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">القرآن الكريم</div>
              </div>
              <div className="flex-none">
                <div className="relative size-10 rounded-xl bg-gray-800" style={{ boxShadow: '0 1px rgb(255 255 255 / 0.05) inset' }}>
                  <FontAwesomeIcon icon={faFacebookF} color='gray' className='mt-3' />
                </div>
                <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">Facebook</div>
              </div>
              <div className="flex-none">
                <div className="relative size-10 rounded-xl bg-gray-800" style={{ boxShadow: '0 1px rgb(255 255 255 / 0.05) inset' }}>
                  <FontAwesomeIcon icon={faInstagram} color='gray' className='mt-3'/>
                </div>
                <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">Instagram</div>
              </div>
              <div className="flex-none">
                <div className="relative size-10 rounded-xl bg-gray-800" style={{ boxShadow: '0 1px rgb(255 255 255 / 0.05) inset' }}>
                  <FontAwesomeIcon icon={faViber} color='gray' className='mt-3'/>
                </div>
                <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">Viber</div>
              </div>
            </div>
          </div>
          </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900" style={{ transform: 'translateY(0rem)' }}></div>
      </div>
    </div>
  </div>
  );
};

export default EmailSmsOneTimePasscodes;