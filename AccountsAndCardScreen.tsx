import React from 'react';
import AccountHeaderInfo from './AccountHeaderInfo';
import CurrentAccountCard from './CurrentAccountCard';
import UPointsCard from './UPointsCard';

interface AccountsAndCardScreenProps {
  onBack: () => void;
}

const AccountsAndCardScreen: React.FC<AccountsAndCardScreenProps> = ({ onBack }) => {
  return (
    <div 
      className="w-full h-full bg-[#1c1c1e] text-white overflow-y-auto"
    >
        {/* All content is now in a single scrollable flow */}
        <div className="flex flex-col items-center">
            
            {/* Header is now part of the scrollable content */}
            <AccountHeaderInfo onBack={onBack} />
            
            {/* Spacer div to push the first card down to the correct y-position */}
            {/* Header height (235px) + Spacer height (15px) = 250px starting position for the card */}
            <div style={{ height: '15px' }} aria-hidden="true" />

            {/* Container for cards and link below the spacer */}
            <div className="flex flex-col items-center gap-4 pb-8">
                <CurrentAccountCard />
                <UPointsCard />

                <button className="text-blue-500 font-semibold text-sm mt-4">
                    See your archived account
                </button>
            </div>
        </div>
    </div>
  );
};

export default AccountsAndCardScreen;