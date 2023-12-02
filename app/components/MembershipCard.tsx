'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Membership {
  membershipId: number;
  name: string;
  price: number;
  description: string;
  duration: number;
}

interface MembershipCardProps {
  membership: Membership;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ membership }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const userRole = session?.user?.role;

  const isUserAdmin = userRole === 'Admin';
  const handleButtonClick = () => {
    // user yang dapat membeli membership adalah yang statusnya bukan Admin
    if (userRole !== 'Admin') {
      router.push(`/purchases/${membership.membershipId}`);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg transition-all`}>
      <h2 className="text-xl text-rich-black font-bold mb-2">{membership.name}</h2>
      <p className="text-gray-700 mb-4">Rp {membership.price}</p>
      <p className="text-gray-700 mb-4">{membership.description}</p>
      <p className="text-gray-700 mb-4">Duration: {membership.duration} days</p>

      <button
        onClick={handleButtonClick}
        className={`${
          userRole === 'Admin'
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        } py-2 px-4 rounded transition-all`}
      >
        {userRole === 'Admin' ? 'Admins cannot purchase' : 'Purchase Now'}
      </button>
    </div>
  );
};


export default MembershipCard;