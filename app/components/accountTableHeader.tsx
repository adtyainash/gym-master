// components/TableHeader.tsx
import React from 'react';

const AccountTableHeader = () => {
  return (
    <div className="bg-neutral text-rich-black p-4 rounded grid grid-cols-6 gap-4 mt-8 mb-4">
      <div className="font-bold text-center text-neutral-content">Picture</div>
      <div className="font-bold text-center text-neutral-content">Username</div>
      <div className="font-bold text-center text-neutral-content">Email</div>
      <div className="font-bold text-center text-neutral-content">Status</div>
      <div className="font-bold text-center text-neutral-content">Expiration Date</div>
      <div className="font-bold text-center text-neutral-content">Details</div>
    </div>
  );
};

export default AccountTableHeader;
