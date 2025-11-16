import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import Features from './Features';
import SupportLinks from './SupportLinks';
import LocationServices from './LocationServices';
import Hotline from './Hotline';
import PasscodeScreen from './PasscodeScreen';
import MainScreen from './MainScreen'; // Import component MainScreen
import AccountsAndCardScreen from './AccountsAndCardScreen';
import TransactionSuccessScreen from './TransactionSuccessScreen';
// import Notifications from './Notifications'; // Giữ lại để dùng cho "màn hình khóa" sau này
import InAppNotification from './InAppNotification'; // Import component thông báo mới

const BACKGROUND_IMAGE_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763095989/z7221914938020_96dd4570d183978f96c416dd5a506724_1_qawjtc.png';

const App: React.FC = () => {
  const [isPasscodeVisible, setIsPasscodeVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountsVisible, setIsAccountsVisible] = useState(false);
  const [isTransactionSuccessVisible, setIsTransactionSuccessVisible] = useState(false);
  const [showPushNotification, setShowPushNotification] = useState(false);

  // Hàm xử lý khi đăng nhập thành công
  const handleLoginSuccess = () => {
    setIsPasscodeVisible(false);
    setIsLoggedIn(true); // Đánh dấu là đã đăng nhập
  };

  // Hàm xử lý khi đóng màn hình giao dịch thành công và hiển thị thông báo
  const handleTransactionSuccessClose = () => {
    // Ẩn màn hình giao dịch thành công ngay lập tức.
    setIsTransactionSuccessVisible(false);
  
    // --- CÀI ĐẶT THỜI GIAN CHỜ 5 GIÂY ---
    // Yêu cầu: Sau khi bấm "Done", phải chờ 5 giây rồi thông báo mới xuất hiện.
    // Sử dụng setTimeout để tạo độ trễ này.
    setTimeout(() => {
      // Sau 5 giây, hiển thị thông báo.
      setShowPushNotification(true);
  
      // --- TỰ ĐỘNG ẨN SAU 5 GIÂY ---
      // Yêu cầu: Thông báo tự động biến mất sau khi đã hiển thị được 5 giây.
      // Chúng ta đặt một setTimeout thứ hai lồng bên trong.
      setTimeout(() => {
        setShowPushNotification(false);
      }, 500000); // 5000ms = 5 giây hiển thị
      
    }, 3000); // 5000ms = 5 giây chờ
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div
        className="relative w-[375px] h-[812px] bg-black shadow-2xl overflow-hidden"
      >
        {/* Nội dung chính của App với hình nền */}
        <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat overflow-y-auto"
            style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
        >
            {/* Hiển thị màn hình chính nếu đã đăng nhập */}
            {isLoggedIn ? (
              <MainScreen 
                onAccountsClick={() => setIsAccountsVisible(true)} 
                onCardlessWithdrawalClick={() => setIsTransactionSuccessVisible(true)}
              />
            ) : (
              /* Hoặc hiển  thị màn hình chào mừng nếu chưa đăng nhập */
              <div className="relative h-[1100px]">
                  <WelcomeScreen onLoginClick={() => setIsPasscodeVisible(true)} />
                  <Features />
                  <SupportLinks />
                  <LocationServices />
                  <Hotline />
              </div>
            )}
        </div>
        
        {/* Push Notification Overlay (Sử dụng component InAppNotification nền trắng mới) */}
        {showPushNotification && (
            <div 
                className="absolute top-12 left-1/2 z-50 animate-slide-down"
                aria-live="assertive"
            >
                {/* Thay thế Notifications bằng InAppNotification */}
                <InAppNotification onClose={() => setShowPushNotification(false)} />
            </div>
        )}

        {/* Lớp phủ màn hình nhập mật mã */}
        {isPasscodeVisible && (
          <PasscodeScreen
            onClose={() => setIsPasscodeVisible(false)}
            onSuccess={handleLoginSuccess} // Khi thành công, gọi hàm xử lý đăng nhập
          />
        )}

        {/* Lớp phủ cho màn hình Accounts & Card */}
        {isAccountsVisible && (
          <div className="absolute inset-0 z-20">
            <AccountsAndCardScreen onBack={() => setIsAccountsVisible(false)} />
          </div>
        )}

        {/* Lớp phủ cho màn hình thanh toán thành công */}
        {isTransactionSuccessVisible && (
            <TransactionSuccessScreen onClose={handleTransactionSuccessClose} />
        )}

        {/* CSS for slide-down animation */}
        <style>{`
          @keyframes slide-down-animation {
            from { 
                opacity: 0; 
                transform: translateX(-50%) translateY(-100%); 
            }
            to { 
                opacity: 1; 
                transform: translateX(-50%) translateY(0); 
            }
          }
          .animate-slide-down {
              animation: slide-down-animation 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;