import React from 'react';
import SpriteIcon from './SpriteIcon';

const ICON_SPRITE_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763160028/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_1_fhmvut.png';

const supportLinks = [
  { name: 'User Guide', icon: { x: 0, y: 0 } },
  { name: 'Security guide', icon: { x: 110, y: 0 } },
  { name: 'Contact us', icon: { x: 220, y: 0 } },
];

const SupportLinks: React.FC = () => {
  return (
    <div className="absolute top-[490px] left-1/2 -translate-x-1/2 w-[340px] bg-white rounded-2xl shadow-md">
      <ul className="flex flex-col">
        {supportLinks.map((link, index) => (
          <li key={link.name}>
             <button className="w-full flex items-center justify-between py-[18px] px-5 text-left transition-opacity hover:opacity-70">
              <div className="flex items-center gap-4">
                <SpriteIcon
                  spriteUrl={ICON_SPRITE_URL}
                  x={link.icon.x}
                  y={link.icon.y}
                  size={44}
                  iconsInSprite={3}
                  originalIconSize={100}
                />
                <span className="text-base font-medium text-gray-900">{link.name}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {index < supportLinks.length - 1 && <div className="h-px bg-gray-200" style={{ marginLeft: '64px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SupportLinks;