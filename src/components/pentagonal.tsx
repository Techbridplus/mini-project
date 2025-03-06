import React from "react";

const Pentagon: React.FC = () => {
  return (
    <div className="flex justify-center items-center  bg-gray-200">
      <div
        className="relative w-20 h-20 bg-blue-500 text-white flex items-center justify-center font-bold text-lg"
        style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }}
      >
      </div>
    </div>
  );
};

export default Pentagon;
