import React from 'react';
import DMC_WhiteLogo from "../../../public/img/168608548544536747.png";
import BackToTopButton from './BackToTopButton';
import stethoscope from "../../../public/img/stethoscope.png";

function Footer() {
  return (
    <footer className="bg-slate-400 dark:bg-slate-900 rounded-2xl m-12 mt-[8rem] relative">
      <div className="mx-auto w-[70rem] max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between relative">
          <div className="flex flex-col items-center justify-between pr-4 h-56">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center align-top">
                <img
                  src={DMC_WhiteLogo}
                  alt="DMC_logo"
                  height="100"
                  width="100"
                />
              </a>
            </div>
            <div className="mb-4">
              <BackToTopButton />
            </div>
          </div>
          <div className='absolute z-30 ml-[24rem] top-[-10rem]'>  {/* Adjusted the top property */}
            <img src={stethoscope} alt="stethoscope" height="350" width="350" />
          </div>
          <div className='block backdrop-blur-md z-20 bg-slate-200/30 dark:bg-slate-700/30 p-6 rounded-2xl h-56 w-[85%] leading-[15rem] relative text-right'>
            <div className="absolute top-[-1.15rem] right-0 start_journey text-[9rem] text-right leading-[7rem] text-white font-shubbak-bold z-20">
                ابــدأ
            </div>
            <div className="absolute top-[4.5rem] right-0 start_journey text-[9rem] text-right text-white font-shubbak-bold z-20">
                مشوارك معنا
            </div>
          </div>
        </div>
        <hr className="my-6 border-slate-200 sm:mx-auto dark:border-slate-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-slate-100 sm:text-center dark:text-slate-400">
            © 2023 <a href="/" className="hover:underline">DMC™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-slate-100 hover:text-slate-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
