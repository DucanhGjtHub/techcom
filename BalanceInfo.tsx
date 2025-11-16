import React from 'react';

// URL cho logo Techcombank.
const LOGO_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763079513/logo-techcombank-vector-3_1_-Photoroom_z0xlep.png';

interface BalanceInfoProps {
  isBalanceVisible: boolean;
  onToggleVisibility: () => void;
}

// Component con cho icon mắt (ẩn/hiện)
const ToggleVisibilityIcon: React.FC<{isVisible: boolean, onClick: () => void}> = ({ isVisible, onClick }) => (
  <button onClick={onClick} className="focus:outline-none text-gray-500 hover:text-gray-700 transition-colors">
    {isVisible ? (
      // Icon mắt mở
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ) : (
      // Icon mắt gạch chéo
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    )}
  </button>
);


const BalanceInfo: React.FC<BalanceInfoProps> = ({ isBalanceVisible, onToggleVisibility }) => {
  return (
    // Phần trên: Available Balance
    // Xóa đường viền dưới để tạo thành một khối liền mạch với ProfitPromo
    <div className="p-3 flex items-center justify-between h-[60px]">
      <div className="flex items-center gap-2">
        <img src={LOGO_URL} alt="Techcombank Logo" className="w-6 h-6"/>
        <div>
          <p className="text-[11px] text-gray-500 font-medium">Available Balance</p>
          <p className="text-base font-bold tracking-tight">
            VND {isBalanceVisible ? '12,345,678' : '**********'}
          </p>
        </div>
      </div>
      <div className="pr-1">
        <ToggleVisibilityIcon isVisible={isBalanceVisible} onClick={onToggleVisibility} />
      </div>
    </div>
  );
};

export default BalanceInfo;