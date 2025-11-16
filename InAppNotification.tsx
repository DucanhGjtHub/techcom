import React, { useState, useEffect } from 'react';

// --- INTERFACE ĐỊNH NGHĨA PROPS ---
interface InAppNotificationProps {
  onClose: () => void; // Hàm để đóng thông báo
}

// --- CUSTOM HOOK: useStoredState ---
// Hook tùy chỉnh để quản lý state và tự động lưu/đọc từ localStorage.
const useStoredState = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Lỗi đọc localStorage key “${key}”:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Lỗi ghi localStorage key “${key}”:`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

// --- COMPONENT CHÍNH: InAppNotification ---
const InAppNotification: React.FC<InAppNotificationProps> = ({ onClose }) => {
  // Sử dụng custom hook để quản lý các trường dữ liệu có thể chỉnh sửa.
  const [amount, setAmount] = useStoredState('inApp_notification_amount', '+ VND 30,000');
  const [account, setAccount] = useStoredState('inApp_notification_account', '19039241625014');
  const [balance, setBalance] = useStoredState('inApp_notification_balance', '30,000');
  const [senderInfo, setSenderInfo] = useStoredState('inApp_notification_sender', 'NGUYEN Quang Duc Anh tu Liobank');

  // Hàm xử lý chung cho việc chỉnh sửa một giá trị.
  const handleEdit = (setter: (value: string) => void, currentValue: string, promptMessage: string) => {
    const newValue = prompt(promptMessage, currentValue);
    if (newValue !== null) {
      setter(newValue);
    }
  };

  return (
    // Container chính cho thông báo nền trắng.
    <div
      className="w-[335px] h-[150px] bg-white rounded-2xl shadow-lg p-4 flex flex-col font-sans"
      role="alert"
      aria-live="assertive"
    >
      {/* Hàng trên cùng: Icon, Số tiền, và Nút đóng */}
      <div className="flex justify-between items-start">
        {/* Icon và số tiền */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 110-20 10 10 0 010 20z" />
            </svg>
          </div>
          <button onClick={() => handleEdit(setAmount, amount, 'Nhập số tiền mới:')} className="text-green-600 font-bold text-lg">
            {amount}
          </button>
        </div>
        {/* Nút đóng */}
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close notification">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Phần thân: Chi tiết giao dịch */}
      <div className="flex-grow flex flex-col justify-center pl-10 gap-1 mt-1">
        <button onClick={() => handleEdit(setAccount, account, 'Nhập số tài khoản mới:')} className="text-left text-sm text-gray-800">
          Account: {account}
        </button>
        <button onClick={() => handleEdit(setBalance, balance, 'Nhập số dư mới:')} className="text-left text-sm text-gray-800">
          Balance: VND {balance}
        </button>
        <button onClick={() => handleEdit(setSenderInfo, senderInfo, 'Nhập thông tin người gửi:')} className="text-left text-sm text-gray-800">
          {senderInfo}
        </button>
      </div>
    </div>
  );
};

export default InAppNotification;
