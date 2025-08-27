
import React from 'react';

const Loader: React.FC<{ text?: string }> = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-white text-lg">{text}</p>
    </div>
  );
};

export default Loader;
