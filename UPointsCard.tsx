import React from 'react';

// URL for the new "x2" image, based on the screenshot provided.
const UPOINTS_X2_IMAGE_URL = 'https://res.cloudinary.com/dctm7qeer/image/upload/v1763085698/z7221914938020_96dd4570d183978f96c416dd5a506724_1_rm8ucl.png';

const UPointsCard: React.FC = () => {
  return (
    // New container with dimensions 345x175, white background, and flex-col layout.
    <div className="w-[345px] h-[175px] rounded-2xl shadow-lg bg-white text-black flex flex-col overflow-hidden">
      
      {/* Top Part: Contains the main content */}
      <div className="flex-grow p-4 flex justify-between items-start">
        <div className="flex flex-col w-2/3 pt-2">
          <h3 className="font-bold text-base text-gray-800">More U-Points every month</h3>
          <p className="text-sm text-gray-500 mt-2 leading-snug">
            Freely exchange vouchers for food and shopping
          </p>
        </div>
        <div className="w-1/3 flex justify-end">
           <img src={UPOINTS_X2_IMAGE_URL} alt="x2 U-Points" className="w-20 h-20 object-contain" />
        </div>
      </div>

      {/* Bottom Part: The clickable link section */}
      <button className="h-[50px] flex-shrink-0 px-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors w-full border-t border-gray-100">
        <span className="font-semibold text-sm text-gray-800">Explore now</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
};

export default UPointsCard;
