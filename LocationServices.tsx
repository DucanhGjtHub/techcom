import React from 'react';

// URL cho hình ảnh bản đồ.
const MAP_IMAGE_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763064027/393b50cd-9e08-443e-849b-2bf44a160f9e_dv9b9q.jpg';

const LocationServices: React.FC = () => {
  return (
    // Đây là container chính cho toàn bộ block.
    // 'absolute top-[748px]' đặt vị trí của block này trên màn hình.
    <div className="absolute top-[748px] left-1/2 -translate-x-1/2 w-[340px] bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Hình ảnh bản đồ */}
      <img src={MAP_IMAGE_URL} alt="Map of branches and ATMs" className="w-full h-auto" />
      
      {/* Danh sách các dịch vụ */}
      <ul className="flex flex-col">
        {/* Mục "Find branches & ATMs" */}
        <li className="border-b border-gray-200">
          <button className="w-full flex items-center justify-between p-3 text-left transition-opacity hover:opacity-70">
            <div className="flex items-center gap-3">
              {/* Icon SVG cho vị trí */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Find branches & ATMs</span>
            </div>
            {/* Icon mũi tên sang phải */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </li>
        
        {/* Mục "Book an appointment" */}
        <li>
          <button className="w-full flex items-center justify-between p-3 text-left transition-opacity hover:opacity-70">
            <div className="flex items-center gap-3">
              {/* Icon SVG cho lịch hẹn */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">Book an appointment</span>
                <span className="text-xs text-gray-500">For better scheduling & services at our branch</span>
              </div>
            </div>
             {/* Icon mũi tên sang phải */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LocationServices;