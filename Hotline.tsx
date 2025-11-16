import React from 'react';

// URL cho logo Techcombank.
const LOGO_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763079513/logo-techcombank-vector-3_1_-Photoroom_z0xlep.png';

const Hotline: React.FC = () => {
  return (
    // Đây là container chính cho block hotline.
    // 'absolute top-[986px]' đặt vị trí của block này trên màn hình, ngay dưới block LocationServices.
    <div className="absolute top-[986px] left-1/2 -translate-x-1/2 w-[340px] bg-white rounded-2xl shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Logo Techcombank */}
        <img src={LOGO_URL} alt="Techcombank logo" className="w-10 h-10" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Techcombank hotline</span>
          <span className="text-xl font-bold text-gray-900 tracking-wider">1800 588 822</span>
        </div>
      </div>
      {/* Nút "Call" được bọc trong thẻ <a> để có thể gọi điện */}
      <a href="tel:1800588822" className="flex items-center justify-center gap-2 bg-black text-white font-semibold rounded-full px-4 py-2 text-sm transition-opacity hover:opacity-80">
        {/* Icon điện thoại */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        <span>Call</span>
      </a>
    </div>
  );
};

export default Hotline;