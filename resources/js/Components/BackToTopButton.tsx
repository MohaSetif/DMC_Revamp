import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

function BackToTopButton() {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="hidden font-shubbak-semi-bold mt-[8.4rem] lg:flex items-center">
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-48 relative flex items-center justify-center p-4 bg-slate-500 text-white rounded-full transition-all duration-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Back to top"
      >
        <span className={`flex justify-center items-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          عد إلى الأعلى
          <FontAwesomeIcon icon={faArrowUp} />
        </span>
        <span className={`absolute transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          !اضغط الآن
        </span>
      </button>
    </div>
  );
}

export default BackToTopButton;