import React from 'react'


export const Loading = ({size}) => {

return (
  <div className="flex-center h-10">
    
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className="animate-spin">
      <div className="h-full w-full border-8 border-t-red-500
       border-b-red-500 border-l-transparent bg-transparent border-r-transparent rounded-full">
      </div>
    </div>
  </div>
);
}