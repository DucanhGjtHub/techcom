import React, { useState, useEffect, useCallback } from 'react';

// Định nghĩa các props mà component này nhận vào
interface PasscodeScreenProps {
  onClose: () => void; // Hàm sẽ được gọi khi người dùng bấm nút quay lại
  onSuccess: () => void; // Hàm sẽ được gọi khi người dùng nhập đúng mật mã
}

// Hằng số cho mật mã đúng và độ dài của mật mã
const CORRECT_PASSCODE = '000000';
const PASSCODE_LENGTH = 6;

// URL cho logo Techcombank (lấy từ component Hotline)
const LOGO_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763079513/logo-techcombank-vector-3_1_-Photoroom_z0xlep.png';


const PasscodeScreen: React.FC<PasscodeScreenProps> = ({ onClose, onSuccess }) => {
  // State để lưu trữ mật mã người dùng đang nhập
  const [passcode, setPasscode] = useState('');
  // State để kiểm soát trạng thái lỗi (khi nhập sai)
  const [isError, setIsError] = useState(false);

  // Hàm xử lý khi người dùng bấm một phím số
  const handleKeyPress = (key: string) => {
    // Nếu đang có lỗi hoặc đã nhập đủ 6 số thì không làm gì cả
    if (isError || passcode.length >= PASSCODE_LENGTH) return;
    setPasscode(prev => prev + key);
  };

  // Hàm xử lý khi người dùng bấm nút xóa
  const handleBackspace = () => {
    if (isError) return;
    setPasscode(prev => prev.slice(0, -1));
  };

  // Hàm để reset lại trạng thái nhập mật mã, được gọi khi nhập sai
  const resetPasscode = useCallback(() => {
    setIsError(true);
    // Sau 0.5 giây, xóa mật mã đã nhập và bỏ trạng thái lỗi
    setTimeout(() => {
      setPasscode('');
      setIsError(false);
    }, 500);
  }, []);

  // useEffect sẽ chạy mỗi khi giá trị của `passcode` thay đổi
  useEffect(() => {
    // Khi người dùng đã nhập đủ 6 số
    if (passcode.length === PASSCODE_LENGTH) {
      if (passcode === CORRECT_PASSCODE) {
        // Nếu đúng, chờ 0.2 giây để tạo cảm giác hoàn tất rồi gọi hàm onSuccess
        setTimeout(onSuccess, 200);
      } else {
        // Nếu sai, gọi hàm reset
        resetPasscode();
      }
    }
  }, [passcode, onSuccess, resetPasscode]);

  // Component con để hiển thị các gạch chân của ô nhập mật mã
  const PasscodeIndicator = () => (
    <div className={`flex items-center justify-between w-[300px] my-6 transition-transform duration-500 ${isError ? 'animate-shake' : ''}`}>
      {[...Array(PASSCODE_LENGTH)].map((_, index) => {
        const isFilled = index < passcode.length;
        return (
          <div key={index} className="w-10 h-12 flex flex-col items-center justify-between py-1" aria-hidden="true">
            {/* Vòng tròn đen hiển thị khi đã nhập số */}
            <div className={`w-[18px] h-[18px] rounded-full transition-all duration-200 ${isFilled ? 'bg-black' : 'bg-transparent'}`}></div>
            
            {/* Gạch chân dưới mỗi vị trí nhập */}
            <div
              className={`w-full h-0.5 rounded-full transition-colors ${
                 isFilled ? 'bg-gray-300' : 'bg-blue-600'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
  
  // Dữ liệu cho các nút trên bàn phím
  const keypadKeys = [
    { key: '1', letters: ' ' }, { key: '2', letters: 'ABC' }, { key: '3', letters: 'DEF' },
    { key: '4', letters: 'GHI' }, { key: '5', letters: 'JKL' }, { key: '6', letters: 'MNO' },
    { key: '7', letters: 'PQRS' }, { key: '8', letters: 'TUV' }, { key: '9', letters: 'WXYZ' },
    { key: '', letters: '' }, { key: '0', letters: ' ' }, { key: 'backspace', letters: '' }
  ];

  return (
    // Container chính của màn hình, nằm trên cùng (z-10) và che phủ toàn bộ
    <div className="absolute inset-0 bg-white z-10 flex flex-col font-sans">
      {/* Header chứa nút quay lại */}
      <header className="flex items-center pt-4 pl-4 h-[60px] flex-shrink-0">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </header>

      {/* Phần nội dung chính */}
      <main className="flex-grow flex flex-col items-center pt-8 px-4 text-center">
        {/* Logo Techcombank */}
        <img src={LOGO_URL} alt="Techcombank Logo" className="w-20 h-20 mb-4" />

        <h1 className="text-2xl font-bold text-gray-900">Enter your passcode</h1>
        
        <PasscodeIndicator />

        <button className="text-blue-600 font-medium text-sm mt-2 hover:underline">
          Forgot passcode?
        </button>
      </main>

      {/* Footer chứa bàn phím số đã được cập nhật */}
      <footer className="bg-[#f0f0f5] py-4 pb-8 flex-shrink-0 flex justify-center">
        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
          {keypadKeys.map(({ key, letters }, index) => {
            // Ô trống để căn chỉnh vị trí cho phím số 0
            if (key === '') {
              return <div key={index} />;
            }
            // Nút xóa
            if (key === 'backspace') {
              return (
                <div key={index} className="w-[100px] h-[50px] flex items-center justify-center">
                    <button
                      onClick={handleBackspace}
                      className="flex items-center justify-center rounded-xl transition-colors w-full h-full active:bg-gray-300/50"
                      aria-label="Backspace"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 18.5H9.75L3.5 12L9.75 5.5H22V18.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17.5 9.5L12.5 14.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.5 9.5L17.5 14.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                </div>
              );
            }
            // Các nút số thông thường
            return (
              <button
                key={index}
                onClick={() => handleKeyPress(key)}
                className="w-[115px] h-[47px] rounded-lg bg-white active:bg-gray-350 transition-colors focus:outline-none flex flex-col items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.50)]"
              >
                <span className="text-3xl font-boltsemi text-black block leading-none">{key}</span>
                {letters.trim() && <span className="text-[8px] font-bold text-black tracking-[0.2em] block uppercase">{letters}</span>}
              </button>
            );
          })}
        </div>
      </footer>
       {/* CSS cho animataion rung lắc khi nhập sai */}
       <style>{`
          @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
          }
          .animate-shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          }
        `}</style>
    </div>
  );
};

export default PasscodeScreen;