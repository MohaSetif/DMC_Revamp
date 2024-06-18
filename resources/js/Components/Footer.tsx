import React from 'react';
import DMC_WhiteLogo from "../../../public/img/168608548544536747.png";
import BackToTopButton from './BackToTopButton';
import stethoscope from "../../../public/img/stethoscope.png";

function Footer() {
  return (
    <footer className="bg-slate-400 dark:bg-slate-900 rounded-2xl m-4 md:m-12 mt-[4rem] md:mt-[8rem] relative">
      <div className="mx-auto max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between relative">
          <div className="flex flex-col items-center justify-between mb-8 md:mb-0">
            <div className="mb-4 md:mb-6">
              <a href="/" className="flex items-center align-top">
                <img
                  src={DMC_WhiteLogo}
                  alt="DMC_logo"
                  height="100"
                  width="100"
                />
              </a>
            </div>
            <div>
              <BackToTopButton />
            </div>
          </div>
          <div className="relative md:ml-auto">
            {/* Stethoscope image */}
            <div className="absolute z-0 hidden md:block left-1/2 transform -translate-x-1/2 -top-40 md:left-auto md:translate-x-0 md:ml-[15rem]">
              <img src={stethoscope} alt="stethoscope" className="mr-[16rem] h-[100px] w-[100px] mt-8 md:block md:h-[240px] md:w-[350px] rotate-[170deg]" />
            </div>
            {/* Blurry box */}
            <div className="block backdrop-blur-sm z-10 bg-slate-200/30 dark:bg-slate-700/30 p-4 md:p-6 rounded-2xl h-24 md:h-72 md:w-[56.5rem]">
              <div className="absolute top-[-0.75rem] md:top-[-1.15rem] pr-2 right-0 start_journey text-[2.5rem] md:text-[9rem] text-right leading-[4rem] md:leading-[7rem] text-white font-shubbak-bold z-20">
                ابــدأ
              </div>
              <div className="absolute top-[2rem] md:top-[4.5rem] pr-2 right-0 start_journey text-[2.5rem] md:text-[9rem] text-right text-white font-shubbak-bold z-20">
                مشوارك معنا
              </div>
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
