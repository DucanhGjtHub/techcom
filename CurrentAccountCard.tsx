import React, { useState, useEffect } from 'react';

const XUSIEURE_HEADER_BG = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763190556/z7221922912571_9637085c94c4e2d349f3460a3ce1d73c_ywlqcf.jpg';
const CURRENT_ACCOUNT_ICON_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763190403/z7226447505379_2c0ea01065ee094d608c35f60e70f6d7_mct4ye.jpg';

const CurrentAccountCard: React.FC = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const syncBalance = () => {
        try {
            const savedBalance = localStorage.getItem('userBalance');
            if (savedBalance) {
                setBalance(JSON.parse(savedBalance));
            }
        } catch (error) {
            console.error("Error reading balance from localStorage in CurrentAccountCard", error);
        }
    };
    
    syncBalance();

    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'userBalance') {
            syncBalance();
        }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    // Per request w345 h175. No global background, rounded corners on the container.
    <div className="w-[345px] h-[175px] rounded-2xl shadow-lg overflow-hidden flex flex-col">
      {/* Header section with background image */}
      <div
        className="h-[40px] flex items-center px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${XUSIEURE_HEADER_BG})` }}
      >
        <span className="font-bold text-sm tracking-widest text-black">XUSIEURE</span>
      </div>

      {/* Body section with white background and dark text */}
      <div className="flex-grow p-4 flex flex-col justify-between bg-white text-black">
        <div className="flex items-start gap-3">
          {/* New Image Icon */}
          <div className="w-7 h-7 flex-shrink-0 mt-0.5">
            <img src={CURRENT_ACCOUNT_ICON_URL} alt="Current Account Icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="font-semibold text-base">Current Account</p>
            <p className="text-sm text-gray-500 tracking-wider mt-1">1903 9241 6250 14</p>
          </div>
        </div>

        {/* Balance */}
        <div className="text-right">
            <div className="border-t border-gray-200 w-full mb-3"></div>
             <div className="flex items-baseline justify-end">
                <span 
                    className="font-bold text-xl mr-1"
                    style={{ color: '#6B7280' }}
                >
                    VND
                </span>
                <span
                className="font-semibold text-lg"
                style={{ color: '#333131ff' }}
                >
                {balance.toLocaleString('en-US')}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};
export default CurrentAccountCard;