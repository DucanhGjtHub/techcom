import React from 'react';

interface WelcomeScreenProps {
  onLoginClick: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLoginClick }) => {
  return (
    <div className="absolute top-[75px] left-[35px] w-[225px] flex flex-col text-white">
      <h1 className="text-2xl font-bold">
        Good evening,
      </h1>
      <h2 className="text-3xl font-bold uppercase leading-tight mt-1">
        NGUYEN QUANG DUC ANH
      </h2>
      <button
        onClick={onLoginClick}
        className="bg-white text-black font-semibold rounded-full mt-8 text-sm hover:bg-gray-200 transition-colors flex items-center justify-center h-[30px] w-[75px]">
        Log in
      </button>
    </div>
  );
};

export default WelcomeScreen;
