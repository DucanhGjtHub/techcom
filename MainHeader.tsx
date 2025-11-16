import React from 'react';
import InfoCard from './InfoCard';
import Features from './Features';
import Notifications from './Notifications';
import OffersCarousel from './OffersCarousel';
import TrackersCarousel from './TrackersCarousel';

// Component con cho biểu tượng cài đặt
const SettingsIcon = () => (
  // SVG đã được cập nhật: chỉ còn 2 vạch ngang, màu đen
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
    <path d="M5 10H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M5 14H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

interface MainScreenProps {
  onAccountsClick: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onAccountsClick }) => {
  return (
    // Container này không còn 'h-full' để cho phép nội dung bên trong quyết định chiều cao,
    // cho phép cuộn trên App.tsx
    <div className="w-full text-white">
      {/* Container tương đối để định vị tất cả các phần tử con */}
      <div className="relative" style={{ height: '1200px' }}>

        {/* Header chứa nút cài đặt */}
        <header className="absolute top-[50px] left-[20px] flex items-center gap-2">
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors" aria-label="Settings">
            <SettingsIcon />
          </button>
        </header>

        {/* Component Card chính */}
        <InfoCard />
        
        {/* Component Features được thêm vào */}
        <Features onAccountsClick={onAccountsClick} />

        {/* Các component mới bên dưới Features */}
        
        {/* Khối 1: Notifications (Cao: 180px) */}
        {/* Vị trí: Features kết thúc ở 475px, cộng 16px khoảng cách = 491px */}
        <div className="absolute top-[491px] left-1/2 -translate-x-1/2 w-[340px]">
          <Notifications />
        </div>

        {/* Khối 2: Offers Carousel (Cao: 125px) */}
        {/* Vị trí: Khối 1 kết thúc ở 491 + 180 = 671px, cộng 16px khoảng cách = 687px */}
        <div className="absolute top-[687px] left-1/2 -translate-x-1/2 w-[340px]">
          <OffersCarousel />
        </div>

        {/* Khối 3: Trackers Carousel (Cao: 325px) */}
        {/* Vị trí: Khối 2 kết thúc ở 687 + 125 = 812px, cộng 16px khoảng cách = 828px */}
        <div className="absolute top-[828px] left-1/2 -translate-x-1/2 w-[340px]">
          <TrackersCarousel />
        </div>

      </div>
    </div>
  );
};

export default MainScreen;