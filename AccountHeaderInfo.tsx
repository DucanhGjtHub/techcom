import React, { useState, useEffect } from 'react';

interface AccountHeaderInfoProps {
  onBack: () => void;
}

const PIE_CHART_ICON_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763085591/z7221914938020_96dd4570d183978f96c416dd5a506724_anmhdp.png';

const AccountHeaderInfo: React.FC<AccountHeaderInfoProps> = ({ onBack }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const syncBalance = () => {
      try {
        const savedBalance = localStorage.getItem('userBalance');
        if (savedBalance) {
          setBalance(JSON.parse(savedBalance));
        }
      } catch (error) {
        console.error("Error reading balance from localStorage in AccountHeaderInfo", error);
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
    // The main container is now 'relative' to scroll with the page, instead of 'absolute' (fixed).
    // The 'relative' positioning ensures its children with 'absolute' are positioned correctly within this block.
    <div className="relative w-[375px] h-[235px] bg-white text-black">
      {/* Header with back button, title, and add button */}
      <header className="flex items-center justify-between pt-12 pb-4 px-5">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">Accounts & Cards</h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Add">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </header>

      {/* Balance and Chart section, positioned absolutely per spec */}
      {/* Starts at x=20, y=90. Container uses left/right to achieve this. */}
      <div className="absolute top-[90px] left-[20px] right-[20px] flex items-start justify-between">
        {/* You own card - w250 h65 */}
        <div className="bg-white text-black rounded-xl p-3 shadow-md w-[250px] h-[65px] border border-gray-200">
          <p className="text-xs text-gray-500">You own</p>
          <div className="flex items-center mt-1">
            <div className="flex items-baseline">
                {isBalanceVisible ? (
                    <>
                    <span 
                        className="font-semibold mr-1 text-lg"
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
                    </>
                ) : (
                    <span
                    className="font-semibold text-lg"
                    style={{ color: '#333131ff' }}
                    >
                    **********
                    </span>
                )}
            </div>
            <button onClick={() => setIsBalanceVisible(!isBalanceVisible)} className="focus:outline-none text-gray-700 hover:text-gray-800 transition-colors ml-2">
              {isBalanceVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Pie Chart Button */}
        <button className="bg-white rounded-xl shadow-md w-[65px] h-[65px] flex items-center justify-center border border-gray-200">
          <img src={PIE_CHART_ICON_URL} alt="Chart icon" className="w-9 h-9" />
        </button>
      </div>

      {/* Tabs, positioned absolutely below the balance card */}
      <div className="absolute top-[179px] left-[20px] flex items-center gap-2">
        <button className="bg-black text-white text-sm font-semibold rounded-full px-4 py-1.5">Accounts</button>
        <button className="bg-white text-black border border-gray-200 text-sm font-semibold rounded-full px-4 py-1.5 hover:bg-gray-100">Family</button>
        <button className="bg-white text-black border border-gray-200 text-sm font-semibold rounded-full px-4 py-1.5 hover:bg-gray-100">Cards</button>
      </div>
    </div>
  );
};
export default AccountHeaderInfo;