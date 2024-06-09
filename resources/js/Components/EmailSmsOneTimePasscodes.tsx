import React, { useState } from 'react';

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
      className="mb-10 group isolate flex flex-col rounded-2xl bg-gray-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10 flex-none px-6 order-last pb-6">
        <h3 className="text-sm font-medium text-white">Email and SMS one-time passcodes</h3>
        <p className="mt-2 text-sm/5 text-gray-400">
          Fast and reliable one-time passcode delivery with built-in brute force prevention.
        </p>
      </div>
      <div className="pointer-events-none relative flex-auto select-none" style={{ minHeight: '10.25rem' }} aria-hidden="true">
        <div
          className={`absolute inset-x-0 top-0 isolate h-[calc(206/16*1rem)] overflow-hidden pt-6 transition-all duration-500 ${
            isHovering ? 'scale-100 translate-y-[-50px]' : 'translate-y-0 scale-0.5'
          }`}
        >
          <div
            className="phone mx-auto h-56 w-[calc(264/16*1rem)] rounded-[calc(44/16*1rem)] bg-gray-800 p-1.5"
            style={{
              boxShadow: '0 1px 0 0 rgb(255 255 255 / 0.05) inset, 0px 2px 5px 0 rgb(0 0 0 / 0.40)',
              backgroundImage: 'linear-gradient(180deg, rgb(255 255 255 / 0.05) 0%, rgb(255 255 255 / 0) 67.19%)',
            }}
          >
          <div className="relative h-[calc(200/16*1rem)] overflow-hidden rounded-[calc(38/16*1rem)] bg-gray-950/50 px-5 pt-3 ring-1 ring-inset ring-black/5">
            <div
              className="relative z-10 mx-auto flex h-6 w-6 transform-gpu items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgb(19, 19, 22)', boxShadow: 'rgba(255, 255, 255, 0.05) 0px 1px' }}
            >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path fill="#fff" fillOpacity=".4" d="M3 9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" opacity="0"></path>
                  <path fill="#fff" fillOpacity=".4" fillRule="evenodd" d="M8 4a2.5 2.5 0 0 0-2.5 2.5V10h-1V6.5a3.5 3.5 0 1 1 7 0V10h-1V6.5A2.5 2.5 0 0 0 8 4Z" clipRule="evenodd" opacity="0"></path>
                  <path d="M3 8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" fill="rgba(116, 118, 134, 1)"></path>
                  <path fillRule="evenodd" d="M8 3a2.5 2.5 0 0 0-2.5 2.5V9h-1V5.5a3.5 3.5 0 1 1 7 0V9h-1V5.5A2.5 2.5 0 0 0 8 3Z" clipRule="evenodd" fill="rgba(116, 118, 134, 1)"></path>
                </svg>
              </div>
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
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[calc(10/16*1rem)] bg-gray-700" style={{ boxShadow: '0 1px rgb(255 255 255 / 0.05) inset', backgroundImage: 'radial-gradient(circle at top, rgb(114 233 255 / 0.2), rgb(114 233 255 / 0))' }}>
                    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="size-10">
                      <g filter="url(#filter0_di_5116_3367)">
                        <path fill="#5DE3FF" fillRule="evenodd" d="M20 32c6.627 0 12-5.373 12-12S26.627 8 20 8 8 13.373 8 20s5.373 12 12 12Zm6-12c0 2.761-2.686 5-6 5a7.2 7.2 0 0 1-1.163-.094 1.227 1.227 0 0 0-.79.14c-.613.34-1.308.571-1.983.72-.82.182-1.314-.759-.895-1.485.04-.07.08-.14.119-.212.21-.382.099-.846-.184-1.178C14.409 22.075 14 21.077 14 20c0-2.761 2.686-5 6-5s6 2.239 6 5Z" clipRule="evenodd"></path>
                      </g>
                      <defs>
                        <filter id="filter0_di_5116_3367" width="42" height="42" x="-1" y="-1" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                          <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect1_dropShadow_5116_3367"></feMorphology>
                          <feOffset></feOffset>
                          <feGaussianBlur stdDeviation="4"></feGaussianBlur>
                          <feComposite in2="hardAlpha" operator="out"></feComposite>
                          <feColorMatrix values="0 0 0 0 0.419608 0 0 0 0 0.905882 0 0 0 0 1 0 0 0 0.3 0"></feColorMatrix>
                          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_5116_3367"></feBlend>
                          <feBlend in="SourceGraphic" in2="effect1_dropShadow_5116_3367" result="shape"></feBlend>
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                          <feOffset dy="1"></feOffset>
                          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
                          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"></feColorMatrix>
                          <feBlend in2="shape" result="effect2_innerShadow_5116_3367"></feBlend>
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[0.625rem]/4 font-medium text-[#5DE3FF]">OTP passcode</div>
                    <div className="truncate text-xs text-gray-200">
                      Your security passcode is <span className="text-white">456239</span>
                    </div>
                  </div>
                  </div>
              </span>
              <div className="mt-6 flex flex-wrap justify-between gap-x-2 gap-y-4 text-center">
                <div className="flex-none">
                  <div className="relative size-10 rounded-[calc(10/16*1rem)] bg-gray-800" style={{ boxShadow: '0 1px rgb(255 255 255 / 0.05) inset' }}>
                    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="size-10">
                      <g filter="url(#email-sms-icon-shadow)">
                        <path fill="#5E5F6E" d="m31.661 28.642-1.576 2.465c-.126.197-.266.388-.465.509-1.796 1.084-7.63.18-14.523-6.713-7.302-7.303-7.883-13.416-6.5-14.799l2.761-1.765a2.152 2.152 0 0 1 2.68.291l2.119 2.118c.714.714.835 1.83.29 2.68l-1.18 1.847c-.387.607-.657 1.29-.451 1.98.373 1.253 1.406 3.24 3.047 4.882a12.282 12.282 0 0 0 3.656 2.515c1.425.633 2.997.214 4.311-.626l.742-.474a2.151 2.151 0 0 1 2.68.291l2.118 2.119c.714.714.835 1.829.291 2.68Z"></path>
                        <path fill="url(#paint0_linear_5116_3351)" fillOpacity=".2" d="m31.661 28.642-1.576 2.465c-.126.197-.266.388-.465.509-1.796 1.084-7.63.18-14.523-6.713-7.302-7.303-7.883-13.416-6.5-14.799l2.761-1.765a2.152 2.152 0 0 1 2.68.291l2.119 2.118c.714.714.835 1.83.29 2.68l-1.18 1.847c-.387.607-.657 1.29-.451 1.98.373 1.253 1.406 3.24 3.047 4.882a12.282 12.282 0 0 0 3.656 2.515c1.425.633 2.997.214 4.311-.626l.742-.474a2.151 2.151 0 0 1 2.68.291l2.118 2.119c.714.714.835 1.829.291 2.68Z"></path>
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_5116_3351" x1="20" x2="20" y1="9" y2="31" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#fff"></stop>
                          <stop offset="1" stopOpacity="0"></stop>
                        </linearGradient>
                        <filter id="email-sms-icon-shadow" width="30" height="30" x="5" y="6" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                          <feOffset dy="1"></feOffset>
                          <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
                          <feComposite in2="hardAlpha" operator="out"></feComposite>
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
                          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_5116_3351"></feBlend>
                          <feBlend in="SourceGraphic" in2="effect1_dropShadow_5116_3351" result="shape"></feBlend>
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                          <feOffset dy="1"></feOffset>
                          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
                          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0"></feColorMatrix>
                          <feBlend in2="shape" result="effect2_innerShadow_5116_3351"></feBlend>
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">Phone</div>
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