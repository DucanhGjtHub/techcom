import React from 'react';

const trackers = [
  {
    title: 'Average Balance',
    image: 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763084290/z7221684773815_db8a44800c94b414fd72f7fde62a0b1f_2_i3bfpg.jpg'
  },
  {
    title: 'Card Spending Tracker',
    image: 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763171462/z7225561477486_cade115544617c64c944f043c94c6fbc_1_a3uu9b.jpg'
  }
];

// Lớp CSS cho hiệu ứng bóng mờ trên chữ, giúp dễ đọc hơn trên nền ảnh phức tạp.
const shadowClass = '[text-shadow:0_1px_3px_rgba(0,0,0,0.5)]';

const TrackersCarousel: React.FC = () => {
  return (
    <div className="h-[320px] w-full">
      <div className="h-full flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {trackers.map((tracker, index) => (
          <div key={index} className="relative w-[345px] h-full flex-shrink-0 rounded-2xl shadow-md overflow-hidden">
            {/* Background Image */}
            <img 
              src={tracker.image} 
              className="absolute inset-0 w-full h-full object-cover" 
              alt={tracker.title} 
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Content Container */}
            <div className={`relative z-10 h-full flex flex-col justify-between p-4 text-white ${shadowClass}`}>
              {/* Title at the top */}
              <h3 className="font-bold text-lg">{tracker.title}</h3>

              {/* Link at the bottom */}
              <a href="#" className="font-semibold text-center text-sm py-3 -mx-4 -mb-4 hover:bg-white/10 transition-colors rounded-b-2xl">
                  View details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackersCarousel;