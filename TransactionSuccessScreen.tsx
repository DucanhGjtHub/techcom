import React, { useState, useEffect } from 'react';

// --- CÁC HẰNG SỐ ---
// URL cho các thành phần hình ảnh của giao diện.
const BACKGROUND_IMAGE_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763255026/z7221914938020_96dd4570d183978f96c416dd5a506724_b%E1%BA%A3n_sao_3_jpdbc8.png';
const TOP_BLOCK_IMAGE_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763242138/z7221914938020_96dd4570d183978f96c416dd5a506724_b%E1%BA%A3n_sao_5_yzfrgn.png';
const BOTTOM_BLOCK_IMAGE_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763241923/z7221914938020_96dd4570d183978f96c416dd5a506724_b%E1%BA%A3n_sao_6_off2ui.png';

// Danh sách ngân hàng được cập nhật theo yêu cầu: có tên hiển thị và giá trị thực tế.
const BANK_SUGGESTIONS = [
  { display: 'Agribank (Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam)', value: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam' },
  { display: 'Vietcombank (Ngân hàng TMCP Ngoại thương Việt Nam)', value: 'Ngân hàng TMCP Ngoại thương Việt Nam' },
  { display: 'VietinBank (Ngân hàng TMCP Công Thương Việt Nam)', value: 'Ngân hàng TMCP Công Thương Việt Nam' },
  { display: 'BIDV (Ngân hàng TMCP Đầu tư và Phát triển Việt Nam)', value: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam' },
  { display: 'OCB (Ngân hàng TMCP Phương Đông)', value: 'Ngân hàng TMCP Phương Đông' },
  { display: 'VPBank (Ngân hàng TMCP Việt Nam Thịnh Vượng)', value: 'Ngân hàng TMCP Việt Nam Thịnh Vượng' },
  { display: 'MSB (Ngân hàng TMCP Hàng hải Việt Nam)', value: 'Ngân hàng TMCP Hàng hải Việt Nam' },
  { display: 'Ban Viet Bank (Ngân hàng TMCP Bản Việt)', value: 'Ngân hàng TMCP Bản Việt' },
  { display: 'Techcombank (Ngân hàng TMCP Kỹ thương Việt Nam)', value: 'Ngân hàng TMCP Kỹ thương Việt Nam' },
  { display: 'MB (Ngân hàng TMCP Quân đội)', value: 'Ngân hàng TMCP Quân đội' },
  { display: 'ACB (Ngân hàng TMCP Á Châu)', value: 'Ngân hàng TMCP Á Châu' },
  { display: 'Sacombank (Ngân hàng TMCP Sài Gòn Thương Tín)', value: 'Ngân hàng TMCP Sài Gòn Thương Tín' },
  { display: 'TPBank (Ngân hàng TMCP Tiên Phong)', value: 'Ngân hàng TMCP Tiên Phong' },
  { display: 'HDBank (Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh)', value: 'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh' },
  { display: 'VIB (Ngân hàng TMCP Quốc tế Việt Nam)', value: 'Ngân hàng TMCP Quốc tế Việt Nam' },
  { display: 'SHB (Ngân hàng TMCP Sài Gòn - Hà Nội)', value: 'Ngân hàng TMCP Sài Gòn - Hà Nội' },
  { display: 'SeABank (Ngân hàng TMCP Đông Nam Á)', value: 'Ngân hàng TMCP Đông Nam Á' },
  { display: 'Eximbank (Ngân hàng TMCP Xuất Nhập khẩu Việt Nam)', value: 'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam' }
];


// --- INTERFACE ĐỊNH NGHĨA PROPS ---
interface TransactionSuccessScreenProps {
  onClose: () => void;
}

// --- CUSTOM HOOK: useStoredState ---
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

// --- COMPONENT CHÍNH: TransactionSuccessScreen ---
const TransactionSuccessScreen: React.FC<TransactionSuccessScreenProps> = ({ onClose }) => {
  const [amount, setAmount] = useStoredState('transaction_amount', '23,654');
  const [recipientName, setRecipientName] = useStoredState('transaction_recipientName', 'NGUYEN QUANG DUC ANH');
  const [recipientAccount, setRecipientAccount] = useStoredState('transaction_recipientAccount', '0362526606');
  const [bankName, setBankName] = useStoredState('transaction_bankName', 'Liobank - Digital bank by OCB');
  const [message, setMessage] = useStoredState('transaction_message', 'NGUYEN QUANG DUC ANH');
  const [transferDate, setTransferDate] = useStoredState('transaction_transferDate', '16 Nov 2025 at 3:27 AM');
  const [transactionId, setTransactionId] = useStoredState('transaction_transactionId', 'FT25321728654762');

  const handleEdit = (setter: (value: string) => void, currentValue: string, promptMessage: string) => {
    const newValue = prompt(promptMessage, currentValue);
    if (newValue !== null) {
      setter(newValue);
    }
  };

  // --- HÀM MỚI: Xử lý chỉnh sửa tên ngân hàng với gợi ý ---
  const handleBankEdit = () => {
    // Tạo danh sách ngân hàng có đánh số để hiển thị trong prompt, sử dụng thuộc tính 'display'.
    const suggestionText = BANK_SUGGESTIONS.map((bank, index) => `${index + 1}. ${bank.display}`).join('\n');
    const promptMessage = `Chọn một ngân hàng bằng cách nhập số thứ tự, hoặc nhập một tên khác:\n\n${suggestionText}`;

    const userInput = prompt(promptMessage, bankName);

    // Nếu người dùng bấm "Cancel", không làm gì cả.
    if (userInput === null) {
      return;
    }

    // Chuyển đổi lựa chọn của người dùng thành một số (nếu có thể).
    const choiceIndex = parseInt(userInput, 10) - 1;

    // Kiểm tra xem người dùng có nhập một số hợp lệ tương ứng với một gợi ý không.
    if (!isNaN(choiceIndex) && choiceIndex >= 0 && choiceIndex < BANK_SUGGESTIONS.length) {
      // Nếu có, đặt tên ngân hàng thành giá trị 'value' của gợi ý đã chọn.
      setBankName(BANK_SUGGESTIONS[choiceIndex].value);
    } else {
      // Nếu không, sử dụng trực tiếp giá trị người dùng đã nhập (tên ngân hàng tùy chỉnh).
      setBankName(userInput);
    }
  };


  const handleUpdateTransferDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
    const newDate = `${day} ${month} ${year} at ${hours}:${minutesStr} ${ampm}`;
    setTransferDate(newDate);
  };

  const handleUpdateTransactionId = () => {
    const randomPart = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    const newId = `FT2532${randomPart}`;
    setTransactionId(newId);
  };

  return (
    <div className="absolute inset-0 z-30 font-sans">
      <img
        src={BACKGROUND_IMAGE_URL}
        alt="Nền chi tiết giao dịch"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative w-full h-full">
        <img
          src={TOP_BLOCK_IMAGE_URL}
          alt="Chuyển khoản thành công"
          className="absolute top-[110px] left-[20px] h-auto w-[165px]"
        />
        <button
          onClick={() => handleEdit(setAmount, amount, 'Nhập số tiền mới:')}
          className="absolute top-[245px] left-[20px] text-left w-[335px]"
        >
          <p className="font-semibold text-3xl text-black">
            Successfully transferred
          </p>
          <p className="font-semibold text-3xl text-black">
            {amount}
          </p>
        </button>
        <div className="absolute top-[370px] left-[20px] w-[335px] flex flex-col gap-2">
          <div className='flex flex-col gap-0'>
            <p className="text-sm text-gray-500">Recipient details</p>
            <button onClick={() => handleEdit(setRecipientName, recipientName, 'Nhập tên người nhận:')} className="text-left w-full">
                <p className="text-base font-bold text-black uppercase">{recipientName}</p>
            </button>
            <button onClick={() => handleEdit(setRecipientAccount, recipientAccount, 'Nhập số tài khoản/SĐT:')} className="text-left w-full">
                <p className="text-base font-bold text-black">{recipientAccount}</p>
            </button>
          </div>
          <div className='flex flex-col gap-0'>
            <p className="text-sm text-gray-500">Recipient bank</p>
            {/* SỬ DỤNG HÀM MỚI Ở ĐÂY */}
            <button onClick={handleBankEdit} className="text-left w-full">
                <p className="text-base font-bold text-black">{bankName}</p>
            </button>
          </div>
          <div className='flex flex-col gap-0'>
            <p className="text-sm text-gray-500">Message</p>
            <button onClick={() => handleEdit(setMessage, message, 'Nhập lời nhắn:')} className="text-left w-full">
                <p className="text-base font-bold text-black uppercase">{message}</p>
            </button>
          </div>
          <div className='flex flex-col gap-0'>
            <p className="text-sm text-gray-500">Transfer date</p>
            <button onClick={handleUpdateTransferDate} className="text-left w-full">
                <p className="text-base font-bold text-black">{transferDate}</p>
            </button>
          </div>
          <div className='flex flex-col gap-0'>
            <p className="text-sm text-gray-500">Transaction ID</p>
            <button onClick={handleUpdateTransactionId} className="text-left w-full">
                <p className="text-base font-bold text-black">{transactionId}</p>
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            <p className="text-sm text-gray-500">Reference code</p>
          </div>
        </div>
        <div className="absolute bottom-[20px] left-[20px] w-[335px]">
          <img
            src={BOTTOM_BLOCK_IMAGE_URL}
            alt="Các nút chức năng"
            className="w-full h-auto"
          />
          <button
            onClick={onClose}
            className="absolute bottom-[0px] left-0 w-full h-[56px] bg-transparent rounded-full"
            aria-label="Done"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccessScreen;