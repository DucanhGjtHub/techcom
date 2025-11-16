import React from 'react';

// URL cho icon "Get Profit"
const GET_PROFIT_ICON_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763082170/z7221543231082_2fa552704271b7e802d0e5019eee6de4_q1zusp.png';

const ProfitPromo: React.FC = () => {
  return (
    // Phần dưới: Get profit, với nền tối và chữ trắng để khớp với hình ảnh
    <div className="relative p-4 flex flex-col bg-zinc-700">
       {/* Icon nổi bên viền */}
       <img 
        src={GET_PROFIT_ICON_URL} 
        alt="Get profit icon" 
        className="absolute top-1/2 -translate-y-1/2 -left-4 w-12 h-12"
      />
      <h3 className="font-bold text-white ml-6 text-sm">Get profit every day</h3>
      <p className="text-xs text-gray-300 mt-1 leading-snug ml-6">
        Generated from your account balance, up to 4.4%/year, fully automatic, guaranteed
      </p>
      {/* Nút được cập nhật style để khớp với nền tối */}
      <button className="mt-3 ml-6 self-start bg-zinc-500 text-white font-semibold text-xs py-2 px-4 rounded-full hover:bg-zinc-600 transition-colors">
        Explore now
      </button>
    </div>
  );
};

export default ProfitPromo;