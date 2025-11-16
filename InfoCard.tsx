import React, { useState } from 'react';

// URL cho logo Techcombank.
const LOGO_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763079513/logo-techcombank-vector-3_1_-Photoroom_z0xlep.png';
// URL cho icon "Get Profit"
const GET_PROFIT_ICON_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763082170/z7221543231082_2fa552704271b7e802d0e5019eee6de4_q1zusp.png';


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


const InfoCard: React.FC = () => {
    const [isBalanceVisible, setIsBalanceVisible] = useState(false);
    // State để lưu trữ số dư, khởi tạo từ localStorage hoặc giá trị mặc định
    const [balance, setBalance] = useState(() => {
      try {
        const savedBalance = localStorage.getItem('userBalance');
        // Nếu có giá trị trong localStorage, dùng nó
        if (savedBalance) {
          return JSON.parse(savedBalance);
        }
      } catch (error) {
        console.error("Error reading balance from localStorage", error);
      }
      // Nếu không có hoặc có lỗi, dùng giá trị mặc định
      return 23654;
    });

    // Hàm xử lý khi người dùng bấm vào số dư để thay đổi
    const handleBalanceClick = () => {
      // Chỉ cho phép thay đổi khi số dư đang hiển thị
      if (!isBalanceVisible) return;

      const newBalanceStr = prompt("Nhập số dư mới:", String(balance));
      // Người dùng bấm Cancel
      if (newBalanceStr === null) return;

      // Chuyển đổi chuỗi thành số, loại bỏ dấu phẩy (nếu có)
      const newBalanceNum = parseFloat(newBalanceStr.replace(/,/g, ''));
      
      // Kiểm tra nếu là một số hợp lệ
      if (!isNaN(newBalanceNum)) {
        // Cập nhật state
        setBalance(newBalanceNum);
        // Lưu giá trị mới vào localStorage để nó được giữ lại sau khi tải lại trang
        localStorage.setItem('userBalance', JSON.stringify(newBalanceNum));
      } else {
        alert("Vui lòng nhập một số hợp lệ.");
      }
    };
  
    // Điều kiện để hiển thị "VND": chỉ khi số dư dưới 100 triệu
    const shouldShowVnd = balance < 100000000;

    return (
      <div className="absolute top-[100px] right-0 w-[255px] h-[210px] bg-white rounded-l-lg shadow-lg text-black flex flex-col">
        
        {/* Phần trên: Available Balance */}
        <div className="py-2 pl-6 pr-4 flex items-end justify-between h-[60px]">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Techcombank Logo" className="w-8 h-8"/>
            <div>
              <p className="text-[12px] text-gray-500 font-medium">Available Balance</p>
              <div className="flex items-center">
                <div 
                  className="flex items-baseline tracking-tight cursor-pointer"
                  onClick={handleBalanceClick}
                  title={isBalanceVisible ? "Bấm để sửa số dư" : ""}
                >
                    {isBalanceVisible ? (
                       <>
                        {shouldShowVnd && (
                          <span 
                            className="font-semibold mr-1 text-lg"
                            style={{ color: '#6B7280' }}
                          >
                            VND
                          </span>
                        )}
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
                <div className="ml-2">
                  <ToggleVisibilityIcon isVisible={isBalanceVisible} onClick={() => setIsBalanceVisible(!isBalanceVisible)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Phần dưới: Get profit */}
        <div className="relative pt-4 px-4 pb-7 w-[255px] h-[150px] flex flex-col bg-black/50 rounded-bl-lg">
           <img 
            src={GET_PROFIT_ICON_URL} 
            alt="Get profit icon" 
            className="absolute top-1/3 -translate-y-1/2 -left-9 w-[70px] h-[70px]"
          />
          <h3 className="font-bold text-black ml-6 text-sm">Get profit every day</h3>
          <p className="text-xs text-gray-800 mt-1 leading-snug ml-6">
            Generated from your account balance, up to 4.4%/year, fully automatic, guaranteed
          </p>
          <button className="mt-3 ml-6 self-start border border-gray-800 text-black font-semibold text-xs py-2 px-4 rounded-full hover:bg-white/10 transition-colors">
            Explore now
          </button>
        </div>
      </div>
    );
  };
  
  export default InfoCard;