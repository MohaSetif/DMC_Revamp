import { faServer, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const DOT_COUNT = 7;

function MedicationForm() {
  const [lightedDots, setLightedDots] = useState(Array(4 * DOT_COUNT).fill(false));
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    let index = 0;
    const interval = setInterval(() => {
      setLightedDots(() => {
        const newDots = Array(4 * DOT_COUNT).fill(false);
        if (index < DOT_COUNT) {
          newDots[index] = true;
        } else if (index < 2 * DOT_COUNT) {
          newDots[2 * DOT_COUNT + (index % DOT_COUNT)] = true;
        } else if (index < 3 * DOT_COUNT) {
          newDots[3 * DOT_COUNT - (index % DOT_COUNT) - 1] = true;
        } else {
          newDots[DOT_COUNT - (index % DOT_COUNT)] = true;
        }
        return newDots;
      });

      if (++index >= 4 * DOT_COUNT) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 500);
  };

  return (
    <div className='w-full max-w-md h-auto md:h-64 font-shubbak-semi-bold group isolate flex flex-col justify-center items-center rounded-2xl border border-card_border bg-card_bg shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] p-4 md:p-6'>
      <div className="flex flex-col md:flex-row justify-between items-center w-full mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faUser} size='2x' color='gray' />
          <span className="text-card_title mt-2 text-sm md:text-base">المستخدم</span>
        </div>
        <div className="flex-1 flex flex-col md:flex-row justify-between items-center mx-4 space-y-2 md:space-y-0 md:space-x-2">
          {Array(DOT_COUNT).fill(null).map((_, idx) => (
            <div key={idx} className={`w-2 h-2 md:w-1 md:h-1 rounded-full bg-gray-400 dark:bg-gray-800 transition-all delay-75 ${lightedDots[idx] ? 'bg-purple-800 dark:bg-purple-300' : ''}`}></div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faServer} size='2x' color='gray' />
          <span className="text-card_title mt-2 text-sm md:text-base">DMC</span>
        </div>
        <div className="flex-1 flex flex-col md:flex-row justify-between items-center mx-4 space-y-2 md:space-y-0 md:space-x-2">
          {Array(DOT_COUNT).fill(null).map((_, idx) => (
            <div key={idx + 2 * DOT_COUNT} className={`w-2 h-2 md:w-1 md:h-1 rounded-full bg-gray-400 dark:bg-gray-800 transition-all delay-75 ${lightedDots[2 * DOT_COUNT + idx] ? 'bg-purple-800 dark:bg-purple-300' : ''}`}></div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faUser} size='2x' color='gray' />
          <span className="text-card_title mt-2 text-sm md:text-base">الصـيدلــي</span>
        </div>
      </div>
      <button
        className="py-2 px-4 bg-slate-800 hover:bg-slate-600 text-white rounded-md"
        onClick={startAnimation}
        disabled={isAnimating}
      >
        أطلب دواء
      </button>
    </div>
  );
}

export default MedicationForm;
