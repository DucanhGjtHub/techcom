import React, { useState, useEffect } from 'react';

// URL for the bank logo, matching the screenshot style.
const BANK_LOGO_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763273180/mb-bank-logo-inkythuatso-15-14-41-01_1_v14tda.png';

// Custom hook to manage state and persist it to localStorage.
const useStoredState = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing localStorage key “${key}”:`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

const Notifications: React.FC = () => {
  // Using the custom hook for all editable fields to persist their state.
  const [amount, setAmount] = useStoredState('notification_amount', '+ VND 5,000');
  const [account, setAccount] = useStoredState('notification_account', '19039241625014');
  const [balance, setBalance] = useStoredState('notification_balance', '30,000');
  const [message, setMessage] = useStoredState('notification_message', 'NGUYEN QUANG DUC ANH chuyen tien de n NGUYEN QUANG DUC ANH - 1903924162 5...');

  // Generic handler for editing a value via prompt.
  const handleEdit = (setter: (value: string) => void, currentValue: string, promptMessage: string) => {
    const newValue = prompt(promptMessage, currentValue);
    if (newValue !== null) {
      setter(newValue);
    }
  };
  
  return (
    // Main container for the iOS-style push notification.
    // Dimensions are set to match the user's request, placed within the parent's container.
    <div
      className="w-[335px] h-[105px] bg-gray-900/70 backdrop-blur-2xl rounded-3xl text-white p-3 shadow-lg flex items-start gap-3 font-sans"
      aria-label="Transaction Notification"
    >
      {/* Left side: Bank Icon */}
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
        <img src={BANK_LOGO_URL} alt="Bank Logo" className="w-7 h-7" />
      </div>

      {/* Right side: Notification Details */}
      <div className="flex-grow flex flex-col gap-0.5 min-w-0">
        {/* Top row: Amount and Timestamp */}
        <div className="flex justify-between items-center">
          <button onClick={() => handleEdit(setAmount, amount, 'Enter new amount (e.g., + VND 5,000):')} className="font-bold text-sm text-left">
            {amount}
          </button>
          <p className="text-xs text-gray-300 flex-shrink-0">now</p>
        </div>

        {/* Account and Balance */}
        <button onClick={() => handleEdit(setAccount, account, 'Enter new account number:')} className="text-xs text-left">
          Account: {account}
        </button>

        <button onClick={() => handleEdit(setBalance, balance, 'Enter new balance (e.g., 30,000):')} className="text-xs text-left">
          Balance: VND {balance}
        </button>

        {/* Message */}
        <button onClick={() => handleEdit(setMessage, message, 'Enter new message:')} className="text-xs text-gray-300 mt-0.5 text-left w-full overflow-hidden">
          <p className="line-clamp-2">{message}</p>
        </button>
      </div>
       {/* CSS for line-clamp */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Notifications;
