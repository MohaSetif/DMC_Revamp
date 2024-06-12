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
          // Light up dots from user 1 to server
          newDots[index] = true;
        } else if (index < 2 * DOT_COUNT) {
          // Light up dots from server to user 2
          newDots[2 * DOT_COUNT + (index % DOT_COUNT)] = true;
        } else if (index < 3 * DOT_COUNT) {
          // Light up dots from user 2 to server again
          newDots[3 * DOT_COUNT - (index % DOT_COUNT) - 1] = true;
        } else {
          // Light up dots from server to user 1
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
    <div className='w-96 h-64 font-shubbak-semi-bold group isolate flex flex-col justify-center items-center rounded-2xl border border-card_border bg-card_bg shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] p-4'>
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faUser} size='2xl' color='gray' />
          <span className="text-card_title mt-2">المستخدم</span>
        </div>
        <div className="flex-1 flex justify-between items-center mx-4">
          {Array(DOT_COUNT).fill(null).map((_, idx) => (
            <div key={idx} className={`w-1 h-1 rounded-full bg-gray-600 transition-all delay-75 ${lightedDots[idx] ? 'bg-blue-500 dark:bg-blue-300' : ''}`}></div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faServer} size='2xl' color='gray' />
          <span className="text-card_title mt-2">DMC</span>
        </div>
        <div className="flex-1 flex justify-between items-center mx-4">
          {Array(DOT_COUNT).fill(null).map((_, idx) => (
            <div key={idx + 2 * DOT_COUNT} className={`w-1 h-1 rounded-full bg-gray-600 transition-all delay-75 ${lightedDots[2 * DOT_COUNT + idx] ? 'bg-blue-500 dark:bg-blue-300' : ''}`}></div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faUser} size='2xl' color='gray' />
          <span className="text-card_title mt-2">الصـيدلــي</span>
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
