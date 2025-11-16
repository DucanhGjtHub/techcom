import React from 'react';

const offers = [
  {
    bgImage: 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763082795/z7221684773815_db8a44800c94b414fd72f7fde62a0b1f_flfuei.jpg',
    text: 'Extra 1% p.a interest when savings with 3, 6, 12 month terms',
    linkText: 'Save now',
  },
  {
    bgImage: 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763171229/z7225546648960_84380038243b0790e8c786f4c64c4f64_1_vc2urm.jpg',
    text: 'Get up to 1.6M U-Point cashback on ad spending with your cr...',
    linkText: 'Explore now',
  }
];

// Lớp CSS cho hiệu ứng bóng mờ trên chữ, giúp dễ đọc hơn trên nền ảnh phức tạp.
const shadowClass = '[text-shadow:0_1px_3px_rgba(0,0,0,0.5)]';

const OffersCarousel: React.FC = () => {
  return (
    <div className="h-[124px] w-full">
      <div className="h-full flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {offers.map((offer, index) => (
          <div 
            key={index} 
            className="relative w-[306px] h-full flex-shrink-0 rounded-2xl overflow-hidden shadow-md"
            aria-label={offer.text}
          >
            {/* Ảnh nền */}
            <img 
              src={offer.bgImage} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            {/* Lớp phủ gradient để chữ dễ đọc hơn */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Nội dung */}
            <div className={`relative z-10 p-4 h-full flex flex-col justify-between text-white ${shadowClass}`}>
              <h3 className="font-bold text-lg leading-tight">
                {offer.text}
              </h3>
              <a href="#" className="font-semibold text-sm flex items-center gap-1 hover:opacity-75">
                {offer.linkText}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersCarousel;