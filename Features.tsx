import React from 'react';
import SpriteIcon from './SpriteIcon';

// Đây là tệp hình ảnh chứa tất cả các biểu tượng.
// Để thay đổi các biểu tượng, bạn cần cập nhật tệp hình ảnh này.
const ICON_SPRITE_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763185252/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_x86lke.png';

// Sprite sheet là hàng ngang 800x100px, mỗi icon là 100x100px.
// Vì vậy, chúng ta sẽ dùng tọa độ x để chọn icon, tọa độ y luôn là 0.
const topFeatures = [
  { name: 'Accounts\n& Cards', icon: { x: 0, y: 0 } },      // Icon đầu tiên
  { name: 'Move\nmoney', icon: { x: 105, y: 0 } },   // Icon thứ hai
  { name: 'Scan\nQR', icon: { x: 212, y: 0 } },      // Icon thứ ba
  { name: 'Cardless\nWithdrawal', icon: { x: 335, y: 0 } }, // Icon thứ tư
  { name: 'Discover\nproducts', icon: { x: 448, y: 0 } },  // Icon thứ năm
];

interface FeaturesProps {
  onAccountsClick?: () => void;
  onCardlessWithdrawalClick?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onAccountsClick, onCardlessWithdrawalClick }) => {
  // Helper to determine the correct onClick handler based on the button index
  const getClickHandler = (index: number) => {
    if (index === 0) return onAccountsClick; // Accounts & Cards
    if (index === 3) return onCardlessWithdrawalClick; // Cardless Withdrawal
    return undefined; // All other buttons have no specific action
  };

  return (
    <div className="absolute top-[345px] left-1/2 -translate-x-1/2 w-[340px] h-[130px] bg-white rounded-2xl shadow-md p-3 flex flex-col justify-between">
      {/* Hàng trên cùng */}
      <div className="flex justify-around items-start">
        {topFeatures.map((feature, index) => (
          <button 
            key={feature.name} 
            onClick={getClickHandler(index)}
            className="flex flex-col items-center text-center w-[60px] gap-1 rounded-lg hover:bg-gray-100/70 transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            {/* Bạn có thể thay đổi kích thước của các biểu tượng trên cùng bằng cách điều chỉnh thuộc tính `size` dưới đây. */}
            <SpriteIcon
              spriteUrl={ICON_SPRITE_URL}
              {...feature.icon}
              size={32}
              iconsInSprite={8}
              originalIconSize={100}
            />
            <p className="text-[10px] leading-tight whitespace-pre-line font-medium text-gray-800">{feature.name}</p>
          </button>
        ))}
      </div>

      {/* Hàng dưới cùng */}
      <div className="flex gap-2">
        <button className="flex-[1.8] flex items-center justify-start text-left gap-0.8 p-1.3 bg-gray-50 rounded-xl h-[48px] overflow-hidden hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
          {/* Bạn có thể thay đổi kích thước của biểu tượng 'Rewards' bằng cách điều chỉnh thuộc tính `size` dưới đây. */}
          {/* Icon thứ sáu trong sprite sheet */}
          <SpriteIcon
            spriteUrl={ICON_SPRITE_URL}
            x={575}
            y={0}
            size={42}
            iconsInSprite={8}
            originalIconSize={100}
          />
          <p className="text-xs font-semibold text-gray-800 leading-tight whitespace-pre-line">{'Techcombank\nRewards'}</p>
        </button>
        <button className="flex-[1.4] flex items-center justify-start text-left gap-1.5 p-2 bg-gray-50 rounded-xl h-[48px] overflow-hidden hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
          {/* Bạn có thể thay đổi kích thước của biểu tượng 'Auto-Earning' bằng cách điều chỉnh thuộc tính `size` dưới đây. */}
          {/* Icon thứ bảy trong sprite sheet */}
          <SpriteIcon
            spriteUrl={ICON_SPRITE_URL}
            x={688}
            y={0}
            size={42}
            iconsInSprite={8}
            originalIconSize={100}
          />
          <p className="text-xs font-semibold text-gray-800 leading-tight">Auto-Earning</p>
        </button>
        <button className="w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
          {/* Icon thứ tám trong sprite sheet (biểu tượng "...") */}
          <SpriteIcon
            spriteUrl={ICON_SPRITE_URL}
            x={782}
            y={0}
            size={44}
            iconsInSprite={8}
            originalIconSize={100}
          />
        </button>
      </div>
    </div>
  );
};

export default Features;
