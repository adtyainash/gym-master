// pages/memberships.tsx
'use client';
import React, { useEffect, useState } from 'react';
import MembershipCard from '../components/MembershipCard';

interface Membership {
  membershipId: number;
  name: string;
  price: number;
  description: string;
  duration: number;
  // Add other properties as needed
}

const MembershipsList = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch('/api/membership');
        if (!response.ok) {
          throw new Error(`Failed to fetch memberships. Status: ${response.status}`);
        }

        const data = await response.json();
        setMemberships(data);
      } catch (error) {
        console.error('Error fetching memberships:', error);
      }
    };

    fetchMemberships();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {memberships.map((membership) => (
        <MembershipCard key={membership.membershipId} membership={membership} />
      ))}
    </div>
  );
};

export default MembershipsList;


// components/MembershipsList.jsx
// import React from 'react';
// import MembershipCard from './MembershipCard';

// const memberships =[
//     {
//     membershipId: 1,
//     name: 'Silver',
//     price: 149999,
//     description: 'Lorem ipsum',
//     duration: 120,
//     }
// ];
// const MembershipsList = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {memberships.map((membership) => (
//         <MembershipCard key={membership.membershipId} membership={membership} />
//       ))}
//     </div>
//   );
// };

// export default MembershipsList;
