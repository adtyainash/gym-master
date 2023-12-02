// components/TableHeader.tsx
import React from 'react';

const TableHeader = () => {
  return (
    <div className="bg-neutral text-rich-black p-4 rounded grid grid-cols-7 gap-4 mt-8 mb-4">
      <div className="font-bold text-center text-neutral-content">Picture</div>
      <div className="font-bold text-center text-neutral-content">Class Name</div>
      <div className="font-bold text-center text-neutral-content">Instructor</div>
      <div className="font-bold text-center text-neutral-content">Price</div>
      <div className="font-bold text-center text-neutral-content">Status</div>
      <div className="font-bold text-center text-neutral-content">Quota</div>
      <div className="font-bold text-center text-neutral-content">Details</div>
    </div>
  );
};

export default TableHeader;
