import React, { useState, useEffect } from 'react';

const MultifactorAuthentication: React.FC = () => {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  const generateRandomNumbers = () => {
    const randomNums = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10));
    setRandomNumbers(randomNums);
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  return (
    <div className="p-5 mb-10 w-96 group isolate flex flex-col rounded-2xl border border-card_border bg-card_bg shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden">
      <div className="relative z-10 flex-none px-2 order-last pb-2">
        <h3 className="text-sm/3 text-card_title font-shubbak-semi-bold text-right">التحقق من الهوية</h3>
        <p className="mt-2 text-sm text-card_text text-right">
            يتم فرض إعدادات العوامل المتعددة للخدمة الذاتية لكل مستخدم تلقائيًا أثناء تسجيل الدخول.
        </p>
      </div>
      <div
        className="relative flex-auto select-none"
        style={{ minHeight: '10.25rem' }}
        aria-hidden="true"
      >
        <div className="isolate flex h-full items-center justify-center">
          <div className="relative">
            <div className="flex gap-3">
              {randomNumbers.map((num, index) => (
                <div
                  key={index}
                  onMouseEnter={generateRandomNumbers}
                  className="flex h-16 w-12 items-center justify-center overflow-hidden rounded-xl bg-card-nbr-box hover:border border-blue-500 transition-colors duration-300"
                  style={{
                    boxShadow: '0 10px 19px 4px rgb(0 0 0 / 0.16), 0 -10px 16px -4px rgb(255 255 255 / 0.04), 0 0 0 1px rgb(255 255 255 / 0.01), 0 1px 0 0 rgb(255 255 255 / 0.02)',
                  }}
                >
                  <span className='text-card_title font-semibold text-2xl flex pl-2'>{num}</span>
                  <div
                    data-dot="true"
                    className="z-10 h-2 w-2 rounded-full bg-white"
                    style={{
                      boxShadow: '0 0 3px 1px rgb(0 0 0 / 0.3)',
                      opacity: 0,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultifactorAuthentication;
