// pages/memberships.jsx
import React from 'react';
import MembershipsList from '../components/MembershipList';

const Membership = () => {
  return (
    <div className="container mx-auto mt-8 p-10">
      <h1 className="text-3xl font-bold mb-6">Available Memberships</h1>
      <MembershipsList />
    </div>
  );
};

export default Membership;
